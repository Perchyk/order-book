import { useEffect, useRef, useState } from 'react'

export type BinanceWebSocketConfig = {
  symbol: string
  levels?: 5 | 10 | 20
  updateSpeed?: '100ms' | '1000ms'
}

export type BinanceWebSocketCallbacks = {
  onMessage: (data: unknown) => void
}

export function useBinanceWebSocketDataSource(
  config: BinanceWebSocketConfig,
  callbacks: BinanceWebSocketCallbacks,
) {
  const [isConnected, setIsConnected] = useState(false)
  const [error, setError] = useState<Event | null>(null)

  const wsRef = useRef<WebSocket | null>(null)
  const reconnectAttemptsRef = useRef(0)
  const reconnectTimeoutRef = useRef<number | undefined>(undefined)

  const { symbol, levels = 20, updateSpeed = '1000ms' } = config
  const { onMessage } = callbacks

  useEffect(() => {
    const maxReconnectAttempts = 5
    const reconnectDelay = 1000

    const speedSuffix = updateSpeed === '100ms' ? '@100ms' : ''
    const streamName = `${symbol.toLowerCase()}@depth${levels}${speedSuffix}`
    const url = `wss://stream.binance.com:9443/ws/${streamName}`

    const connect = () => {
      const ws = new WebSocket(url)
      wsRef.current = ws

      ws.onopen = () => {
        reconnectAttemptsRef.current = 0
        setIsConnected(true)
        setError(null)
      }

      ws.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data)
          onMessage(data)
        } catch (err) {
          console.error('Failed to parse WebSocket message:', err)
        }
      }

      ws.onerror = (err) => {
        setError(err)
      }

      ws.onclose = () => {
        setIsConnected(false)
        setError(null)

        if (reconnectAttemptsRef.current < maxReconnectAttempts) {
          reconnectAttemptsRef.current++
          const delay = reconnectDelay * reconnectAttemptsRef.current

          console.log(`Reconnecting... Attempt ${reconnectAttemptsRef.current}`)
          reconnectTimeoutRef.current = window.setTimeout(connect, delay)
        }
      }
    }

    connect()

    return () => {
      if (reconnectTimeoutRef.current) {
        clearTimeout(reconnectTimeoutRef.current)
      }
      if (wsRef.current) {
        wsRef.current.close()
        wsRef.current = null
      }
    }
  }, [symbol, levels, updateSpeed, onMessage])

  return {
    isConnected,
    error,
  }
}
