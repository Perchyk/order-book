const LARGE_NUMBERS = {
  ALOT: {
    symbol: '',
    value: Math.pow(10, 27),
    key: 'ALOT',
  },
  SEPTILLION: {
    symbol: 'Y',
    value: Math.pow(10, 24),
    key: 'SEPTILLION',
  },
  SEXTILLION: {
    symbol: 'Z',
    value: Math.pow(10, 21),
    key: 'SEXTILLION',
  },
  QUINTILLION: {
    symbol: 'E',
    value: Math.pow(10, 18),
    key: 'QUINTILLION',
  },
  QUADRILLION: {
    symbol: 'P',
    value: Math.pow(10, 15),
    key: 'QUADRILLION',
  },
  TRILLIONS: {
    symbol: 'T',
    value: Math.pow(10, 12),
    key: 'TRILLIONS',
  },
  BILLIONS: {
    symbol: 'B',
    value: Math.pow(10, 9),
    key: 'BILLIONS',
  },
  MILLIONS: {
    symbol: 'M',
    value: Math.pow(10, 6),
    key: 'MILLIONS',
  },
  THOUSANDS: {
    symbol: 'K',
    value: Math.pow(10, 3),
    key: 'THOUSANDS',
  },
}

function toFixed(num: string, fixed: number) {
  const re = new RegExp('^-?\\d+(?:.\\d{0,' + (fixed || -1) + '})?')
  return parseFloat(num.match(re)![0]).toString()
}

export function toSignificantNumber(
  value: number,
  maxDecimalPlaces: number = 2,
) {
  const absValue = Math.abs(value)

  const largeNumber = Object.values(LARGE_NUMBERS).find(
    (largeNumber) => absValue >= largeNumber.value,
  )

  if (largeNumber) {
    return (
      formatToSignificantNumber(
        Number(value / largeNumber.value),
        maxDecimalPlaces,
      ) + largeNumber.symbol
    )
  }

  return formatToSignificantNumber(Number(value), maxDecimalPlaces)
}

function formatToSignificantNumber(
  value: number,
  maxDecimalPlaces: number = 1,
) {
  if (maxDecimalPlaces > 2) {
    return Number(value.toFixed(maxDecimalPlaces)).toString()
  }
  const absValue = Math.abs(value)

  if (absValue >= 100) {
    return toFixed(value.toString(), 0)
  }
  if (absValue >= 10) {
    return toFixed(value.toString(), Math.min(maxDecimalPlaces, 1))
  }
  if (absValue < 0.01) {
    return toFixed(value.toFixed(3), Math.min(maxDecimalPlaces, 1))
  }

  return toFixed(value.toString(), maxDecimalPlaces)
}
