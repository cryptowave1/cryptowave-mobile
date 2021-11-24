import React from 'react'
import { StyleSheet, TouchableOpacity, ViewStyle } from 'react-native'
import { centerAligned, middleAligned, paddingM } from '../../style/globalStyle'
// @ts-ignore
import IoniconsIcon from 'react-native-vector-icons/dist/Ionicons'
import globalConstants from '../../style/globalConstants'
import { theme } from '../../style/theme'
import { NavigationProp } from '@react-navigation/core/lib/typescript/src/types'

interface Props {
   style?: ViewStyle
   navigation: NavigationProp<any>
}

const BackIcon: React.FC<Props> = (props: Props) => {
   return <TouchableOpacity
      style={[styles.wrapper, props.style]}
      onPress={props.navigation.goBack}>
      <IoniconsIcon
         size={globalConstants.icons.size.l}
         color={theme.opposing.o1}
         name={'chevron-back-sharp'}/>
   </TouchableOpacity>
}
export default BackIcon

const styles = StyleSheet.create({
   wrapper: {
      ...centerAligned,
      ...middleAligned,
      paddingLeft: globalConstants.layout.distance.m,
      width: 50,
      height: 50,
   },
})
