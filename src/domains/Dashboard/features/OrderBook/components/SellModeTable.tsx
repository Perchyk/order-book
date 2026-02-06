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

export function SellModeTable({
  data,
  base,
  quote,
  rounding,
  depthMode,
  displayAvgSum,
}: Props) {
  const asksDepth = calculateDepth(data.bids, data.asks, depthMode).asksDepth

  return (
    <div className="text-xs">
      <TableHeader base={base} quote={quote} />
      <OrderBookSection
        orders={data.asks}
        depth={asksDepth}
        side="sell"
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
