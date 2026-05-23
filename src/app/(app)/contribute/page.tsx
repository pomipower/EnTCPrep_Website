"use client"

import { useState } from "react"
import { submitSuggestion } from "./actions"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Send } from "lucide-react"

export default function ContributePage() {
  const [topic, setTopic] = useState('analog-electronics')
  const [questionText, setQuestionText] = useState('')
  const [option1, setOption1] = useState('')
  const [option2, setOption2] = useState('')
  const [option3, setOption3] = useState('')
  const [option4, setOption4] = useState('')
  const [correctAnswerIndex, setCorrectAnswerIndex] = useState('0')
  const [explanation, setExplanation] = useState('')
  
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSuccess(false)

    const options = [option1, option2, option3, option4]
    const correctAnswer = options[parseInt(correctAnswerIndex)]

    const result = await submitSuggestion(
      topic,
      questionText,
      options,
      correctAnswer,
      explanation
    )

    setIsSubmitting(false)

    if (result.success) {
      setSuccess(true)
      setQuestionText('')
      setOption1('')
      setOption2('')
      setOption3('')
      setOption4('')
      setExplanation('')
    } else {
      alert("Error submitting suggestion: " + result.error)
    }
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Contribute</h1>
        <p className="text-gray-500 mt-2">Help the community by suggesting a new practice question!</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Submit a Question</CardTitle>
          <CardDescription>Our team will review your submission before adding it to the official pool.</CardDescription>
        </CardHeader>
        <CardContent>
          {success && (
            <div className="mb-6 p-4 bg-green-50 text-green-700 border border-green-200 rounded-md">
              Thank you! Your question has been submitted for review.
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label>Topic</Label>
              <select 
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                className="w-full border rounded-md p-2 bg-white dark:bg-gray-950"
                required
              >
                <option value="analog-electronics">Analog Electronics</option>
                <option value="digital-logic">Digital Logic</option>
                <option value="signals-systems">Signals & Systems</option>
                <option value="control-systems">Control Systems</option>
                <option value="network-theory">Network Theory</option>
              </select>
            </div>

            <div className="space-y-2">
              <Label>Question Text</Label>
              <textarea 
                value={questionText}
                onChange={(e) => setQuestionText(e.target.value)}
                className="w-full border rounded-md p-2 bg-white dark:bg-gray-950"
                rows={3}
                required
              />
            </div>

            <div className="space-y-4 border p-4 rounded-md bg-gray-50 dark:bg-gray-900/50">
              <Label>Options</Label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input value={option1} onChange={e => setOption1(e.target.value)} placeholder="Option 1" required />
                <Input value={option2} onChange={e => setOption2(e.target.value)} placeholder="Option 2" required />
                <Input value={option3} onChange={e => setOption3(e.target.value)} placeholder="Option 3" required />
                <Input value={option4} onChange={e => setOption4(e.target.value)} placeholder="Option 4" required />
              </div>
              <div className="space-y-2 mt-4">
                <Label>Which option is correct?</Label>
                <select 
                  value={correctAnswerIndex}
                  onChange={(e) => setCorrectAnswerIndex(e.target.value)}
                  className="w-full border rounded-md p-2 bg-white dark:bg-gray-950"
                  required
                >
                  <option value="0">Option 1: {option1 || '...'}</option>
                  <option value="1">Option 2: {option2 || '...'}</option>
                  <option value="2">Option 3: {option3 || '...'}</option>
                  <option value="3">Option 4: {option4 || '...'}</option>
                </select>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Explanation</Label>
              <textarea 
                value={explanation}
                onChange={(e) => setExplanation(e.target.value)}
                className="w-full border rounded-md p-2 bg-white dark:bg-gray-950"
                rows={4}
                required
                placeholder="Explain why the correct answer is right..."
              />
            </div>

            <Button type="submit" className="w-full sm:w-auto" disabled={isSubmitting}>
              <Send className="w-4 h-4 mr-2" />
              {isSubmitting ? 'Submitting...' : 'Submit Suggestion'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
