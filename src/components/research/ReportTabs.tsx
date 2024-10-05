import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"

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
          <Textarea
            value={report.en_content}
            readOnly
            className="w-full h-[300px] overflow-y-auto"
            placeholder="Your report will appear here..."
          />
        </TabsContent>
        <TabsContent value="vietnamese">
          <Textarea
            value={report.vi_content}
            readOnly
            className="w-full h-[300px] overflow-y-auto"
            placeholder="Báo cáo của bạn sẽ xuất hiện ở đây..."
          />
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