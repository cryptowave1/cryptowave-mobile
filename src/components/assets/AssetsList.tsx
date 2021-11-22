import React from 'react'
import Asset from '../../models/assets/Asset'
import { FlatList, ViewStyle, } from 'react-native'
import SingleAssetComponent from './SingleAssetComponent'

interface Props {
   style?: ViewStyle,
   assets: Asset[]
   selectedAsset?: Asset
   onAssetSelected: (asset: Asset) => void
}

const AssetsList: React.FC<Props> = (props: Props) => {
   return <FlatList
      data={props.assets}
      renderItem={({item}) => <SingleAssetComponent
         asset={item}
         isSelected={props.selectedAsset?.getId() === item.getId()}
         onPressed={asset => props.onAssetSelected(asset)}
         key={item.getId()}/>
      }/>
}
export default AssetsList
