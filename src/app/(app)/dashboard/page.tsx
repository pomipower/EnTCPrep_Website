import { createClient } from '@/utils/supabase/server'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Flame, Target, Award, BrainCircuit } from 'lucide-react'

export const revalidate = 0 // always fetch fresh data

export default async function DashboardPage() {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return <div>Please log in.</div>
  }

  // Fetch the user's row from public.users
  const { data: userData, error } = await supabase
    .from('users')
    .select('displayname, current_streak, stats')
    .eq('id', user.id)
    .single()

  if (error) {
    console.error("Error fetching user data:", error)
  }

  const displayName = userData?.displayname || 'Student'
  const streak = userData?.current_streak || 0
  
  // Provide default empty stats if none exist
  const stats = userData?.stats || {
    totalSolved: 0,
    correctAnswers: 0,
    topicScores: { analog: 0, digital: 0, signals: 0, control: 0, network: 0, em: 0 }
  }

  const totalSolved = stats.totalSolved || 0
  const correctAnswers = stats.correctAnswers || 0
  const accuracy = totalSolved > 0 ? Math.round((correctAnswers / totalSolved) * 100) : 0

  // Helper to safely format topic names
  const formatTopic = (key: string) => {
    const map: Record<string, string> = {
      analog: "Analog Electronics",
      digital: "Digital Logic",
      signals: "Signals & Systems",
      control: "Control Systems",
      network: "Network Theory",
      em: "Electromagnetics"
    }
    return map[key] || key
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      
      {/* Welcome Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Welcome back, {displayName}!
          </h1>
          <p className="text-gray-500 mt-1">Here is your prep overview for today.</p>
        </div>
      </div>

      {/* Top Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Streak Card */}
        <Card className="bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-950/20 dark:to-red-950/20 border-orange-200 dark:border-orange-900">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-lg font-medium text-orange-900 dark:text-orange-200">
              Current Streak
            </CardTitle>
            <Flame className="w-8 h-8 text-orange-500 drop-shadow-md" />
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-extrabold text-orange-600 dark:text-orange-400">
              {streak} <span className="text-xl font-medium text-orange-400 dark:text-orange-600">days</span>
            </div>
            <p className="text-sm text-orange-700/80 dark:text-orange-300/80 mt-1">Keep the fire burning!</p>
          </CardContent>
        </Card>

        {/* Total Solved Card */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-lg font-medium text-gray-700 dark:text-gray-300">
              Total Questions
            </CardTitle>
            <BrainCircuit className="w-6 h-6 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-extrabold">{totalSolved}</div>
            <p className="text-sm text-gray-500 mt-1">Across all topics</p>
          </CardContent>
        </Card>

        {/* Accuracy Card */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-lg font-medium text-gray-700 dark:text-gray-300">
              Accuracy
            </CardTitle>
            <Target className="w-6 h-6 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-extrabold">{accuracy}%</div>
            <p className="text-sm text-gray-500 mt-1">
              {correctAnswers} correct out of {totalSolved}
            </p>
          </CardContent>
        </Card>

      </div>

      {/* Topic Breakdown */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Award className="w-5 h-5 text-purple-500" />
            <CardTitle>Topic Mastery</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {Object.entries(stats.topicScores || {}).map(([key, value]) => {
            // value represents the percentage mastery for now, or number solved
            // Let's assume the JSON holds an arbitrary percentage from 0 to 100 for visual sake,
            // or we cap it at 100 if it's counting raw scores.
            const percentage = Math.min(Number(value) || 0, 100)
            
            return (
              <div key={key} className="space-y-2">
                <div className="flex justify-between text-sm font-medium">
                  <span className="text-gray-700 dark:text-gray-300">{formatTopic(key)}</span>
                  <span className="text-gray-500">{percentage}%</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-800 rounded-full h-2.5 overflow-hidden">
                  <div 
                    className="bg-blue-600 h-2.5 rounded-full transition-all duration-1000 ease-out" 
                    style={{ width: `${percentage}%` }}
                  ></div>
                </div>
              </div>
            )
          })}
        </CardContent>
      </Card>
      
    </div>
  )
}
