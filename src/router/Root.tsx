import * as React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { RootStackParamList } from './routes'


/**
 * Screen imports
 */
import HomeScreen from '../features/screens/HomeScreen'
import DetailsScreen from '../features/screens/DetailsScreen'

const Stack = createNativeStackNavigator<RootStackParamList>()

export default function Root() {
   return (
      <NavigationContainer>
         <Stack.Navigator
            initialRouteName={'HomeScreen'}
            screenOptions={{
               headerShown: false,
            }}>
            <Stack.Screen name={'HomeScreen'} component={HomeScreen}/>
            <Stack.Screen name={'DetailsScreen'} component={DetailsScreen}/>
         </Stack.Navigator>
      </NavigationContainer>
   )
}
