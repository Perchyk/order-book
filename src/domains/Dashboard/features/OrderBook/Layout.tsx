import type { OrderBookData } from 'app/domains/Dashboard'

type Props = {
  data: OrderBookData
}

export function Layout({ data }: Props) {
  return (
    <div style={{ display: 'flex', gap: '2rem', marginTop: '1rem' }}>
      <div style={{ flex: 1 }}>
        <h2>Bids (Buy Orders)</h2>
        <table style={{ width: '100%', fontSize: '12px' }}>
          <thead>
            <tr>
              <th style={{ textAlign: 'left' }}>Price</th>
              <th style={{ textAlign: 'right' }}>Quantity</th>
            </tr>
          </thead>
          <tbody>
            {data.bids.map(([price, quantity], index) => (
              <tr key={index}>
                <td style={{ color: '#0ecb81' }}>{price}</td>
                <td style={{ textAlign: 'right' }}>{quantity}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div style={{ flex: 1 }}>
        <h2>Asks (Sell Orders)</h2>
        <table style={{ width: '100%', fontSize: '12px' }}>
          <thead>
            <tr>
              <th style={{ textAlign: 'left' }}>Price</th>
              <th style={{ textAlign: 'right' }}>Quantity</th>
            </tr>
          </thead>
          <tbody>
            {data.asks.map(([price, quantity], index) => (
              <tr key={index}>
                <td style={{ color: '#f6465d' }}>{price}</td>
                <td style={{ textAlign: 'right' }}>{quantity}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
