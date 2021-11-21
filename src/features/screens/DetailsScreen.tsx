import React from 'react'
import { Text, View } from 'react-native'
import { flex } from '../../style/globalStyle'

export default function DetailsScreen() {
   return (
      <View style={{ ...flex, alignItems: 'center', justifyContent: 'center' }}>
         <Text>Details Screen</Text>
      </View>
   )
}
