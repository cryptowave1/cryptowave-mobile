import Asset from '../../models/assets/Asset'
import React from 'react'
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { borderColorN1, horizontalLayout, roundedBorderS } from '../../style/globalStyle';
import formatPrice from '../../utils/functions/formatPrice';

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
      style={[props.isSelected ? style.selectedStyle : null, style.container]}>
      <Image
         source={{
            uri: props.asset.getImageUrl(),
         }}
         style={style.image}/>
      <View>
         <Text>{props.asset.getName()}</Text>
         <Text>{formatPrice(props.asset.getMarketData().getMarketCap())}</Text>
      </View>
   </TouchableOpacity>
}

export default SingleAssetComponent

const style = StyleSheet.create({
   container: {
      ...horizontalLayout,
      height: 50,
      flex: 1,
   },
   selectedStyle: {
      ...roundedBorderS,
      ...borderColorN1,
   },
   image: {
      width: 50,
      height: 50,
   },
})
