import { Button } from "@/components/ui/button"

interface CreditInfoProps {
  remainingCredits: number
}

export default function CreditInfo({ remainingCredits }: CreditInfoProps) {
  return (
    <div className="flex justify-between items-center">
      <Button variant="outline" className="bg-white">Request More Credits</Button>
      <span className="text-sm text-gray-600">Remaining credits: {remainingCredits}</span>
    </div>
  )
}