import Asset from '../../models/assets/Asset'
import React from 'react'
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import {
   borderColorN1, centerAligned,
   horizontalLayout,
   marginListItemS, paddingM, textN1,
} from '../../style/globalStyle'
import formatNumber from '../../utils/functions/formatNumber'
import globalConstants from '../../style/globalConstants'
import ElevatedView from '../common/wrappers/ElevatedView'

interface Props {
   asset: Asset
   isSelected: boolean
   onPressed: (asset: Asset) => void
}

const SingleAssetComponent: React.FC<Props> = (props: Props) => {
   const child = <TouchableOpacity
      key={props.asset.getSymbol()}
      onPress={() => {
         props.onPressed(props.asset)
      }}
      style={[styles.container]}>
      <Image
         source={{
            uri: props.asset.getImageUrl(),
         }}
         style={styles.image}/>
      <View>
         <Text style={styles.name}>{props.asset.getSymbol().toUpperCase()}</Text>
         <Text style={styles.price}>${formatNumber(props.asset.getMarketData().getPriceUsd())}</Text>
      </View>
   </TouchableOpacity>

   if (props.isSelected) {
      return <ElevatedView outerViewStyle={{...paddingM}} elevation={globalConstants.elevation.m}>
         {child}
      </ElevatedView>
   }

   return <View>
      {child}
   </View>
}
export default SingleAssetComponent

const styles = StyleSheet.create({
   container: {
      ...horizontalLayout,
      ...marginListItemS,
      ...centerAligned,
      ...paddingM,
      height: 50,
   },
   selectedStyle: {
      ...borderColorN1,
   },
   image: {
      width: 30,
      height: 30,
      marginRight: globalConstants.layout.distance.m,
   },
   name: {
      ...textN1,
   },
   price: {
      ...textN1,
   },
})
