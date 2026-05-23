"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CheckCircle2, XCircle } from "lucide-react"

interface Question {
  id: string
  topic: string
  difficulty: string
  question_text: string
  options: string[]
  correct_answer: string
  explanation: string
}

export function QuizClient({ questions }: { questions: Question[] }) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [selectedOption, setSelectedOption] = useState<string | null>(null)
  const [isAnswered, setIsAnswered] = useState(false)
  const [score, setScore] = useState(0)
  const [isComplete, setIsComplete] = useState(false)
  
  const router = useRouter()

  if (isComplete) {
    return (
      <Card className="text-center py-12 animate-in fade-in zoom-in-95">
        <CardContent className="space-y-6">
          <div className="w-24 h-24 bg-blue-50 dark:bg-blue-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-5xl">🏆</span>
          </div>
          <h2 className="text-3xl font-bold">Quiz Completed!</h2>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            You scored <span className="font-bold text-blue-600">{score}</span> out of {questions.length}
          </p>
        </CardContent>
        <CardFooter className="justify-center">
          <Button size="lg" onClick={() => router.push('/practice')}>
            Back to Topics
          </Button>
        </CardFooter>
      </Card>
    )
  }

  const question = questions[currentIndex]

  const handleOptionClick = (option: string) => {
    if (isAnswered) return
    
    setSelectedOption(option)
    setIsAnswered(true)
    
    if (option === question.correct_answer) {
      setScore(prev => prev + 1)
    }
  }

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(prev => prev + 1)
      setSelectedOption(null)
      setIsAnswered(false)
    } else {
      setIsComplete(true)
    }
  }

  return (
    <div className="space-y-6 animate-in slide-in-from-right-8 fade-in duration-300" key={currentIndex}>
      <div className="flex justify-between items-center text-sm font-medium text-gray-500">
        <span>Question {currentIndex + 1} of {questions.length}</span>
        <span className="uppercase tracking-wider">Difficulty: {question.difficulty}</span>
      </div>

      <Card className="shadow-md border-t-4 border-t-blue-500">
        <CardHeader>
          <CardTitle className="text-xl leading-relaxed">
            {question.question_text}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {question.options.map((option, idx) => {
            const isSelected = selectedOption === option
            const isCorrect = option === question.correct_answer
            
            let buttonClass = "w-full justify-start h-auto py-4 px-6 text-left whitespace-normal text-md transition-all "
            
            if (!isAnswered) {
              buttonClass += "hover:bg-blue-50 hover:border-blue-300 dark:hover:bg-blue-900/20"
            } else {
              if (isCorrect) {
                buttonClass += "bg-green-100 border-green-500 text-green-900 dark:bg-green-900/40 dark:border-green-600 dark:text-green-100"
              } else if (isSelected && !isCorrect) {
                buttonClass += "bg-red-100 border-red-500 text-red-900 dark:bg-red-900/40 dark:border-red-600 dark:text-red-100"
              } else {
                buttonClass += "opacity-50"
              }
            }

            return (
              <Button
                key={idx}
                variant="outline"
                className={buttonClass}
                onClick={() => handleOptionClick(option)}
                disabled={isAnswered}
              >
                <div className="flex items-center justify-between w-full">
                  <span>{option}</span>
                  {isAnswered && isCorrect && <CheckCircle2 className="w-5 h-5 text-green-600" />}
                  {isAnswered && isSelected && !isCorrect && <XCircle className="w-5 h-5 text-red-600" />}
                </div>
              </Button>
            )
          })}
        </CardContent>
      </Card>

      {isAnswered && (
        <div className="space-y-4 animate-in fade-in slide-in-from-top-4">
          <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg border">
            <h4 className="font-bold mb-2">Explanation</h4>
            <p className="text-gray-700 dark:text-gray-300">{question.explanation}</p>
          </div>
          <div className="flex justify-end">
            <Button size="lg" onClick={handleNext}>
              {currentIndex < questions.length - 1 ? 'Next Question' : 'Finish Quiz'}
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
