import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import ReactMarkdown from 'react-markdown'

interface ReportTabsProps {
  report: {
    en_content: string
    vi_content: string
    published_url_en: string
    published_url_vi: string
  }
}

export default function ReportTabs({ report }: ReportTabsProps) {
  return (
    <div className="bg-white p-4 rounded-lg shadow-lg">
      <Tabs defaultValue="english">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="english">English</TabsTrigger>
          <TabsTrigger value="vietnamese">Vietnamese</TabsTrigger>
        </TabsList>
        <TabsContent value="english">
          <div className="w-full h-[300px] overflow-y-auto prose prose-sm max-w-none">
            <ReactMarkdown>{report.en_content}</ReactMarkdown>
          </div>
        </TabsContent>
        <TabsContent value="vietnamese">
          <div className="w-full h-[300px] overflow-y-auto prose prose-sm max-w-none">
            <ReactMarkdown>{report.vi_content}</ReactMarkdown>
          </div>
        </TabsContent>
      </Tabs>
      <div className="mt-4 text-sm text-gray-600">
        <p>View on GitHub Gist:</p>
        <a href={report.published_url_en} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline mr-4">English Version</a>
        <a href={report.published_url_vi} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Vietnamese Version</a>
      </div>
    </div>
  )
}