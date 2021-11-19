import createExchangeSlice, { ExchangeState } from './createExchangeSlice'
import Exchange from '../../models/Exchange'
import text from '../../text'
import ConcreteFetchPairPriceStrategyBinance from '../../api/trades/ConcreteFetchPairPriceStrategyBinance'

export const bitfinexSliceInitialState: ExchangeState = {
   fetchPairTradesStrategy: new ConcreteFetchPairPriceStrategyBinance(),
   exchange: new Exchange('bitfinex', text.exchange_name_bitfinex),
   tickerToAssetPairTrades: {},
}

export default createExchangeSlice({
   name: 'bitfinexSlice',
   initialState: bitfinexSliceInitialState,
})
