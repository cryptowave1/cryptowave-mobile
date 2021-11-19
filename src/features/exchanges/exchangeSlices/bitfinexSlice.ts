import createExchangeSlice, { ExchangeState } from '../createExchangeSlice'
import Exchange from '../../../models/exchanges/Exchange'
import text from '../../../text'
import ConcreteFetchPairPriceStrategyBinance from '../../../models/exchanges/fetch/ConcreteFetchPairPriceStrategyBinance'

export const bitfinexSliceInitialState: ExchangeState = {
   fetchPairTradesStrategy: new ConcreteFetchPairPriceStrategyBinance(),
   exchange: new Exchange('bitfinex', text.exchange_name_bitfinex),
   tickerToAssetPairTrades: {},
}

export default createExchangeSlice({
   name: 'bitfinexSlice',
   initialState: bitfinexSliceInitialState,
})
