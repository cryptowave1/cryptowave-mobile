import React from 'react'
import { Image, StyleSheet, View, ViewStyle } from 'react-native'

interface Props {
   style?: ViewStyle
   width?: number
}

const Logo: React.FC<Props> = ({style, width = 200}: Props) => {
   return <View style={style}>
      <Image
         style={[styles.logo, {width}]}
         source={require('../../assets/images/cryptowave-logo-medium.png')}
      />
   </View>
}

export default Logo

const styles = StyleSheet.create({
   logo: {
      resizeMode: 'contain',
   },
})
