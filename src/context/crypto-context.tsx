
import React, { createContext, useState, useEffect, useContext, type ReactNode } from "react";
import { fakeFetchCrypto, fetchAssets } from '../api';
import { percentDifference } from "../utils";
import { type IAsset, type ICryptoCoin } from "../types/crypto";


interface ICryptoContextType {
    assets: IAsset[];
    crypto: ICryptoCoin[];
    loading: boolean;
    setAssets?: React.Dispatch<React.SetStateAction<IAsset[]>>
}

const CryptoContext = createContext<ICryptoContextType>({
    assets: [],
    crypto: [],
    loading: false,
})

interface ICryptoContextProvider {
    children: ReactNode;
}

export function CryptoContextProvider({children}: ICryptoContextProvider) {
    const [loading, setLoading] = useState<boolean>(false)
    const [crypto, setCrypto] = useState<ICryptoCoin[]>([])
    const [assets, setAssets] = useState<IAsset[]>([])

    useEffect(() => {
        async function preload() {
            try {
                setLoading(true)
                const { result } = await fakeFetchCrypto()
                const assets = await fetchAssets()

                setAssets(assets.map((asset: IAsset) => {
                    const coin = result.find((coin: ICryptoCoin) => coin.id === asset.id)

                    if (!coin) return asset

                    return {
                        grow: asset.price < coin.price,
                        growPercent: percentDifference(asset.price, coin.price),
                        totalAmount: asset.amount * coin.price,
                        totalProfit: asset.amount * coin.price - asset.amount * asset.price,
                        ...asset,
                    }
                }))

                setCrypto(result)
            } catch (error) {
                console.log(`Ошибка запроса данных о монетах: ${error}`)
            } finally {
                setLoading(false)
            }
        }
        preload()
    }, [])

    return (
        <CryptoContext.Provider value={{loading, crypto, assets, setAssets}}>
            {children}
        </CryptoContext.Provider>
    )
    
}

export default CryptoContext

export function useCrypto() {
    return useContext(CryptoContext)
}