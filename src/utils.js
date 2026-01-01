export const percentDifference = (oldValue, newValue) => {
    return +(100 * Math.abs( oldValue - newValue ) / ( (oldValue + newValue) / 2 )).toFixed(2)
}


export const capitalize = (str) => {
    return str.charAt(0).toUpperCase() + str.substr(1)
}