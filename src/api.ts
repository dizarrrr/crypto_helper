import { cryptoAssets, cryptoData } from "./data";
import { type ICryptoCoin, type IAsset } from "./types/crypto";

export function fakeFetchCrypto(): Promise<{result: ICryptoCoin[]}> {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(cryptoData as {result: ICryptoCoin[]})
        }, 100)
    })
}


export function fetchAssets(): Promise<IAsset[]> {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(cryptoAssets as IAsset[])
        }, 100)
    })
}