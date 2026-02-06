import type { OrderBookData } from 'app/domains/Dashboard'
import { calculateDepth } from 'app/utils/calculateDepth'
import { toSignificantNumber } from 'app/utils/toSignificantNumber'
import { useState } from 'react'

type Props = {
  data: OrderBookData
  base: string
  quote: string
  rounding: boolean
  depthMode: 'amount' | 'cumulative'
  displayAvgSum: boolean
}

export function SellModeTable({
  data,
  base,
  quote,
  rounding,
  depthMode,
  displayAvgSum,
}: Props) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const asksDepth = calculateDepth(data.bids, data.asks, depthMode).asksDepth

  // Calculate stats when hovered
  const stats =
    hoveredIndex !== null && displayAvgSum
      ? (() => {
          const highlightedAsks = data.asks.slice(0, hoveredIndex + 1)
          const prices = highlightedAsks.map(([price]) => parseFloat(price))
          const quantities = highlightedAsks.map(([, quantity]) =>
            parseFloat(quantity),
          )
          const avgPrice =
            prices.reduce((sum, p) => sum + p, 0) / prices.length
          const sumBase = quantities.reduce((sum, q) => sum + q, 0)
          const sumQuote = highlightedAsks.reduce(
            (sum, [price, quantity]) =>
              sum + parseFloat(price) * parseFloat(quantity),
            0,
          )
          return { avgPrice, sumBase, sumQuote }
        })()
      : null

  return (
    <div className="text-xs">
      <div className="grid grid-cols-[1fr_1fr_1fr] gap-4 py-2 text-gray-400 font-medium">
        <div>Price ({quote})</div>
        <div className="text-right">Amount ({base})</div>
        <div className="text-right">Total ({quote})</div>
      </div>

      <div onMouseLeave={() => setHoveredIndex(null)}>
        {data.asks.map(([price, quantity], index) => {
          const priceNum = parseFloat(price)
          const quantityNum = parseFloat(quantity)
          const totalValue = priceNum * quantityNum
          const total = rounding
            ? toSignificantNumber(totalValue, totalValue >= 1000 ? 2 : 4)
            : totalValue.toFixed(2)
          const depthPercent = asksDepth[index] || 0
          const isHighlighted = hoveredIndex !== null && index <= hoveredIndex
          const isHovered = hoveredIndex === index

          return (
            <div
              key={`ask-${index}`}
              className={`grid grid-cols-[1fr_1fr_1fr] gap-1 py-1 relative cursor-pointer ${
                isHovered ? 'border-b border-dashed border-gray-500' : ''
              }`}
              onMouseEnter={() => setHoveredIndex(index)}
            >
              <div
                className="absolute inset-y-0 right-0 bg-sell opacity-10"
                style={{ width: `${depthPercent}%` }}
              />
              {isHighlighted && (
                <div className="absolute inset-0 bg-white opacity-5" />
              )}
              <div className="text-sell relative">{priceNum.toFixed(2)}</div>
              <div className="text-right relative">{quantityNum.toString()}</div>
              <div className="text-right relative">{total}</div>
              {isHovered && stats && (
                <div className="absolute left-full top-1/2 -translate-y-1/2 ml-2 pointer-events-none z-10 whitespace-nowrap rounded bg-neutral-700 px-2 py-1 text-xs text-white">
                  <div className="text-left">
                    <div>Avg. Price: {stats.avgPrice.toFixed(2)}</div>
                    <div>
                      Sum ({base}): {stats.sumBase.toFixed(8)}
                    </div>
                    <div>
                      Sum ({quote}): {stats.sumQuote.toFixed(2)}
                    </div>
                  </div>
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
