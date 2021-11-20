import React from 'react'
import Exchange from '../../../models/exchanges/Exchange'
import { AssetPair } from '../../../models/assets/AssetPair'
import SingleExchangePairTrades from '../../../components/trades/SingleExchangePairTrades'
import { useSelector } from 'react-redux'
import { RootState } from '../../../app/store'
import AssetPairTrades from '../../../models/assets/AssetPairTrades'

interface Props {
   exchange: Exchange
   assetPair: AssetPair
}

const SingleExchangePairTradesComponent: React.FC<Props> = (props: Props) => {
   const assetPairTrades: AssetPairTrades | undefined = useSelector(
      (state: RootState) => state.exchanges.exchangeIdToExchangeTrades[props.exchange.getId()]
         .getAssetPairTrades(props.assetPair.toTicker()))

   return <SingleExchangePairTrades loading={!assetPairTrades || assetPairTrades.getSupported() === undefined}
                                    assetPairTrades={assetPairTrades}/>
}
export default SingleExchangePairTradesComponent

