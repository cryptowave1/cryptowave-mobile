import { getIntlLocale } from '../../strings'

const formatNumber = (price: number, decimalPlaces?: number): string =>
   new Intl.NumberFormat(getIntlLocale(), {minimumFractionDigits: decimalPlaces}).format(price)
export default formatNumber
