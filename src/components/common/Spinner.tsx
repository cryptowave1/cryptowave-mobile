import React from 'react'
import { ActivityIndicator, ViewStyle } from 'react-native'
import { theme } from '../../style/theme'

interface Props {
   style?: ViewStyle
   color?: 'string'
   size?: 'large' | 'small'
}

const Spinner: React.FC<Props> = ({size = 'small', color, style}: Props) => {
   return <ActivityIndicator size={size} color={color || theme.normal.n1} style={style}/>
}
export default Spinner
