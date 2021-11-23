import { getIntlLocale } from '../../strings'

const getPreciseTime = (timestamp: number): string => {
   const date = new Date(timestamp)
   const options = {
      hour12: false,
      hour: '2-digit',
      minute: 'numeric',
      second: 'numeric',
   } as const
   return new Intl.DateTimeFormat(getIntlLocale(), options).format(date)
}
export default getPreciseTime
