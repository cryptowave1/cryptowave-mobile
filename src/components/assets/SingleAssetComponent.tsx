import Asset from '../../models/assets/Asset'
import React from 'react'
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import {
   borderColorN1, centerAligned, flex,
   horizontalLayout,
   marginListItemS, textN1,
} from '../../style/globalStyle'
import formatPrice from '../../utils/functions/formatPrice'

interface Props {
   asset: Asset
   isSelected: boolean
   onPressed: (asset: Asset) => void
}

const SingleAssetComponent: React.FC<Props> = (props: Props) => {
   return <TouchableOpacity
      key={props.asset.getSymbol()}
      onPress={() => {
         props.onPressed(props.asset)
      }}
      style={[props.isSelected ? styles.selectedStyle : null, styles.container]}>
      <Image
         source={{
            uri: props.asset.getImageUrl(),
         }}
         style={styles.image}/>
      <View>
         <Text style={styles.name}>{props.asset.getSymbol()}</Text>
         <Text style={styles.price}>${formatPrice(props.asset.getMarketData().getPriceUsd())}</Text>
      </View>
   </TouchableOpacity>
}

export default SingleAssetComponent

const styles = StyleSheet.create({
   container: {
      ...horizontalLayout,
      ...marginListItemS,
      ...centerAligned,
      ...flex,
      height: 50,
   },
   selectedStyle: {
      ...borderColorN1,
   },
   image: {
      width: 30,
      height: 30,
   },
   name: {
      ...textN1,
   },
   price: {
      ...textN1,
   },
})
