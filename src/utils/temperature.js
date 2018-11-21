
/**
 * Returns a formatted and human readable string representing temperature.
 */
let formatTemperature = function(celcius) {
    if (celcius == null) {
        return '--'
    } else {
        //return toFarenhieght(celcius) + '\u00b0' + 'F'
        return `${Math.round(celcius)}\u00b0C`
    }
}

let toFarenhieght = function (celcius) {
  return celcius * 1.8 + 32
}

export  {formatTemperature, toFarenhieght}
