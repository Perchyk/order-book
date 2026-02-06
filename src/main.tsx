import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { ErrorBoundary } from './components'
import './index.css'

const queryClient = new QueryClient()

createRoot(document.getElementById('root')!).render(
  <ErrorBoundary>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </ErrorBoundary>,
)
