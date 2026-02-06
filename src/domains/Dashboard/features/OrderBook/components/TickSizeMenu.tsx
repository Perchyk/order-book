type Props = {
  tickSize: number
  onTickSizeChange: (tickSize: number) => void
  maxPrice: number
}

const ALL_TICK_SIZES = [0.01, 0.1, 1, 10, 50, 100, 1000]

export const TickSizeMenu = ({
  tickSize,
  onTickSizeChange,
  maxPrice,
}: Props) => {
  // Only show tick sizes that are less than 10% of max price
  // This prevents prices from rounding to 0
  const availableTickSizes = ALL_TICK_SIZES.filter(
    (size) => size < maxPrice * 0.1,
  )
  return (
    <div className="relative inline-block text-left">
      <details className="group">
        <summary className="flex cursor-pointer items-center gap-1 rounded px-2 py-1 text-xs text-slate-200 hover:bg-neutral-700 focus:outline-none list-none">
          {tickSize}
          <svg
            className="h-3 w-3 transition-transform group-open:rotate-180"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </summary>

        <div className="absolute right-0 z-20 mt-1 w-24 rounded-lg bg-[#202630] shadow-xl">
          <div className="p-2 text-xs text-slate-200">
            {availableTickSizes.map((size) => (
              <div
                key={size}
                onClick={() => onTickSizeChange(size)}
                className={`w-full text-left px-3 py-2 rounded hover:bg-neutral-700 transition-colors cursor-pointer ${
                  tickSize === size ? 'bg-neutral-700 text-white' : ''
                }`}
              >
                {size}
              </div>
            ))}
          </div>
        </div>
      </details>
    </div>
  )
}
