import {
  useOrderBookRepository,
  type OrderBookRepositoryConfig,
  type OrderBookQueryResult,
} from 'app/domains/Dashboard/repositories/useOrderBookRepository'

export type UseOrderBookStreamOptions = OrderBookRepositoryConfig
export type { OrderBookQueryResult }

export function useOrderBookStream(
  options: UseOrderBookStreamOptions,
): OrderBookQueryResult {
  return useOrderBookRepository(options)
}
