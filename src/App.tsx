import './App.css'

import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import CsocList from './modules/CSOCList/CsocList'
import React from 'react';
import SocList from 'src/modules/SOCsList/SocsList';


const $t = (key: string, def?: string): string => key || def || '';
window.$t = $t

// Create a client
const queryClient = new QueryClient()

function App() {

  const [isSingleCsoc, setSingleCsoc] = React.useState(false)
  return (
    <QueryClientProvider client={queryClient}>

      <div>
        <button onClick={() => setSingleCsoc(!isSingleCsoc)}>Toggle Tables </button>
        {isSingleCsoc ? <SocList /> : <CsocList />}
      </div>
    </QueryClientProvider>

  )
}

export default App
