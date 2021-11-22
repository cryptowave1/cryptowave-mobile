import React from 'react'
import { StyleSheet, ViewStyle } from 'react-native'
import Animated, {
   useSharedValue,
   useAnimatedStyle,
   useAnimatedGestureHandler,
   useDerivedValue,
} from 'react-native-reanimated';
import { PanGestureHandler } from 'react-native-gesture-handler'

interface Props {
   maxHeight: number
   minHeight: number
   initialHeight: any
   style?: ViewStyle | (ViewStyle | undefined)[]
   children: JSX.Element | JSX.Element[]
}

const ExpandableView: React.FC<Props> = (props: Props) => {
   const y = useDerivedValue(() => {
      return props.initialHeight
   }).value

   const gestureHandler = useAnimatedGestureHandler({
      onStart: (_, ctx) => {
         // @ts-ignore
         ctx.startY = y.value;
      },
      onActive: (event, ctx) => {
         // @ts-ignore
         y.value = ctx.startY - event.translationY
      }
   });

   const animatedStyle = useAnimatedStyle(() => {
      return {
         height: y.value
      };
   });

   return (
      <PanGestureHandler onGestureEvent={gestureHandler}>
         <Animated.View style={[animatedStyle, {
            minHeight: props.minHeight,
            maxHeight: props.maxHeight,
         }, props.style]}>
            {props.children}
         </Animated.View>
      </PanGestureHandler>
   );
}
export default ExpandableView
