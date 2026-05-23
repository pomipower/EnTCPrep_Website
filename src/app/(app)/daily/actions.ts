"use server"

import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'

export async function fetchTodayCircuit() {
  const supabase = await createClient()
  
  // Get today's date in YYYY-MM-DD format (UTC)
  const today = new Date().toISOString().split('T')[0]
  
  const { data: circuit, error } = await supabase
    .from('daily_circuits')
    .select('id, date, image_url, question_text, unit')
    .eq('date', today)
    .single()
    
  if (error || !circuit) {
    return null
  }
  
  return circuit
}

export async function submitDailyAnswer(circuitId: string, userAnswer: number) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) {
    return { success: false, error: 'Unauthorized' }
  }

  // 1. Fetch the correct answer and tolerance securely
  const { data: circuit, error: circuitError } = await supabase
    .from('daily_circuits')
    .select('correct_answer, tolerance, explanation')
    .eq('id', circuitId)
    .single()
    
  if (circuitError || !circuit) {
    return { success: false, error: 'Circuit not found' }
  }
  
  // 2. Validate the answer
  const isCorrect = Math.abs(userAnswer - circuit.correct_answer) <= circuit.tolerance
  
  if (!isCorrect) {
    // Return explanation so client can show it if they run out of attempts
    return { success: false, isCorrect: false, explanation: circuit.explanation }
  }
  
  // 3. If correct, check and update streak
  const today = new Date().toISOString().split('T')[0]
  
  // Get user's current streak info
  const { data: userData } = await supabase
    .from('users')
    .select('current_streak, last_solved_date, stats')
    .eq('id', user.id)
    .single()
    
  if (userData) {
    const lastSolved = userData.last_solved_date
    let newStreak = userData.current_streak || 0
    
    // Only update if they haven't solved it today
    if (lastSolved !== today) {
      // If they solved it yesterday, increment. Otherwise, reset to 1.
      const yesterday = new Date()
      yesterday.setDate(yesterday.getDate() - 1)
      const yesterdayStr = yesterday.toISOString().split('T')[0]
      
      if (lastSolved === yesterdayStr) {
        newStreak += 1
      } else {
        newStreak = 1 // Streak broken or first time
      }
      
      // Update the user record
      const newStats = {
        ...userData.stats,
        totalSolved: (userData.stats?.totalSolved || 0) + 1,
        correctAnswers: (userData.stats?.correctAnswers || 0) + 1,
      }
      
      await supabase
        .from('users')
        .update({
          current_streak: newStreak,
          last_solved_date: today,
          stats: newStats
        })
        .eq('id', user.id)
    }
  }

  revalidatePath('/dashboard') // Refresh dashboard data

  return { 
    success: true, 
    isCorrect: true, 
    explanation: circuit.explanation 
  }
}
