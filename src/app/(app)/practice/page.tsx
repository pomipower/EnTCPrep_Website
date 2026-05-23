import Link from 'next/link'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { Cpu, Zap, Radio, Activity, Network } from 'lucide-react'
import { AdPlaceholder } from '@/components/layout/AdPlaceholder'

const TOPICS = [
  {
    id: 'analog-electronics',
    name: 'Analog Electronics',
    description: 'Diodes, BJTs, Op-Amps, Rectifiers, and Amplifiers.',
    icon: Zap,
    color: 'text-yellow-500',
    bgColor: 'bg-yellow-50 dark:bg-yellow-950/30'
  },
  {
    id: 'digital-logic',
    name: 'Digital Logic',
    description: 'Boolean algebra, logic gates, combinational & sequential circuits.',
    icon: Cpu,
    color: 'text-blue-500',
    bgColor: 'bg-blue-50 dark:bg-blue-950/30'
  },
  {
    id: 'signals-systems',
    name: 'Signals & Systems',
    description: 'Continuous/discrete signals, Fourier transforms, LTI systems.',
    icon: Activity,
    color: 'text-green-500',
    bgColor: 'bg-green-50 dark:bg-green-950/30'
  },
  {
    id: 'control-systems',
    name: 'Control Systems',
    description: 'Transfer functions, stability analysis, root locus, bode plots.',
    icon: Radio,
    color: 'text-purple-500',
    bgColor: 'bg-purple-50 dark:bg-purple-950/30'
  },
  {
    id: 'network-theory',
    name: 'Network Theory',
    description: 'Kirchhoff laws, theorems, transient analysis, two-port networks.',
    icon: Network,
    color: 'text-red-500',
    bgColor: 'bg-red-50 dark:bg-red-950/30'
  }
]

export default function PracticePage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Practice Topics</h1>
        <p className="text-gray-500 mt-2">Select a topic to start a 5-question mock test.</p>
      </div>

      <div className="w-full flex justify-center">
        <AdPlaceholder size="leaderboard" position="practice-topic-grid" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {TOPICS.map((topic) => (
          <Link key={topic.id} href={`/practice/${topic.id}`}>
            <Card className="hover:shadow-md transition-shadow cursor-pointer h-full border hover:border-blue-200 dark:hover:border-blue-800 group">
              <CardHeader>
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 ${topic.bgColor} ${topic.color} group-hover:scale-110 transition-transform`}>
                  <topic.icon className="w-6 h-6" />
                </div>
                <CardTitle className="text-xl">{topic.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-sm">
                  {topic.description}
                </CardDescription>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}
