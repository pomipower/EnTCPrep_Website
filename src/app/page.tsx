import Link from "next/link"
import { Button } from "@/components/ui/button"
import { AdPlaceholder } from "@/components/layout/AdPlaceholder"

export default function Home() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 flex flex-col items-center">
      <header className="w-full border-b px-6 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-blue-600">EnTCPrep</h1>
        <div className="space-x-4">
          <Link href="/login">
            <Button variant="ghost">Login</Button>
          </Link>
          <Link href="/signup">
            <Button>Sign Up</Button>
          </Link>
        </div>
      </header>

      <main className="flex-1 w-full max-w-5xl px-6 py-12 flex flex-col items-center text-center space-y-8">
        <AdPlaceholder slot="home-top" className="h-24 w-full max-w-3xl" />
        
        <h2 className="text-4xl md:text-6xl font-extrabold tracking-tight text-gray-900 dark:text-gray-100">
          Master Electronics & Telecommunication
        </h2>
        <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl">
          The ultimate platform for EnTC students to prepare for GATE, ESE, and core technical interviews through daily challenges and topic-wise practice.
        </p>
        
        <Link href="/signup">
          <Button size="lg" className="text-lg px-8">Start Practicing Now</Button>
        </Link>
      </main>
    </div>
  )
}
