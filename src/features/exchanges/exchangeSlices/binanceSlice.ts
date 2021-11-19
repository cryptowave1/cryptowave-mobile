import createExchangeSlice, { ExchangeState } from '../createExchangeSlice'
import Exchange from '../../../models/exchanges/Exchange'
import text from '../../../text'
import ConcreteFetchPairPriceStrategyBinance from '../../../models/exchanges/fetch/ConcreteFetchPairPriceStrategyBinance'

export const binanceSliceInitialState: ExchangeState = {
   fetchPairTradesStrategy: new ConcreteFetchPairPriceStrategyBinance(),
   exchange: new Exchange('binance', text.exchange_name_binance),
   tickerToAssetPairTrades: {}
}

const binanceSlice = createExchangeSlice({
   name: 'binanceSlice',
   initialState: binanceSliceInitialState
})

export default binanceSlice
