import React from 'react'
import { Image, StyleSheet, View, ViewStyle } from 'react-native'

interface Props {
   style: ViewStyle
}

const Logo: React.FC<Props> = (props: Props) => {
   return <View style={props.style}>
      <Image
         style={styles.tinyLogo}
         source={require('../../assets/images/google-logo.jpg')}
      />
   </View>
}

export default Logo

const styles = StyleSheet.create({
   tinyLogo: {
      width: 100,
      height: 50,
   },
})
