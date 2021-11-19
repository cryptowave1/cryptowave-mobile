import createExchangeSlice, { ExchangeState } from './createExchangeSlice'
import Exchange from '../../models/Exchange'
import text from '../../text'
import ConcreteFetchPairPriceStrategyBinance from '../../api/trades/ConcreteFetchPairPriceStrategyBinance'

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
