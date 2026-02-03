import './App.css'
import { OrderBook } from 'app/domains/Dashboard/features/OrderBook'

function App() {
  return (
    <div className="card">
      <OrderBook symbol="BTCUSDT" levels={20} updateSpeed="1000ms" />
    </div>
  )
}

export default App
