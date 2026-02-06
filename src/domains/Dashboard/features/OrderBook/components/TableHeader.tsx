type Props = {
  base: string
  quote: string
}

export function TableHeader({ base, quote }: Props) {
  return (
    <div className="grid grid-cols-[1fr_1fr_1fr] gap-4 py-2 text-gray-400 font-medium">
      <div>Price ({quote})</div>
      <div className="text-right">Amount ({base})</div>
      <div className="text-right">Total ({quote})</div>
    </div>
  )
}
