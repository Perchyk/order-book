import { useOrderBookStream } from 'app/domains/Dashboard/useCases/useOrderBookStream'
import { notReachable } from 'app/utils'
import { Skeleton } from './components/Skeleton'
import { Layout } from './Layout'

type Props = {
  symbol: string
  base: string
  quote: string
}

export function DataLoader({ base, quote, symbol }: Props) {
  const queryResult = useOrderBookStream({ symbol })

  switch (queryResult.type) {
    case 'loading':
      return <Skeleton />

    case 'error':
      return <p className="text-text-sell">Error: {queryResult.message}</p>

    case 'loaded':
      return <Layout data={queryResult.data} base={base} quote={quote} />

    default:
      return notReachable(queryResult)
  }
}
