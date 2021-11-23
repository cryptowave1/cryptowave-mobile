import React from 'react'
import { StyleSheet, View, ViewStyle } from 'react-native'
import Spinner from './Spinner'
import { flex } from '../../style/globalStyle'

interface Props {
   size?: 'large' | 'small'
   style?: ViewStyle
}

const CenteredSpinner: React.FC<Props> = ({size = 'small', style}: Props) => {
   return <View style={[style, styles.container]}>
      <Spinner size={size}/>
   </View>
}
export default CenteredSpinner

const styles = StyleSheet.create({
   container: {
      ...flex,
      justifyContent: 'center',
   },
})
