import type { OrderBookEntry } from 'app/domains/Dashboard'
import { useState } from 'react'
import { useOrderBookStats } from '../hooks/useOrderBookStats'
import { OrderBookRow } from './OrderBookRow'

type Props = {
  orders: OrderBookEntry[]
  originalOrders?: OrderBookEntry[]
  depth: number[]
  side: 'buy' | 'sell'
  base: string
  quote: string
  rounding: boolean
  displayAvgSum: boolean
  borderPosition?: 'top' | 'bottom'
  priceDecimals: number
  getHighlightedOrders: (
    hoveredIndex: number,
    displayOrders: OrderBookEntry[],
    originalOrders: OrderBookEntry[],
  ) => OrderBookEntry[]
  isHighlighted: (index: number, hoveredIndex: number) => boolean
}

export function OrderBookSection({
  orders,
  originalOrders,
  depth,
  side,
  base,
  quote,
  rounding,
  displayAvgSum,
  borderPosition = 'bottom',
  priceDecimals,
  getHighlightedOrders,
  isHighlighted,
}: Props) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  const statsOrders = originalOrders ?? orders

  const highlightedOrders =
    hoveredIndex !== null && displayAvgSum
      ? getHighlightedOrders(hoveredIndex, orders, statsOrders)
      : []

  const stats = useOrderBookStats(highlightedOrders)

  return (
    <div onMouseLeave={() => setHoveredIndex(null)}>
      {orders.map(([price, quantity], index) => {
        const depthPercent = depth[index] || 0
        const highlighted =
          hoveredIndex !== null && isHighlighted(index, hoveredIndex)
        const hovered = hoveredIndex === index

        return (
          <OrderBookRow
            key={`${side}-${index}`}
            price={price}
            quantity={quantity}
            depthPercent={depthPercent}
            side={side}
            isHighlighted={highlighted}
            isHovered={hovered}
            rounding={rounding}
            stats={hovered ? stats : null}
            base={base}
            quote={quote}
            borderPosition={borderPosition}
            priceDecimals={priceDecimals}
            onMouseEnter={() => setHoveredIndex(index)}
          />
        )
      })}
    </div>
  )
}
