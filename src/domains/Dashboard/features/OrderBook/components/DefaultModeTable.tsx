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

export function DefaultModeTable({
  data,
  base,
  quote,
  rounding,
  depthMode,
  displayAvgSum,
}: Props) {
  const displayCount = 10
  const [hoveredAsk, setHoveredAsk] = useState<number | null>(null)
  const [hoveredBid, setHoveredBid] = useState<number | null>(null)

  const asksSlice = data.asks.slice(0, displayCount)
  const bidsSlice = data.bids.slice(0, displayCount)

  // Calculate stats for asks when hovered
  const askStats =
    hoveredAsk !== null && displayAvgSum
      ? (() => {
          const highlightedAsks = asksSlice.slice(
            asksSlice.length - 1 - hoveredAsk,
          )
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

  // Calculate stats for bids when hovered
  const bidStats =
    hoveredBid !== null && displayAvgSum
      ? (() => {
          const highlightedBids = bidsSlice.slice(0, hoveredBid + 1)
          const prices = highlightedBids.map(([price]) => parseFloat(price))
          const quantities = highlightedBids.map(([, quantity]) =>
            parseFloat(quantity),
          )
          const avgPrice =
            prices.reduce((sum, p) => sum + p, 0) / prices.length
          const sumBase = quantities.reduce((sum, q) => sum + q, 0)
          const sumQuote = highlightedBids.reduce(
            (sum, [price, quantity]) =>
              sum + parseFloat(price) * parseFloat(quantity),
            0,
          )
          return { avgPrice, sumBase, sumQuote }
        })()
      : null

  const { bidsDepth: bidsDepthCalculated, asksDepth: asksDepthCalculated } =
    calculateDepth(bidsSlice, asksSlice, depthMode)

  const asksToDisplay = [...asksSlice].reverse()
  const asksDepth = [...asksDepthCalculated].reverse()
  const bidsToDisplay = bidsSlice
  const bidsDepth = bidsDepthCalculated

  return (
    <div className="text-xs">
      <div className="grid grid-cols-[1fr_1fr_1fr] gap-4 py-2 text-gray-400 font-medium">
        <div>Price ({quote})</div>
        <div className="text-right">Amount ({base})</div>
        <div className="text-right">Total ({quote})</div>
      </div>

      <div onMouseLeave={() => setHoveredAsk(null)}>
        {asksToDisplay.map(([price, quantity], index) => {
          const priceNum = parseFloat(price)
          const quantityNum = parseFloat(quantity)
          const totalValue = priceNum * quantityNum
          const total = rounding
            ? toSignificantNumber(totalValue, totalValue >= 1000 ? 2 : 4)
            : totalValue.toFixed(2)
          const depthPercent = asksDepth[index] || 0
          const isHighlighted = hoveredAsk !== null && index >= hoveredAsk
          const isHovered = hoveredAsk === index

          return (
            <div
              key={`ask-${index}`}
              className={`grid grid-cols-[1fr_1fr_1fr] gap-1 py-1 relative cursor-pointer ${
                isHovered ? 'border-t border-dashed border-gray-500' : ''
              }`}
              onMouseEnter={() => setHoveredAsk(index)}
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
              {isHovered && askStats && (
                <div className="absolute left-full top-1/2 -translate-y-1/2 ml-2 pointer-events-none z-10 whitespace-nowrap rounded bg-neutral-700 px-2 py-1 text-xs text-white">
                  <div className="text-left">
                    <div>Avg. Price: {askStats.avgPrice.toFixed(2)}</div>
                    <div>
                      Sum ({base}): {askStats.sumBase.toFixed(8)}
                    </div>
                    <div>
                      Sum ({quote}): {askStats.sumQuote.toFixed(2)}
                    </div>
                  </div>
                </div>
              )}
            </div>
          )
        })}
      </div>

      <hr className="my-2 -mx-4 h-px border-t-0 bg-neutral-100 dark:bg-white/10" />

      <div onMouseLeave={() => setHoveredBid(null)}>
        {bidsToDisplay.map(([price, quantity], index) => {
          const priceNum = parseFloat(price)
          const quantityNum = parseFloat(quantity)
          const totalValue = priceNum * quantityNum
          const total = rounding
            ? toSignificantNumber(totalValue, totalValue >= 1000 ? 2 : 4)
            : totalValue.toFixed(2)
          const depthPercent = bidsDepth[index] || 0
          const isHighlighted = hoveredBid !== null && index <= hoveredBid
          const isHovered = hoveredBid === index

          return (
            <div
              key={`bid-${index}`}
              className={`grid grid-cols-[1fr_1fr_1fr] gap-1 py-1 relative cursor-pointer ${
                isHovered ? 'border-b border-dashed border-gray-500' : ''
              }`}
              onMouseEnter={() => setHoveredBid(index)}
            >
              <div
                className="absolute inset-y-0 right-0 bg-buy opacity-10"
                style={{ width: `${depthPercent}%` }}
              />
              {isHighlighted && (
                <div className="absolute inset-0 bg-white opacity-5" />
              )}
              <div className="text-buy relative">{priceNum.toFixed(2)}</div>
              <div className="text-right relative">{quantityNum.toString()}</div>
              <div className="text-right relative">{total}</div>
              {isHovered && bidStats && (
                <div className="absolute left-full top-1/2 -translate-y-1/2 ml-2 pointer-events-none z-10 whitespace-nowrap rounded bg-neutral-700 px-2 py-1 text-xs text-white">
                  <div className="text-left">
                    <div>Avg. Price: {bidStats.avgPrice.toFixed(2)}</div>
                    <div>
                      Sum ({base}): {bidStats.sumBase.toFixed(8)}
                    </div>
                    <div>
                      Sum ({quote}): {bidStats.sumQuote.toFixed(2)}
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
