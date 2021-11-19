import React from 'react'
import { StyleSheet, View, ViewStyle } from 'react-native'
import Spinner from './Spinnet';

interface Props {
   size: 'large' | 'small'
   style: ViewStyle
}

const CenteredSpinner: React.FC<Props> = (props: Props) => {
   return <View style={[props.style, style.container]}>
      <Spinner size={props.size}/>
   </View>
}

export default CenteredSpinner

const style = StyleSheet.create({
   container: {
      flex: 1,
      justifyContent: 'center'
   },
})
