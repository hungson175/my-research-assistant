import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Loader2 } from "lucide-react"

interface ResearchFormProps {
  topic: string
  setTopic: (topic: string) => void
  placeholder: string
  isGenerating: boolean
  handleSubmit: (e: React.FormEvent) => void
}

export default function ResearchForm({
  topic,
  setTopic,
  placeholder,
  isGenerating,
  handleSubmit
}: ResearchFormProps) {
  return (
    <div className="bg-white p-8 rounded-lg shadow-lg">
      <h4 className="text-2xl font-bold mb-4">Write a research paper about:</h4>
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          type="text"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          placeholder={placeholder}
          className="w-full text-lg"
        />
        <Button 
          type="submit" 
          className="w-full bg-blue-600 hover:bg-blue-700 text-white"
          disabled={isGenerating}
        >
          {isGenerating ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Generating Report...
            </>
          ) : (
            'Generate Report'
          )}
        </Button>
      </form>
    </div>
  )
}