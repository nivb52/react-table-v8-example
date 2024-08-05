import './App.css'

import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import CsocList from './modules/CSOCList/CsocList'


const $t = (key: string): string => key
window.$t = $t

// Create a client
const queryClient = new QueryClient()

function App() {

  return (
    <QueryClientProvider client={queryClient}>
      <CsocList />
    </QueryClientProvider>

  )
}

export default App
