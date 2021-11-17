import { NativeStackScreenProps } from '@react-navigation/native-stack';

/**
 * Root navigation
 */
export const HOME_SCREEN = 'HomeScreen';
export const DETAILS_SCREEN = 'DetailsScreen';

export type RootStackParamList = {
   HomeScreen: undefined;
   DetailsScreen: undefined;
};
export type RootStackProps = NativeStackScreenProps<RootStackParamList, 'HomeScreen'>;
