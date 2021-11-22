import { getIntlLocale } from '../../strings'

const formatPrice = (price: number, decimalPlaces?: number): string =>
   new Intl.NumberFormat(getIntlLocale(), {minimumFractionDigits: decimalPlaces}).format(price)
export default formatPrice
