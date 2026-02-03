export type OrderBookEntry = [price: string, quantity: string]

export type OrderBookData = {
  lastUpdateId: number
  bids: OrderBookEntry[]
  asks: OrderBookEntry[]
}
