import React, { useState } from 'react'
import { TextInput, View } from 'react-native'

interface Props {
   value: string
   onValueChange: (value: string) => void
}

const AssetSearchInput: React.FC<Props> = (props: Props) => {
   const [value, onChangeText] = useState<string>(props.value)

   return <View>
      <TextInput
         value={value}
         onChangeText={text => {
            props.onValueChange(text)
            onChangeText(text)
         }}/>
   </View>
}
export default AssetSearchInput
