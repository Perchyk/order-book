import type { OrderBookEntry } from 'app/domains/Dashboard'

type Stats = {
  avgPrice: number
  sumBase: number
  sumQuote: number
}

export function useOrderBookStats(
  highlightedOrders: OrderBookEntry[],
): Stats | null {
  if (highlightedOrders.length === 0) {
    return null
  }

  const prices = highlightedOrders.map(([price]) => price)
  const quantities = highlightedOrders.map(([, quantity]) => quantity)

  const avgPrice = prices.reduce((sum, p) => sum + p, 0) / prices.length
  const sumBase = quantities.reduce((sum, q) => sum + q, 0)
  const sumQuote = highlightedOrders.reduce(
    (sum, [price, quantity]) => sum + price * quantity,
    0,
  )

  return { avgPrice, sumBase, sumQuote }
}
