
/**
 * Returns a formatted and human readable string representing temperature.
 */
const formatTemperature = function(celcius) {
  //return toFarenhieght(celcius) + '\u00b0' + 'F'
  return celcius + "\u00b0C"
}

const toFarenhieght = function(celcius) {
  return celcius * 1.8 + 32
}

export default formatTemperature
