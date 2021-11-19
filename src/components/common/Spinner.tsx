import React from 'react'
import { ActivityIndicator } from 'react-native'
import { theme } from '../../style/style'

interface Props {
   size: 'large' | 'small'
}

const Spinner: React.FC<Props> = (props: Props) => {
   return <ActivityIndicator size={props.size} color={theme.common.spinnerColor}/>
}

export default Spinner
