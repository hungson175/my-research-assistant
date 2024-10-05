'use client'

import { useState, useEffect } from 'react'
import Header from '../components/layout/Header'
import MainContent from '../components/layout/MainContent'
import Footer from '../components/layout/Footer'

export default function LandingPage() {
  const [topic, setTopic] = useState('')
  const [placeholder, setPlaceholder] = useState('Generative AI impact on Software Development')
  const [progress, setProgress] = useState<string[]>([])
  const [report, setReport] = useState({ english: '', vietnamese: '' })
  const [isGenerating, setIsGenerating] = useState(false)
  const [remainingCredits, setRemainingCredits] = useState(5)

  useEffect(() => {
    const placeholders = [
      'Generative AI impact on Software Development',
      '3 days guide for traveller: Nha Trang',
      'The future of renewable energy',
      'Impact of social media on mental health'
    ]
    let i = 0
    const interval = setInterval(() => {
      i = (i + 1) % placeholders.length
      setPlaceholder(placeholders[i])
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsGenerating(true)
    setProgress(['Searching for sources...'])
    setTimeout(() => setProgress(prev => [...prev, 'Reading content...']), 2000)
    setTimeout(() => setProgress(prev => [...prev, 'Analyzing information...']), 4000)
    setTimeout(() => setProgress(prev => [...prev, 'Generating report...']), 6000)
    setTimeout(() => {
      setReport({
        english: `Here's your report on "${topic}".\n\nThis is a placeholder for the actual report content in English.`,
        vietnamese: `Đây là báo cáo của bạn về "${topic}".\n\nĐây là nội dung giữ chỗ cho báo cáo thực tế bằng tiếng Việt.`
      })
      setProgress(prev => [...prev, 'Report complete!'])
      setIsGenerating(false)
      setRemainingCredits(prev => prev - 1)
    }, 8000)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-white to-blue-50 p-8">
      <Header />
      <MainContent
        topic={topic}
        setTopic={setTopic}
        placeholder={placeholder}
        progress={progress}
        report={report}
        isGenerating={isGenerating}
        remainingCredits={remainingCredits}
        handleSubmit={handleSubmit}
      />
      <Footer />
    </div>
  )
}