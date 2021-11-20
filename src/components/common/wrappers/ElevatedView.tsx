import React from 'react'
import { View, Platform, ViewStyle } from 'react-native'
import commonConstants from '../../../style/commonConstants'
import { theme } from '../../../style/theme'

interface Props {
   elevation?: number
   style?: ViewStyle | ViewStyle[]
   children: JSX.Element
}

const ElevatedView: React.FC<Props & Record<string, any>> =
   ({
       elevation = commonConstants.common.elevatedView.defaultElevation,
       style,
       ...otherProps
    }) => {
      const additionalStyle: ViewStyle = Platform.OS === 'android'
         ? {elevation}
         : {
            shadowColor: theme.common.elevatedView.shadowColorIOS,
            shadowOpacity: 0.2 * elevation + 0.2,
            shadowRadius: 1 * elevation,
            shadowOffset: {
               width: 0,
               height: 0,
            },
         }
      additionalStyle.backgroundColor = theme.common.elevatedView.defaultBackgroundColor

      return <View style={[style, additionalStyle]} {...otherProps}>
         {otherProps.children}
      </View>
   }
export default ElevatedView
