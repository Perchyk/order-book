import { useQuery, useQueryClient } from '@tanstack/react-query'
import { type OrderBookData } from 'app/domains/Dashboard/Dashboard'
import {
  useBinanceWebSocketDataSource,
  type BinanceWebSocketConfig,
} from 'app/domains/Dashboard/dataSources/useBinanceWebSocketDataSource'
import { useCallback, useEffect, useMemo, useRef } from 'react'
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
    () => ['orderBook', symbol, levels] as const,
    [symbol, levels],
  )

  const query = useQuery<OrderBookData | null>({
    queryKey,
    queryFn: () => null,
    enabled: false,
    initialData: null,
    staleTime: Infinity,
  })

  const frameRef = useRef<number | undefined>(undefined)
  const latestDataRef = useRef<OrderBookData | null>(null)

  const handleMessage = useCallback(
    (data: unknown) => {
      const result = orderBookDataSchema.safeParse(data)

      if (!result.success) {
        console.error('Failed to parse order book data:', result.error)
        return
      }

      latestDataRef.current = result.data

      if (!frameRef.current) {
        frameRef.current = requestAnimationFrame(() => {
          queryClient.setQueryData(queryKey, latestDataRef.current)
          frameRef.current = undefined
        })
      }
    },
    [queryClient, queryKey],
  )

  const dataSource = useBinanceWebSocketDataSource(config, {
    onMessage: handleMessage,
  })

  useEffect(() => {
    return () => {
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current)
      }
    }
  }, [])

  if (query.data) {
    return { type: 'loaded', data: query.data }
  }

  if (dataSource.error && !dataSource.isConnected) {
    return { type: 'error', message: 'Failed to connect to order book stream' }
  }

  return { type: 'loading' }
}
