import type { OrderBookEntry } from 'app/domains/Dashboard'

export function aggregateOrdersByTickSize(
  orders: OrderBookEntry[],
  tickSize: number,
): OrderBookEntry[] {
  const aggregated = new Map<number, number>()

  for (const [price, quantity] of orders) {
    const priceNum = parseFloat(price)
    const quantityNum = parseFloat(quantity)
    const roundedPrice = Math.round(priceNum / tickSize) * tickSize

    const currentQuantity = aggregated.get(roundedPrice) || 0
    aggregated.set(roundedPrice, currentQuantity + quantityNum)
  }

  return Array.from(aggregated.entries())
    .map(
      ([price, quantity]): OrderBookEntry => [
        price.toString(),
        parseFloat(quantity.toFixed(8)).toString(),
      ],
    )
    .sort((a, b) => parseFloat(b[0]) - parseFloat(a[0]))
}
