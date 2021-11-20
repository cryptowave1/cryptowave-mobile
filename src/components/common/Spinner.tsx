import React from 'react'
import { ActivityIndicator } from 'react-native'
import { theme } from '../../style/style'

interface Props {
   size?: 'large' | 'small'
}

const Spinner: React.FC<Props> = ({size = 'small'}: Props) => {
   return <ActivityIndicator size={size} color={theme.common.spinnerColor}/>
}

export default Spinner
