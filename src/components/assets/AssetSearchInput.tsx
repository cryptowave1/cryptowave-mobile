import React, { useState } from 'react'
import { StyleSheet, TextInput } from 'react-native'
import { bgO1, flex, paddingM, paddingS, roundedCornerM, textN1 } from '../../style/globalStyle'
import ElevatedView from '../common/wrappers/ElevatedView';

interface Props {
   value: string
   onValueChange: (value: string) => void
}

const AssetSearchInput: React.FC<Props> = (props: Props) => {
   const [value, onChangeText] = useState<string>(props.value)

   return <ElevatedView outerViewStyle={styles.outerView} innerViewStyle={styles.wrapper}>
      <TextInput
         style={styles.input}
         value={value}
         onChangeText={text => {
            props.onValueChange(text)
            onChangeText(text)
         }}/>
   </ElevatedView>
}
export default AssetSearchInput

const styles = StyleSheet.create({
   outerView: {
      ...paddingM,
      height: 70,
   },
   wrapper: {
      ...bgO1,
   },
   input: {
      ...textN1,
      ...flex,
      textAlign: 'center',
   },
})
