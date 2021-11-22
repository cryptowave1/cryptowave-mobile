import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import TopBarHome from '../layout/TopBarHome'
import { bgO1, centerAligned, flex, horizontalLayout, textO1 } from '../../style/globalStyle'
// @ts-ignore
import IoniconsIcon from 'react-native-vector-icons/dist/Ionicons'
import BackIcon from '../../components/common/BackIcon'
import { DetailsScreenProps } from '../../router/routes'
import TradesList from '../../components/trades/TradesList'
import { useSelector } from 'react-redux'
import { RootState } from '../../app/store'


const DetailsScreen: React.FC<DetailsScreenProps> = ({route, navigation}: DetailsScreenProps) => {
   const {exchange, assetPair} = route.params
   const assetPairTradesFromStore = useSelector((state: RootState) => state
      .exchanges.exchangeIdToExchangeTrades[exchange.getId()])
      .getAssetPairTrades(assetPair.toTicker())

   return <View style={[styles.wrapper]}>
      <TopBarHome style={styles.topBar}>
         <BackIcon style={styles.backIcon} navigation={navigation}/>
         <View style={styles.exchangeWrapper}>
            <Text style={styles.exchangeName}>
               {exchange.getName()}
            </Text>
            <Text style={styles.tickerText}>
               {assetPair.toReadableTicker()}
            </Text>
         </View>
      </TopBarHome>
      <TradesList assetPairTrades={assetPairTradesFromStore!} style={{...flex}}/>
   </View>
}
export default DetailsScreen

const styles = StyleSheet.create({
   wrapper: {
      ...bgO1,
      ...flex,
   },
   topBar: {
      ...horizontalLayout,
      ...flex,
      alignContent: 'center',
   },
   backIcon: {
      position: 'absolute',
      top: -10,
      alignSelf: 'flex-start'
   },
   exchangeWrapper: {
      ...centerAligned,
      position: 'absolute',
      top: -5,
      alignSelf: 'center'
   },
   exchangeName: {
      ...textO1,
      fontSize: 20
   },
   tickerText: {
      ...textO1,
      fontSize: 12,
   },
})
