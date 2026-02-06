import { toSignificantNumber } from 'app/utils/toSignificantNumber'

type Stats = {
  avgPrice: number
  sumBase: number
  sumQuote: number
}

type Props = {
  price: string
  quantity: string
  depthPercent: number
  side: 'buy' | 'sell'
  isHighlighted: boolean
  isHovered: boolean
  rounding: boolean
  stats: Stats | null
  base: string
  quote: string
  borderPosition?: 'top' | 'bottom'
  onMouseEnter: () => void
}

export function OrderBookRow({
  price,
  quantity,
  depthPercent,
  side,
  isHighlighted,
  isHovered,
  rounding,
  stats,
  base,
  quote,
  borderPosition = 'bottom',
  onMouseEnter,
}: Props) {
  const priceNum = parseFloat(price)
  const quantityNum = parseFloat(quantity)
  const totalValue = priceNum * quantityNum
  const total = rounding
    ? toSignificantNumber(totalValue, totalValue >= 1000 ? 2 : 4)
    : totalValue.toFixed(2)

  const textColor = side === 'buy' ? 'text-buy' : 'text-sell'
  const bgColor = side === 'buy' ? 'bg-buy' : 'bg-sell'
  const borderClass =
    borderPosition === 'top' ? 'border-t' : 'border-b'

  return (
    <div
      className={`grid grid-cols-[1fr_1fr_1fr] gap-1 py-1 relative cursor-pointer ${
        isHovered ? `${borderClass} border-dashed border-gray-500` : ''
      }`}
      onMouseEnter={onMouseEnter}
    >
      <div
        className={`absolute inset-y-0 right-0 ${bgColor} opacity-10`}
        style={{ width: `${depthPercent}%` }}
      />
      {isHighlighted && <div className="absolute inset-0 bg-white opacity-5" />}
      <div className={`${textColor} relative`}>{priceNum.toFixed(2)}</div>
      <div className="text-right relative">{quantityNum.toString()}</div>
      <div className="text-right relative">{total}</div>
      {isHovered && stats && (
        <div className="absolute left-full top-1/2 -translate-y-1/2 ml-2 pointer-events-none z-10 whitespace-nowrap rounded bg-neutral-700 px-2 py-1 text-xs text-white">
          <div className="text-left">
            <div>Avg. Price: {stats.avgPrice.toFixed(2)}</div>
            <div>
              Sum ({base}): {stats.sumBase.toFixed(8)}
            </div>
            <div>
              Sum ({quote}): {stats.sumQuote.toFixed(2)}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
