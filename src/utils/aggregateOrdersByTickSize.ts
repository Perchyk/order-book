import type { OrderBookEntry } from 'app/domains/Dashboard'

export function aggregateOrdersByTickSize(
  orders: OrderBookEntry[],
  tickSize: number,
): OrderBookEntry[] {
  const aggregated = new Map<number, number>()

  for (const [price, quantity] of orders) {
    const roundedPrice = Math.round(price / tickSize) * tickSize

    const currentQuantity = aggregated.get(roundedPrice) || 0
    aggregated.set(roundedPrice, currentQuantity + quantity)
  }

  return Array.from(aggregated.entries())
    .map(
      ([price, quantity]): OrderBookEntry => [
        price,
        parseFloat(quantity.toFixed(8)),
      ],
    )
    .sort((a, b) => b[0] - a[0])
}
