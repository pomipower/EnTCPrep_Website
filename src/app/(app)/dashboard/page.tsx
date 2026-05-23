export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-gray-950 p-6 rounded-xl border shadow-sm flex flex-col items-center justify-center space-y-2">
          <span className="text-5xl">🔥</span>
          <h3 className="text-lg font-medium text-gray-500">Daily Streak</h3>
          <p className="text-4xl font-bold">5 Days</p>
        </div>
        
        <div className="bg-white dark:bg-gray-950 p-6 rounded-xl border shadow-sm flex flex-col items-center justify-center space-y-2">
          <span className="text-5xl">📚</span>
          <h3 className="text-lg font-medium text-gray-500">Total Solved</h3>
          <p className="text-4xl font-bold">128</p>
        </div>
        
        <div className="bg-white dark:bg-gray-950 p-6 rounded-xl border shadow-sm flex flex-col items-center justify-center space-y-2">
          <span className="text-5xl">🎯</span>
          <h3 className="text-lg font-medium text-gray-500">Accuracy</h3>
          <p className="text-4xl font-bold">82%</p>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-950 p-6 rounded-xl border shadow-sm">
        <h2 className="text-xl font-bold mb-4">Topic Mastery (Mock)</h2>
        <div className="space-y-4">
          <div>
            <div className="flex justify-between mb-1 text-sm">
              <span>Analog Electronics</span>
              <span className="font-medium">75%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
              <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: '75%' }}></div>
            </div>
          </div>
          <div>
            <div className="flex justify-between mb-1 text-sm">
              <span>Digital Logic</span>
              <span className="font-medium">90%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
              <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: '90%' }}></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
