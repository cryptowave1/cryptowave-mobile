import React from 'react'
import { ActivityIndicator } from 'react-native'
import { theme } from '../../style/theme'

interface Props {
   color?: 'string'
   size?: 'large' | 'small'
}

const Spinner: React.FC<Props> = ({size = 'small', color}: Props) => {
   return <ActivityIndicator size={size} color={color || theme.normal.n1}/>
}

export default Spinner
