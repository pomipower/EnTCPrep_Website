"use server"

import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'

export async function updatePracticeStats(topicSlug: string, score: number, total: number) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) {
    return { success: false, error: 'Unauthorized' }
  }

  // Get current user stats
  const { data: userData, error } = await supabase
    .from('users')
    .select('stats')
    .eq('id', user.id)
    .single()
    
  if (error || !userData) {
    return { success: false, error: 'User not found' }
  }

  // Parse existing stats or use defaults
  const stats = userData.stats || {
    totalSolved: 0,
    correctAnswers: 0,
    topicScores: { analog: 0, digital: 0, signals: 0, control: 0, network: 0, em: 0 }
  }

  // Map topic slug to topicScores key
  const topicMap: Record<string, string> = {
    'analog-electronics': 'analog',
    'digital-logic': 'digital',
    'signals-systems': 'signals',
    'control-systems': 'control',
    'network-theory': 'network'
  }
  
  const key = topicMap[topicSlug]
  
  // Calculate new stats
  const newTotalSolved = (stats.totalSolved || 0) + total
  const newCorrectAnswers = (stats.correctAnswers || 0) + score
  
  const newTopicScores = { ...stats.topicScores }
  if (key) {
    // Add 4 points per correct answer (so 5 correct = +20% mastery)
    const pointsGained = score * 4
    const currentMastery = newTopicScores[key] || 0
    newTopicScores[key] = Math.min(currentMastery + pointsGained, 100)
  }

  const newStats = {
    ...stats,
    totalSolved: newTotalSolved,
    correctAnswers: newCorrectAnswers,
    topicScores: newTopicScores
  }

  // Update the user record
  await supabase
    .from('users')
    .update({ stats: newStats })
    .eq('id', user.id)

  revalidatePath('/dashboard')

  return { success: true }
}
