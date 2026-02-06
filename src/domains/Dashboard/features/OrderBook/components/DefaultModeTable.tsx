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

export const DefaultModeTable = memo(function DefaultModeTable({
  data,
  base,
  quote,
  rounding,
  depthMode,
}: Props) {
  const displayCount = 10

  const { asksToDisplay, asksDepth, bidsToDisplay, bidsDepth } = useMemo(() => {
    const asksSlice = data.asks.slice(0, displayCount)
    const bidsSlice = data.bids.slice(0, displayCount)

    const { bidsDepth: bidsDepthCalculated, asksDepth: asksDepthCalculated } =
      calculateDepth(bidsSlice, asksSlice, depthMode)

    return {
      asksToDisplay: [...asksSlice].reverse(),
      asksDepth: [...asksDepthCalculated].reverse(),
      bidsToDisplay: bidsSlice,
      bidsDepth: bidsDepthCalculated,
    }
  }, [data.asks, data.bids, depthMode])

  return (
    <div className="text-xs">
      <div className="grid grid-cols-[1fr_1fr_1fr] gap-4 py-2 text-gray-400 font-medium">
        <div>Price ({quote})</div>
        <div className="text-right">Amount ({base})</div>
        <div className="text-right">Total ({quote})</div>
      </div>

      <div>
        {asksToDisplay.map(([price, quantity], index) => {
          const priceNum = parseFloat(price)
          const quantityNum = parseFloat(quantity)
          const totalValue = priceNum * quantityNum
          const total = rounding
            ? toSignificantNumber(totalValue, totalValue >= 1000 ? 2 : 4)
            : totalValue.toFixed(2)
          const depthPercent = asksDepth[index] || 0
          return (
            <div
              key={`ask-${index}`}
              className="grid grid-cols-[1fr_1fr_1fr] gap-1 py-1 relative"
            >
              <div
                className="absolute inset-y-0 right-0 bg-sell opacity-10"
                style={{ width: `${depthPercent}%` }}
              />
              <div className="text-sell relative">{priceNum.toFixed(2)}</div>
              <div className="text-right relative">{quantityNum.toString()}</div>
              <div className="text-right relative">{total}</div>
            </div>
          )
        })}
      </div>

      <hr className="my-2 -mx-4 h-px border-t-0 bg-neutral-100 dark:bg-white/10" />

      <div>
        {bidsToDisplay.map(([price, quantity], index) => {
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
