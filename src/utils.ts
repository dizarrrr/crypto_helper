export const percentDifference = (oldValue: number, newValue: number): number => {
    return +(100 * Math.abs( oldValue - newValue ) / ( (oldValue + newValue) / 2 )).toFixed(2)
}


export const capitalize = (str: string): string => {
    if (!str) return str
    return str.charAt(0).toUpperCase() + str.slice(1)
}

