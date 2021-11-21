import Asset from '../../models/assets/Asset'
import React from 'react'
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { borderColorN1, horizontalLayout, roundedCornerS } from '../../style/globalStyle';
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
      style={[props.isSelected ? styles.selectedStyle : null, styles.container]}>
      <Image
         source={{
            uri: props.asset.getImageUrl(),
         }}
         style={styles.image}/>
      <View>
         <Text>{props.asset.getName()}</Text>
         <Text>{formatPrice(props.asset.getMarketData().getMarketCap())}</Text>
      </View>
   </TouchableOpacity>
}

export default SingleAssetComponent

const styles = StyleSheet.create({
   container: {
      ...horizontalLayout,
      height: 50,
      flex: 1,
   },
   selectedStyle: {
      ...roundedCornerS,
      ...borderColorN1,
   },
   image: {
      width: 50,
      height: 50,
   },
})
