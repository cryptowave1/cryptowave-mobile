import React from 'react'
import Asset from '../../models/assets/Asset'
import { ScrollView, ViewStyle, } from 'react-native'
import SingleAssetComponent from './SingleAssetComponent'

interface Props {
   style?: ViewStyle,
   assets: Asset[]
   selectedAsset?: Asset
   onAssetSelected: (asset: Asset) => void
}

const AssetsList: React.FC<Props> = (props: Props) => {
   return <ScrollView style={props.style}>
      {
         props.assets.map(asset => <SingleAssetComponent
            asset={asset}
            isSelected={props.selectedAsset?.getId() === asset.getId()}
            onPressed={asset => props.onAssetSelected(asset)}
            key={asset.getId()}/>)
      }
   </ScrollView>
}

export default AssetsList
