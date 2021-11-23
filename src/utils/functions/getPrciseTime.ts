import { getIntlLocale } from '../../strings'

const getPreciseTime = (date: Date): string => {
   const options = {
      fractionalSecondDigits: 2,
      minute: 'numeric',
      second: 'numeric',
   } as const
   return new Intl.DateTimeFormat(getIntlLocale(), options).format(date)
}
export default getPreciseTime
