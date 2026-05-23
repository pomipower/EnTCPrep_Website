import { Sidebar } from './Sidebar'
import { BottomNav } from './BottomNav'
import { AdPlaceholder } from './AdPlaceholder'

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden relative">
        <div className="hidden md:block p-4 border-b bg-white dark:bg-gray-950">
          <AdPlaceholder slot="top-banner" className="h-20" />
        </div>
        <main className="flex-1 overflow-y-auto p-4 md:p-8 pb-24 md:pb-8">
          {children}
        </main>
      </div>
      <BottomNav />
    </div>
  )
}
