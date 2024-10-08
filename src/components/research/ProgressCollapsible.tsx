import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { ChevronDown, ChevronUp } from "lucide-react"

interface ProgressCollapsibleProps {
  progress: string[]
  isGenerating: boolean
}

export default function ProgressCollapsible({ progress, isGenerating }: ProgressCollapsibleProps) {
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    if (isGenerating) {
      setIsOpen(true)
    }
  }, [isGenerating])

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen}>
      <CollapsibleTrigger asChild>
        <Button variant="outline" className="w-full bg-white">
          {isOpen ? "Hide Progress" : "Show Progress"}
          {isOpen ? (
            <ChevronUp className="ml-2 h-4 w-4" />
          ) : (
            <ChevronDown className="ml-2 h-4 w-4" />
          )}
        </Button>
      </CollapsibleTrigger>
      <CollapsibleContent>
        <div className="mt-2 p-4 bg-white rounded-md shadow">
          <div className="h-[300px] overflow-y-auto">
            {progress.map((step, index) => (
              <p key={index} className="text-sm text-gray-600">{step}</p>
            ))}
          </div>
        </div>
      </CollapsibleContent>
    </Collapsible>
  )
}