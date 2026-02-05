import React from 'react'
import { CryptoContextProvider } from './context/crypto-context';
import AppLayout from './components/layout/AppLayout';
import { UiProvider } from './context/ui-context';

const App: React.FC = () => {
  return(
    <>
        <CryptoContextProvider>
          <UiProvider>
            <AppLayout />
          </UiProvider>
        </CryptoContextProvider>
    </>
  )
}


export default App