import type { OrderBookEntry } from 'app/domains/Dashboard'

export function calculateDepth(
  bids: OrderBookEntry[],
  asks: OrderBookEntry[],
  mode: 'amount' | 'cumulative',
): { bidsDepth: number[]; asksDepth: number[] } {
  if (mode === 'amount') {
    // For amount mode, find global max across both sides
    const bidQuantities = bids.map(([, quantity]) => parseFloat(quantity))
    const askQuantities = asks.map(([, quantity]) => parseFloat(quantity))
    const globalMax = Math.max(...bidQuantities, ...askQuantities)

    return {
      bidsDepth: bidQuantities.map((q) => (q / globalMax) * 100),
      asksDepth: askQuantities.map((q) => (q / globalMax) * 100),
    }
  } else {
    // Cumulative mode: calculate cumulative sums for both sides
    const bidQuantities = bids.map(([, quantity]) => parseFloat(quantity))
    const askQuantities = asks.map(([, quantity]) => parseFloat(quantity))

    const bidsCumulative: number[] = []
    let bidSum = 0
    for (const q of bidQuantities) {
      bidSum += q
      bidsCumulative.push(bidSum)
    }

    const asksCumulative: number[] = []
    let askSum = 0
    for (const q of askQuantities) {
      askSum += q
      asksCumulative.push(askSum)
    }

    // Find global max cumulative across both sides
    const globalMaxCumulative = Math.max(
      ...bidsCumulative,
      ...asksCumulative,
      0,
    )

    return {
      bidsDepth: bidsCumulative.map((c) => (c / globalMaxCumulative) * 100),
      asksDepth: asksCumulative.map((c) => (c / globalMaxCumulative) * 100),
    }
  }
}
