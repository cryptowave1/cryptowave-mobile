import { getIntlLocale } from '../../strings'

let getDecimalsString = (value: number) => {
   if (Math.floor(value) === value) return ''
   return value.toString().split('.')[1]
}

function rightTrim(char: string, str: string): string {
   if (!str) {
      return ''
   }
   if (str.slice(str.length - char.length) === char) {
      return rightTrim(char, str.slice(0, 0 - char.length))
   } else {
      return str
   }
}

const formatNumber = (number: number, decimalPlaces?: number): string => {
   if (!decimalPlaces) {
      let decimalStr = getDecimalsString(number)
      decimalStr = rightTrim('0', decimalStr)
      decimalPlaces = decimalStr.length
   }

   return new Intl.NumberFormat(getIntlLocale(), {minimumFractionDigits: decimalPlaces}).format(number)
}
export default formatNumber
