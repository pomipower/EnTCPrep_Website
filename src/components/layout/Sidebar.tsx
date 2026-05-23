"use client"

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { Home, Calendar, BookOpen, User, LogOut } from 'lucide-react'
import { createClient } from '@/utils/supabase/client'

export function Sidebar() {
  const pathname = usePathname()
  const router = useRouter()
  const supabase = createClient()

  const links = [
    { href: '/dashboard', label: 'Dashboard', icon: Home },
    { href: '/daily', label: 'Daily Circuit', icon: Calendar },
    { href: '/practice', label: 'Practice', icon: BookOpen },
    { href: '/contribute', label: 'Contribute', icon: User },
  ]

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push('/login')
    router.refresh()
  }

  return (
    <aside className="hidden md:flex h-screen w-64 flex-col border-r bg-white dark:bg-gray-950">
      <div className="flex h-16 items-center px-6 border-b">
        <span className="text-xl font-bold text-blue-600 dark:text-blue-400">EnTCPrep</span>
      </div>
      <nav className="flex-1 space-y-1 p-4">
        {links.map(({ href, label, icon: Icon }) => {
          const isActive = pathname.startsWith(href)
          return (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-colors ${
                isActive 
                  ? 'bg-blue-50 text-blue-600 dark:bg-blue-900/50 dark:text-blue-400' 
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-50'
              }`}
            >
              <Icon className="h-5 w-5" />
              {label}
            </Link>
          )
        })}
      </nav>
      <div className="p-4 border-t">
        <button 
          onClick={handleLogout}
          className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-gray-600 hover:bg-gray-50 hover:text-red-600 transition-colors dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-red-400"
        >
          <LogOut className="h-5 w-5" />
          Logout
        </button>
      </div>
    </aside>
  )
}
