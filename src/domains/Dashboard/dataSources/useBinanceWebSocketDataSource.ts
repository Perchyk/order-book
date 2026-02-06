import { useEffect, useRef, useState } from 'react'

export type BinanceWebSocketConfig = {
  symbol: string
  levels?: 5 | 10 | 20
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
  const onMessageRef = useRef(callbacks.onMessage)

  const { symbol, levels } = config

  useEffect(() => {
    onMessageRef.current = callbacks.onMessage
  }, [callbacks.onMessage])

  useEffect(() => {
    const maxReconnectAttempts = 5
    const baseReconnectDelay = 1000
    let shouldReconnect = true

    const streamName = `${symbol.toLowerCase()}@depth${levels}`
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
          onMessageRef.current(data)
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

        if (
          shouldReconnect &&
          reconnectAttemptsRef.current < maxReconnectAttempts
        ) {
          reconnectAttemptsRef.current++
          const delay = Math.min(
            30000,
            baseReconnectDelay * 2 ** reconnectAttemptsRef.current,
          )

          reconnectTimeoutRef.current = window.setTimeout(connect, delay)
        }
      }
    }

    connect()

    return () => {
      shouldReconnect = false
      if (reconnectTimeoutRef.current) {
        clearTimeout(reconnectTimeoutRef.current)
      }
      if (wsRef.current) {
        wsRef.current.close(1000, 'cleanup')
        wsRef.current = null
      }
    }
  }, [symbol, levels])

  return {
    isConnected,
    error,
  }
}
