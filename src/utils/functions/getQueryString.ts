export function getQueryString(params: any) {
   return Object
      .keys(params)
      .map((k: string) => {
         if (Array.isArray(params[k])) {
            return params[k]
               .filter((val: string | undefined) => val !== undefined)
               .map((val: string) => `${encodeURIComponent(k)}[]=${encodeURIComponent(val)}`)
               .join('&')
         }
         if (!params[k]) {
            return ''
         }
         return `${encodeURIComponent(k)}=${encodeURIComponent(params[k])}`
      })
      .join('&')
}
