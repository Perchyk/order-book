import type { OrderBookData } from 'app/domains/Dashboard'
import { aggregateOrdersByTickSize } from 'app/utils/aggregateOrdersByTickSize'
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
  tickSize: number
}

export function SellModeTable({
  data,
  base,
  quote,
  rounding,
  depthMode,
  displayAvgSum,
  tickSize,
}: Props) {
  const aggregatedAsks = aggregateOrdersByTickSize(data.asks, tickSize)
  const aggregatedBids = aggregateOrdersByTickSize(data.bids, tickSize)

  const asksDepth = calculateDepth(aggregatedBids, aggregatedAsks, depthMode)
    .asksDepth

  const priceDecimals = Math.max(0, -Math.log10(tickSize))

  return (
    <div className="text-xs">
      <TableHeader base={base} quote={quote} />
      <div className="min-h-[500px]">
        <OrderBookSection
          orders={aggregatedAsks}
          depth={asksDepth}
          side="sell"
          base={base}
          quote={quote}
          rounding={rounding}
          displayAvgSum={displayAvgSum}
          borderPosition="bottom"
          priceDecimals={priceDecimals}
          getHighlightedOrders={(hoveredIndex, _displayOrders, originalOrders) =>
            originalOrders.slice(0, hoveredIndex + 1)
          }
          isHighlighted={(index, hoveredIndex) => index <= hoveredIndex}
        />
      </div>
    </div>
  )
}
