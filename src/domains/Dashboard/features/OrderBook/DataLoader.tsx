import {
  useOrderBookStream,
  type UseOrderBookStreamOptions,
} from 'app/domains/Dashboard/useCases/useOrderBookStream'
import { notReachable } from 'app/utils'
import { Layout } from './Layout'

type Props = UseOrderBookStreamOptions & {
  base: string
  quote: string
}

export function DataLoader({ base, quote, ...streamOptions }: Props) {
  const queryResult = useOrderBookStream(streamOptions)

  switch (queryResult.type) {
    case 'loading':
      return <p className="text-gray-500">Connecting and loading data...</p>

    case 'error':
      return <p className="text-text-sell">Error: {queryResult.message}</p>

    case 'loaded':
      return <Layout data={queryResult.data} base={base} quote={quote} />

    default:
      return notReachable(queryResult)
  }
}
