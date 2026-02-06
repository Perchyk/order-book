import { useState } from 'react'
import { DataLoader } from './DataLoader'

type TradingPair = {
  base: string
  quote: string
  symbol: string
}

const TRADING_PAIRS: TradingPair[] = [
  { base: 'BTC', quote: 'USDT', symbol: 'BTCUSDT' },
  { base: 'ETH', quote: 'USDT', symbol: 'ETHUSDT' },
  { base: 'SOL', quote: 'USDT', symbol: 'SOLUSDT' },
]

export function OrderBook() {
  const [selectedPair, setSelectedPair] = useState<TradingPair>(
    TRADING_PAIRS[0],
  )

  return (
    <>
      <div className="flex gap-2 mb-4">
        {TRADING_PAIRS.map((pair) => (
          <button
            key={pair.symbol}
            onClick={() => setSelectedPair(pair)}
            className={`px-4 py-2 border-none cursor-pointer ${
              selectedPair.symbol === pair.symbol
                ? 'bg-blue-500 text-white'
                : 'bg-gray-600'
            }`}
          >
            {pair.base}/{pair.quote}
          </button>
        ))}
      </div>

      <DataLoader
        symbol={selectedPair.symbol}
        base={selectedPair.base}
        quote={selectedPair.quote}
      />
    </>
  )
}
