import ResearchForm from '../research/ResearchForm'
import CreditInfo from '../research/CreditInfo'
import ProgressCollapsible from '../research/ProgressCollapsible'
import ReportTabs from '../research/ReportTabs'
import { FileText, Zap } from "lucide-react"

interface MainContentProps {
  topic: string
  setTopic: (topic: string) => void
  placeholder: string
  progress: string[]
  report: { english: string; vietnamese: string }
  isGenerating: boolean
  remainingCredits: number
  handleSubmit: (e: React.FormEvent) => void
}

export default function MainContent({
  topic,
  setTopic,
  placeholder,
  progress,
  report,
  isGenerating,
  remainingCredits,
  handleSubmit
}: MainContentProps) {
  return (
    <main className="max-w-3xl mx-auto space-y-8">
      <div className="text-center space-y-4">
        <h3 className="text-5xl font-bold text-blue-900">Researcher at your fingertips</h3>
      </div>
      
      <div className="flex justify-center space-x-8 text-sm text-gray-600">
        <div className="flex items-center">
          <FileText className="mr-2 h-4 w-4" />
          <span>100% reliable with refs</span>
        </div>
        <div className="flex items-center">
          <Zap className="mr-2 h-4 w-4" />
          <span>Bypass AI detection</span>
        </div>
      </div>
      
      <ResearchForm
        topic={topic}
        setTopic={setTopic}
        placeholder={placeholder}
        isGenerating={isGenerating}
        handleSubmit={handleSubmit}
      />

      <CreditInfo remainingCredits={remainingCredits} />

      {progress.length > 0 && (
        <ProgressCollapsible progress={progress} />
      )}

      {(report.english || report.vietnamese) && (
        <ReportTabs report={report} />
      )}
    </main>
  )
}