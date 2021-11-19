import React from 'react'
import { ActivityIndicator } from 'react-native'

interface Props {
   size: 'large' | 'small'
}

const Spinner: React.FC<Props> = (props: Props) => {
   return <ActivityIndicator size={props.size}/>
}

export default Spinner
