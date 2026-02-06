import type { OrderBookData } from 'app/domains/Dashboard'

type Props = {
  data: OrderBookData
}

export function BuySellRatio({ data }: Props) {
  const totalBids = data.bids.reduce(
    (sum, [, quantity]) => sum + quantity,
    0,
  )
  const totalAsks = data.asks.reduce(
    (sum, [, quantity]) => sum + quantity,
    0,
  )
  const total = totalBids + totalAsks

  const buyPercentage = total > 0 ? (totalBids / total) * 100 : 50
  const sellPercentage = total > 0 ? (totalAsks / total) * 100 : 50

  return (
    <div className="flex items-center gap-2 text-xs mt-4">
      <span className="text-buy">
        <span className="text-white">B</span> {buyPercentage.toFixed(2)}%
      </span>
      <div className="flex-1 flex h-1 rounded-full overflow-hidden">
        <div className="bg-buy" style={{ width: `${buyPercentage}%` }} />
        <div className="bg-sell" style={{ width: `${sellPercentage}%` }} />
      </div>
      <span className="text-sell">
        {sellPercentage.toFixed(2)}% <span className="text-white">S</span>
      </span>
    </div>
  )
}
