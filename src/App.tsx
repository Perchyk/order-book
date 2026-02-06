import { OrderBook } from 'app/domains/Dashboard/features/OrderBook'
import './App.css'

function App() {
  return (
    <div className="card">
      <OrderBook levels={20} />
    </div>
  )
}

export default App
