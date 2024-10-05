interface CreditInfoProps {
  remainingCredits: number
}

export default function CreditInfo({ remainingCredits }: CreditInfoProps) {
  return (
    <div className="text-sm text-gray-600">
      <p>Remaining credits: <span className="font-bold">{remainingCredits}</span></p>
    </div>
  )
}