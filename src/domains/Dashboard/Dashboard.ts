export type OrderBookEntry = [price: number, quantity: number]

export type OrderBookData = {
  lastUpdateId: number
  bids: OrderBookEntry[]
  asks: OrderBookEntry[]
}

export type OrderBookMode = 'default' | 'buy' | 'sell'
