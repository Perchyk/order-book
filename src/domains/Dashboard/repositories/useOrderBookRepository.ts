import { useQuery, useQueryClient } from '@tanstack/react-query'
import { type OrderBookData } from 'app/domains/Dashboard/Dashboard'
import {
  useBinanceWebSocketDataSource,
  type BinanceWebSocketConfig,
} from 'app/domains/Dashboard/dataSources/useBinanceWebSocketDataSource'
import { useCallback, useMemo } from 'react'
import { orderBookDataSchema } from './mappers/mapOrderBookData'

export type OrderBookRepositoryConfig = BinanceWebSocketConfig

export type OrderBookQueryResult =
  | { type: 'loading' }
  | { type: 'loaded'; data: OrderBookData }
  | { type: 'error'; message: string }

export function useOrderBookRepository(
  config: OrderBookRepositoryConfig,
): OrderBookQueryResult {
  const queryClient = useQueryClient()
  const { symbol, levels = 20 } = config

  const queryKey = useMemo(
    () => ['orderBook', symbol, levels],
    [symbol, levels],
  )

  const query = useQuery<OrderBookData | null>({
    queryKey,
    queryFn: () => null,
    staleTime: Infinity,
  })

  const handleMessage = useCallback(
    (data: unknown) => {
      const result = orderBookDataSchema.safeParse(data)

      if (result.success) {
        queryClient.setQueryData(queryKey, result.data)
      } else {
        console.error('Failed to parse order book data:', result.error)
      }
    },
    [queryClient, queryKey],
  )

  const dataSource = useBinanceWebSocketDataSource(config, {
    onMessage: handleMessage,
  })

  if (query.data) {
    return { type: 'loaded', data: query.data }
  }

  if (dataSource.error && !dataSource.isConnected) {
    return { type: 'error', message: 'Failed to connect to order book stream' }
  }

  return { type: 'loading' }
}
