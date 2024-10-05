import { Button } from "@/components/ui/button"
import { LogIn } from "lucide-react"

export default function Header() {
  return (
    <header className="max-w-6xl mx-auto flex justify-between items-center mb-12">
      <h1 className="text-2xl font-bold text-blue-800">SonPH AI</h1>
      <nav className="space-x-4">
        <Button variant="ghost">
          <LogIn className="mr-2 h-4 w-4" /> Sign In
        </Button>
        <Button variant="outline">Sign-up for Free</Button>
      </nav>
    </header>
  )
}