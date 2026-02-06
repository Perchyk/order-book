import type { OrderBookData } from 'app/domains/Dashboard'
import { calculateDepth } from 'app/utils/calculateDepth'
import { toSignificantNumber } from 'app/utils/toSignificantNumber'
import { memo, useMemo } from 'react'

type Props = {
  data: OrderBookData
  base: string
  quote: string
  rounding: boolean
  depthMode: 'amount' | 'cumulative'
}

export const BuyModeTable = memo(function BuyModeTable({
  data,
  base,
  quote,
  rounding,
  depthMode,
}: Props) {
  const bidsDepth = useMemo(
    () => calculateDepth(data.bids, data.asks, depthMode).bidsDepth,
    [data.bids, data.asks, depthMode],
  )
  return (
    <div className="text-xs">
      <div className="grid grid-cols-[1fr_1fr_1fr] gap-4 py-2 text-gray-400 font-medium">
        <div>Price ({quote})</div>
        <div className="text-right">Amount ({base})</div>
        <div className="text-right">Total ({quote})</div>
      </div>

      <div>
        {data.bids.map(([price, quantity], index) => {
          const priceNum = parseFloat(price)
          const quantityNum = parseFloat(quantity)
          const totalValue = priceNum * quantityNum
          const total = rounding
            ? toSignificantNumber(totalValue, totalValue >= 1000 ? 2 : 4)
            : totalValue.toFixed(2)
          const depthPercent = bidsDepth[index] || 0
          return (
            <div
              key={`bid-${index}`}
              className="grid grid-cols-[1fr_1fr_1fr] gap-1 py-1 relative"
            >
              <div
                className="absolute inset-y-0 right-0 bg-buy opacity-10"
                style={{ width: `${depthPercent}%` }}
              />
              <div className="text-buy relative">{priceNum.toFixed(2)}</div>
              <div className="text-right relative">{quantityNum.toString()}</div>
              <div className="text-right relative">{total}</div>
            </div>
          )
        })}
      </div>
    </div>
  )
})
