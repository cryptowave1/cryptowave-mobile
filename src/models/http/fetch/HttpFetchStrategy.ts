import { getQueryString } from '../../../utils/functions/getQueryString'

interface RequestParams {
   endpoint: string
   method: 'GET' | 'POST' | 'PUT' | 'HEAD' | 'OPTIONS' | 'DELETE' | 'PATCH'
   query?: Object | undefined
   body?: any | undefined
}

export default class HttpRequestStrategy<RequiredType, ExecuteArgumentsType, ResponseType> {
   private readonly transformRequestFunction: (...params: any) => RequestParams
   private readonly transformResponseFunction?: (response: ResponseType) => RequiredType
   private readonly transformErrorFunction?: (err: unknown) => Error

   constructor(transformRequestFunction: (params: ExecuteArgumentsType) => RequestParams,
               transformResponseFunction?: (response: ResponseType) => RequiredType,
               transformErrorFunction?: (err: any) => Error) {
      this.transformRequestFunction = transformRequestFunction
      this.transformResponseFunction = transformResponseFunction
      this.transformErrorFunction = transformErrorFunction
   }

   public async execute(params: ExecuteArgumentsType): Promise<RequiredType | Response> {
      const requestParams: RequestParams = this.transformRequestFunction(params)
      const endpointWithQuery: string = `${requestParams.endpoint}?${getQueryString(requestParams.query)}`
      try {
         const response: Response | Error = await fetch(endpointWithQuery, {
            method: requestParams.method,
            body: requestParams.body,
         })

         const result: ResponseType = await response.json()

         if (!response.ok) {
            throw result
         }

         if (this.transformResponseFunction) {
            return this.transformResponseFunction(result)
         }
         return response
      } catch (err) {
         if (this.transformErrorFunction) {
            throw this.transformErrorFunction(err)
         }
         throw err
      }
   }
}
