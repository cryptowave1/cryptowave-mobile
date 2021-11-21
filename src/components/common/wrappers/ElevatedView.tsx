import React from 'react'
import { View, Platform, ViewStyle } from 'react-native'
import { theme } from '../../../style/theme'
import globalConstants from '../../../style/globalConstants';

interface Props {
   elevation?: number
   style?: ViewStyle | ViewStyle[]
   children: JSX.Element
}

const ElevatedView: React.FC<Props & Record<string, any>> =
   ({
       elevation = globalConstants.elevation.m,
       style,
       ...otherProps
    }) => {
      const additionalStyle: ViewStyle = Platform.OS === 'android'
         ? {elevation}
         : {
            shadowColor: '#000',
            shadowOpacity: 0.2 * elevation + 0.2,
            shadowRadius: 1 * elevation,
            shadowOffset: {
               width: 0,
               height: 0,
            },
         }
      additionalStyle.backgroundColor = '#fff'

      return <View style={[additionalStyle, style]} {...otherProps}>
         {otherProps.children}
      </View>
   }
export default ElevatedView
