import React from 'react'
import { View, ViewStyle } from 'react-native'
import globalConstants from '../../../style/globalConstants'
import { Shadow } from 'react-native-shadow-2'

interface Props {
   elevation?: number
   outerViewStyle?: ViewStyle | ViewStyle[]
   innerViewStyle?: ViewStyle | ViewStyle[]
   children: JSX.Element
}


const ElevatedView: React.FC<Props & Record<string, any>> =
   ({
       elevation = globalConstants.elevation.m,
       outerViewStyle,
       innerViewStyle,
       ...otherProps
    }) => {

      return <View style={outerViewStyle}>
         <Shadow
            distance={elevation}
            containerViewStyle={{flex: 1}}
            viewStyle={[{alignSelf: 'stretch', flex: 1, width: '100%', height: '100%'}, innerViewStyle]}>

            {otherProps.children}

         </Shadow>
      </View>
   }
export default ElevatedView
