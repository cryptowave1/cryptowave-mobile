import { getIntlLocale } from '../../strings'

const formatPrice = (price: number): string => new Intl.NumberFormat(getIntlLocale()).format(price)
export default formatPrice
