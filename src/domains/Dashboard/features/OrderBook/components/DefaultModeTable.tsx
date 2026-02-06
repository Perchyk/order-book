import type { OrderBookData } from 'app/domains/Dashboard'
import { calculateDepth } from 'app/utils/calculateDepth'
import { OrderBookSection } from './OrderBookSection'
import { TableHeader } from './TableHeader'

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

  const asksSlice = data.asks.slice(0, displayCount)
  const bidsSlice = data.bids.slice(0, displayCount)

  const { bidsDepth: bidsDepthCalculated, asksDepth: asksDepthCalculated } =
    calculateDepth(bidsSlice, asksSlice, depthMode)

  const asksToDisplay = [...asksSlice].reverse()
  const asksDepth = [...asksDepthCalculated].reverse()
  const bidsToDisplay = bidsSlice
  const bidsDepth = bidsDepthCalculated

  return (
    <div className="text-xs">
      <TableHeader base={base} quote={quote} />

      <OrderBookSection
        orders={asksToDisplay}
        originalOrders={asksSlice}
        depth={asksDepth}
        side="sell"
        base={base}
        quote={quote}
        rounding={rounding}
        displayAvgSum={displayAvgSum}
        borderPosition="top"
        getHighlightedOrders={(
          hoveredIndex,
          _displayOrders,
          originalOrders,
        ) => originalOrders.slice(hoveredIndex)}
        isHighlighted={(index, hoveredIndex) => index >= hoveredIndex}
      />

      <hr className="my-2 -mx-4 h-px border-t-0 bg-neutral-100 dark:bg-white/10" />

      <OrderBookSection
        orders={bidsToDisplay}
        depth={bidsDepth}
        side="buy"
        base={base}
        quote={quote}
        rounding={rounding}
        displayAvgSum={displayAvgSum}
        borderPosition="bottom"
        getHighlightedOrders={(hoveredIndex, _displayOrders, originalOrders) =>
          originalOrders.slice(0, hoveredIndex + 1)
        }
        isHighlighted={(index, hoveredIndex) => index <= hoveredIndex}
      />
    </div>
  )
}
