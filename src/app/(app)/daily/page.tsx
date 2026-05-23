import { fetchTodayCircuit } from './actions'
import { DailyCircuitClient } from './DailyCircuitClient'

export const revalidate = 3600 // Revalidate every hour, or rely on dynamic requests

export default async function DailyCircuitPage() {
  const circuit = await fetchTodayCircuit()

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Daily Puzzle</h1>
      </div>
      
      {circuit ? (
        <DailyCircuitClient circuit={circuit} />
      ) : (
        <div className="bg-white dark:bg-gray-950 p-12 rounded-xl border shadow-sm text-center max-w-2xl mx-auto">
          <div className="text-6xl mb-4">⚡</div>
          <h2 className="text-2xl font-bold mb-2">No Circuit Today</h2>
          <p className="text-gray-500 max-w-md mx-auto">
            It looks like our engineers are still designing today's challenge. 
            Check back later!
          </p>
        </div>
      )}
    </div>
  )
}
