import { DataLoader } from './DataLoader'

type Props = {
  symbol: string
  levels?: 5 | 10 | 20
  updateSpeed?: '100ms' | '1000ms'
}

export function OrderBook({
  symbol,
  levels = 20,
  updateSpeed = '1000ms',
}: Props) {
  return (
    <div>
      <h1>Order Book - {symbol}</h1>
      <DataLoader symbol={symbol} levels={levels} updateSpeed={updateSpeed} />
    </div>
  )
}
