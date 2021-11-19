import createExchangeSlice, { ExchangeState } from '../createExchangeSlice'
import Exchange from '../../../models/exchanges/Exchange'
import text from '../../../text'
import ConcreteFetchPairPriceStrategyBinance from '../../../models/exchanges/fetch/ConcreteFetchPairPriceStrategyBinance'

export const krakenSliceInitialState: ExchangeState = {
   fetchPairTradesStrategy: new ConcreteFetchPairPriceStrategyBinance(),
   exchange: new Exchange('kraken', text.exchange_name_kraken),
   tickerToAssetPairTrades: {}
}

const krakenSlice = createExchangeSlice({
   name: 'krakenSlice',
   initialState: krakenSliceInitialState
})

export default krakenSlice
