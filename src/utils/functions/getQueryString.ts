export function getQueryString(params: any) {
   return Object
      .keys(params)
      .map((k: string) => {
         if (Array.isArray(params[k])) {
            return params[k]
               .map((val: string) => `${encodeURIComponent(k)}[]=${encodeURIComponent(val)}`)
               .join('&')
         }

         return `${encodeURIComponent(k)}=${encodeURIComponent(params[k])}`
      })
      .join('&')
}
