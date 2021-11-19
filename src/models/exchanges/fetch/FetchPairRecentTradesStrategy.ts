import Trade from '../../market/Trade'

export abstract class FetchPairTradesStrategy<RequestParams, ResponseParams> {
   private readonly endpoint: string
   private readonly requestParams: RequestParams
   private readonly responseParams: ResponseParams

   private readonly startRequestFuntion: (responses: Response[]) => Trade[]
   private readonly transformResponseFunction: (responses: Response[]) => Trade[]

   // todo implement

   protected constructor(endpoint: string,
                         requestParams: RequestParams,
                         responseParams: ResponseParams,
                         transformResultFunction: (responses: Response[]) => Trade[]) {
      this.endpoint = endpoint
      this.responseParams = responseParams
      this.requestParams = requestParams
      this.transformResponseFunction = transformResultFunction
   }
}
