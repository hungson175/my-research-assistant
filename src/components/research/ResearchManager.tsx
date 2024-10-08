import { useState, useEffect, useCallback } from 'react'
import ResearchForm from './ResearchForm'
import ProgressCollapsible from './ProgressCollapsible'
import ReportTabs from './ReportTabs'
import CreditInfo from './CreditInfo'
import Header from '../layout/Header'
import { FileText, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"
import { WEBSOCKET_API_URL } from '@/config/env'

interface LogMessage {
  type: string;
  content: string;
  output: string;
  metadata: unknown;
}

interface ReportData {
  success: boolean;
  message: string;
  en_content: string;
  vi_content: string;
  published_url_en: string;
  published_url_vi: string;
}

export default function ResearchManager() {
  const [websocket, setWebsocket] = useState<WebSocket | null>(null)
  const [topic, setTopic] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)
  const [progress, setProgress] = useState<string[]>([])
  const [report, setReport] = useState<ReportData>({
    success: false,
    message: '',
    en_content: '',
    vi_content: '',
    published_url_en: '',
    published_url_vi: ''
  })
  const [remainingCredits, setRemainingCredits] = useState(10) // Example initial value

  const connectWebSocket = useCallback(() => {
    const ws = new WebSocket(WEBSOCKET_API_URL)
    setWebsocket(ws)

    ws.onopen = () => {
      console.log('WebSocket connected')
    }

    ws.onmessage = (event) => {
      console.log('Received message:', event.data) // Debug log
      try {
        const data = JSON.parse(event.data) as LogMessage | ReportData
        if ('type' in data && data.type === 'logs') {
          setProgress(prev => [...prev, data.output])
        } else if ('success' in data) {
          setReport(data)
          setIsGenerating(false)
          setProgress(prev => [...prev, "Report generation completed."])
        }
      } catch (error) {
        console.error('Error parsing WebSocket message:', error)
      }
    }

    ws.onclose = () => {
      console.log('WebSocket disconnected')
      setWebsocket(null)
    }

    return () => {
      ws.close()
    }
  }, [])

  useEffect(() => {
    connectWebSocket()
  }, [connectWebSocket])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (websocket && websocket.readyState === WebSocket.OPEN) {
      setIsGenerating(true)
      setProgress([])
      setReport({
        success: false,
        message: '',
        en_content: '',
        vi_content: '',
        published_url_en: '',
        published_url_vi: ''
      })
      websocket.send(JSON.stringify({
        query: topic,
        report_type: 'research_report',
        report_source: 'web_search'
      }))
      setRemainingCredits(prev => prev - 1) // Decrease credits on submission
    } else {
      console.error('WebSocket is not connected')
      setProgress(["Error: WebSocket is not connected. Please try again."])
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-white">
      <div className="max-w-5xl mx-auto px-4">
        <Header />
        <main className="space-y-8">
          <div className="text-center">
            <h2 className="text-6xl font-bold text-blue-900 mb-8">Researcher at your fingertips</h2>
          </div>
          
          <div className="flex justify-center space-x-12 text-sm text-gray-600 mb-8">
            <div className="flex items-center">
              <FileText className="mr-2 h-5 w-5" />
              <span>100% reliable with refs</span>
            </div>
            <div className="flex items-center">
              <Zap className="mr-2 h-5 w-5" />
              <span>Bypass AI detection</span>
            </div>
          </div>
          
          <ResearchForm
            topic={topic}
            setTopic={setTopic}
            placeholder="Enter your research topic"
            isGenerating={isGenerating}
            handleSubmit={handleSubmit}
          />

          <div className="flex justify-between items-center">
            <CreditInfo remainingCredits={remainingCredits} />
            <Button variant="outline" onClick={() => console.log("Request more credits")}>
              Request more credits
            </Button>
          </div>

          <ProgressCollapsible progress={progress} isGenerating={isGenerating} />

          {(report.en_content || report.vi_content) && (
            <ReportTabs report={report} />
          )}
        </main>
      </div>
    </div>
  )
}