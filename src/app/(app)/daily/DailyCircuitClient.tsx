"use client"

import { useState } from 'react'
import { submitDailyAnswer } from './actions'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { CheckCircle2, XCircle, AlertCircle } from 'lucide-react'

interface Circuit {
  id: string
  date: string
  image_url: string
  question_text: string
  unit: string | null
}

export function DailyCircuitClient({ circuit }: { circuit: Circuit }) {
  const [answer, setAnswer] = useState('')
  const [attemptsLeft, setAttemptsLeft] = useState(3)
  const [status, setStatus] = useState<'idle' | 'success' | 'failed'>('idle')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [explanation, setExplanation] = useState<string | null>(null)
  const [errorMsg, setErrorMsg] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (status === 'success' || attemptsLeft === 0) return
    
    const numericAnswer = parseFloat(answer)
    if (isNaN(numericAnswer)) {
      setErrorMsg("Please enter a valid number.")
      return
    }

    setIsSubmitting(true)
    setErrorMsg(null)

    const result = await submitDailyAnswer(circuit.id, numericAnswer)

    if (result.error) {
      setErrorMsg(result.error)
      setIsSubmitting(false)
      return
    }

    if (result.isCorrect) {
      setStatus('success')
      setExplanation(result.explanation || null)
    } else {
      const newAttempts = attemptsLeft - 1
      setAttemptsLeft(newAttempts)
      if (newAttempts === 0) {
        setStatus('failed')
        setExplanation(result.explanation || "No explanation provided.")
      } else {
        setErrorMsg(`Incorrect. You have ${newAttempts} attempt${newAttempts > 1 ? 's' : ''} left.`)
      }
    }
    
    setIsSubmitting(false)
  }

  return (
    <Card className="max-w-3xl mx-auto overflow-hidden">
      <CardHeader className="bg-blue-50 dark:bg-blue-950/30 border-b">
        <CardTitle className="text-2xl flex justify-between items-center">
          <span>Today's Circuit</span>
          <span className="text-sm font-normal text-gray-500">{circuit.date}</span>
        </CardTitle>
      </CardHeader>
      
      <CardContent className="p-6 space-y-6">
        <div className="flex justify-center bg-white border rounded-lg p-4">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img 
            src={circuit.image_url} 
            alt="Daily Circuit Diagram" 
            className="max-w-full h-auto max-h-80 object-contain"
          />
        </div>
        
        <div className="text-lg text-gray-800 dark:text-gray-200 font-medium">
          {circuit.question_text}
        </div>

        {status === 'idle' && (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row items-end gap-4 mt-6">
            <div className="flex-1 w-full space-y-2">
              <Label htmlFor="answer">Your Answer</Label>
              <div className="relative">
                <Input 
                  id="answer"
                  type="number" 
                  step="any"
                  value={answer}
                  onChange={(e) => setAnswer(e.target.value)}
                  placeholder="e.g. 5.0"
                  className="pr-12"
                  disabled={isSubmitting}
                  required
                />
                {circuit.unit && (
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-gray-500 font-semibold">
                    {circuit.unit}
                  </div>
                )}
              </div>
            </div>
            <Button type="submit" className="w-full sm:w-32" disabled={isSubmitting}>
              {isSubmitting ? 'Checking...' : 'Submit'}
            </Button>
          </form>
        )}

        {errorMsg && status === 'idle' && (
          <div className="flex items-center gap-2 text-red-600 bg-red-50 p-3 rounded-md border border-red-100">
            <AlertCircle className="h-5 w-5" />
            <span className="text-sm font-medium">{errorMsg}</span>
          </div>
        )}

        {status === 'success' && (
          <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-6 animate-in fade-in slide-in-from-bottom-4">
            <div className="flex items-center gap-3 text-green-700 dark:text-green-400 mb-4">
              <CheckCircle2 className="h-8 w-8" />
              <h3 className="text-xl font-bold">Correct! Streak updated.</h3>
            </div>
            <div className="prose dark:prose-invert">
              <strong>Explanation:</strong>
              <p>{explanation}</p>
            </div>
          </div>
        )}

        {status === 'failed' && (
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-6 animate-in fade-in slide-in-from-bottom-4">
            <div className="flex items-center gap-3 text-red-700 dark:text-red-400 mb-4">
              <XCircle className="h-8 w-8" />
              <h3 className="text-xl font-bold">Out of attempts</h3>
            </div>
            <div className="prose dark:prose-invert">
              <p className="text-gray-700 dark:text-gray-300">You've exhausted all your tries for today.</p>
              <div className="mt-4 p-4 bg-white dark:bg-gray-900 rounded-md border">
                <strong>Explanation:</strong>
                <p className="mt-2 text-gray-600 dark:text-gray-400">{explanation}</p>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
