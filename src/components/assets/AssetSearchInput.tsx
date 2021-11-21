import React, { useState } from 'react'
import { StyleSheet, TextInput } from 'react-native'
import commonConstants from '../../style/globalConstants';
import ElevatedView from '../common/wrappers/ElevatedView';
import { bgO1, marginM1, textN1 } from '../../style/globalStyle';

interface Props {
   value: string
   onValueChange: (value: string) => void
}

const AssetSearchInput: React.FC<Props> = (props: Props) => {
   const [value, onChangeText] = useState<string>(props.value)

   return <ElevatedView elevation={commonConstants.elevation.s} style={styles.wrapper}>
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
   wrapper: {
      ...bgO1,
      ...marginM1,
      height: 50,
      margin: commonConstants.layout.distance.s
   },
   input: {
      ...textN1,
      flex: 1,
      textAlign: 'center',
   },
});
