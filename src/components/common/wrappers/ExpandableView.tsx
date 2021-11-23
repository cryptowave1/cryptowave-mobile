import React from 'react'
import { ViewStyle } from 'react-native'
import Animated, {
   useAnimatedStyle,
   useAnimatedGestureHandler,
   useDerivedValue, useSharedValue,
} from 'react-native-reanimated'
import { PanGestureHandler } from 'react-native-gesture-handler'
import { clamp } from 'react-native-redash'

interface Props {
   maxHeight: number
   minHeight: number
   sharedValue?: { value: number }
   style?: ViewStyle | (ViewStyle | undefined)[]
   children: JSX.Element | JSX.Element[]
}

const ExpandableView: React.FC<Props> = (props: Props) => {
   const y = props.sharedValue
      ? useDerivedValue(() => props.sharedValue).value
      : useSharedValue(props.minHeight)

   const gestureHandler = useAnimatedGestureHandler({
      onStart: (_, ctx) => {
         // @ts-ignore
         ctx.offsetY = y.value
      },
      onActive: (event, ctx) => {
         // @ts-ignore
         y.value = clamp(ctx.offsetY - event.translationY , props.minHeight, props.maxHeight)
      }
   })

   // @ts-ignore
   const animatedStyle = useAnimatedStyle(() => ({height: y.value}))

   return (
      <PanGestureHandler onGestureEvent={gestureHandler}>
         <Animated.View style={[animatedStyle, props.style]}>
            {props.children}
         </Animated.View>
      </PanGestureHandler>
   )
}
export default ExpandableView
