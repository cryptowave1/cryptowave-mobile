import { NativeStackScreenProps } from '@react-navigation/native-stack'
import Exchange from '../models/exchanges/Exchange'
import { AssetPair } from '../models/assets/AssetPair'

export type RootStackParamList = {
   HomeScreen: undefined
   DetailsScreen: { exchange: Exchange, assetPair: AssetPair }
}
export type HomeScreenProps = NativeStackScreenProps<RootStackParamList, 'HomeScreen'>
export type DetailsScreenProps = NativeStackScreenProps<RootStackParamList, 'DetailsScreen'>
