import React from 'react'
import { CryptoContextProvider } from './context/crypto-context';
import AppLayout from './components/layout/AppLayout';

const App: React.FC = () => {
  return(
    <>
        <CryptoContextProvider>
            <AppLayout />
        </CryptoContextProvider>
    </>
  )
}


export default App