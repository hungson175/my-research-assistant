import { Button } from "@/components/ui/button"
import { LogIn } from "lucide-react"

export default function Header() {
  return (
    <header className="flex justify-between items-center py-4 mb-8">
      <h1 className="text-3xl font-bold text-blue-900">SonPH AI</h1>
      <div className="flex items-center space-x-4">
        <Button variant="ghost" className="flex items-center h-10">
          <LogIn className="mr-2 h-4 w-4" />
          Sign In
        </Button>
        <Button variant="outline" className="h-10">
          Sign-up for Free
        </Button>
      </div>
    </header>
  )
}