import {
  useOrderBookStream,
  type UseOrderBookStreamOptions,
} from 'app/domains/Dashboard/useCases/useOrderBookStream'
import { notReachable } from 'app/utils/notReachable'
import { Layout } from './Layout'

type Props = UseOrderBookStreamOptions

export function DataLoader(props: Props) {
  const queryResult = useOrderBookStream(props)

  switch (queryResult.type) {
    case 'loading':
      return <p>Connecting and loading data...</p>

    case 'error':
      return <p style={{ color: 'red' }}>Error: {queryResult.message}</p>

    case 'loaded':
      return <Layout data={queryResult.data} />

    default:
      return notReachable(queryResult)
  }
}
