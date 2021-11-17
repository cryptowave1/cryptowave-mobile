import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

/**
 * Screen imports
 */
import * as routes from './routes';
import { RootStackParamList } from './routes';
import HomeScreen from '../screens/HomeScreen';
import DetailsScreen from '../screens/DetailsScreen';


const Stack = createNativeStackNavigator<RootStackParamList>();

export default function Root() {
   return (
      <NavigationContainer>
         <Stack.Navigator
            initialRouteName={routes.HOME_SCREEN}
            screenOptions={{
               headerShown: false
            }}>
            <Stack.Screen name={routes.HOME_SCREEN} component={HomeScreen}/>
            <Stack.Screen name={routes.DETAILS_SCREEN} component={DetailsScreen}/>
         </Stack.Navigator>
      </NavigationContainer>
   );
}
