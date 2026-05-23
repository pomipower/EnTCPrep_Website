import { createClient } from '@/utils/supabase/server'
import { QuizClient } from './QuizClient'

export const revalidate = 0 // Never cache this page, always fetch fresh questions

export default async function TopicQuizPage({ params }: { params: Promise<{ topic: string }> }) {
  const { topic } = await params
  const supabase = await createClient()

  // Fetch questions for this topic
  const { data: questions, error } = await supabase
    .from('questions')
    .select('*')
    .eq('topic', topic)

  if (error || !questions || questions.length === 0) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold">No questions found!</h2>
        <p className="text-gray-500 mt-2">We are still adding questions for this topic.</p>
      </div>
    )
  }

  // Shuffle array using Fisher-Yates and pick top 5
  const shuffled = [...questions].sort(() => 0.5 - Math.random())
  const selectedQuestions = shuffled.slice(0, 5)

  // Format the topic name for display
  const topicName = topic.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex justify-between items-center border-b pb-4">
        <h1 className="text-2xl font-bold">{topicName} Quiz</h1>
        <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300">
          {selectedQuestions.length} Questions
        </span>
      </div>

      <QuizClient questions={selectedQuestions} />
    </div>
  )
}
