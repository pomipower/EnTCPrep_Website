"use server"

import { createClient } from '@/utils/supabase/server'

export async function submitReport(questionId: string, issueType: string, description: string) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return { success: false, error: 'Unauthorized' }
  }

  const { error } = await supabase.from('reports').insert({
    user_id: user.id,
    question_id: questionId,
    issue_type: issueType,
    description: description
  })

  if (error) {
    return { success: false, error: error.message }
  }

  return { success: true }
}

export async function submitSuggestion(
  topic: string,
  questionText: string,
  options: string[],
  correctAnswer: string,
  explanation: string
) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return { success: false, error: 'Unauthorized' }
  }

  const { error } = await supabase.from('suggestions').insert({
    user_id: user.id,
    topic,
    question_text: questionText,
    options,
    correct_answer: correctAnswer,
    explanation
  })

  if (error) {
    return { success: false, error: error.message }
  }

  return { success: true }
}
