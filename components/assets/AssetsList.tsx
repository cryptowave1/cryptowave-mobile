import React from 'react'
import Asset from '../../models/Asset'
import { ScrollView, } from 'react-native'
import SingleAssetComponent from './SingleAssetComponent'

interface Props {
   assets: Asset[]
   selectedAsset?: Asset
   onAssetSelected: (asset: Asset) => void
}

const HomeScreen: React.FC<Props> = (props: Props) => {
   return (<>
         <ScrollView>
            {
               props.assets.map(asset => <SingleAssetComponent
                  asset={asset}
                  isSelected={props.selectedAsset?.getId() === asset.getId()}
                  onPressed={asset => props.onAssetSelected(asset)}
                  key={asset.getId()}/>)
            }
         </ScrollView>
      </>
   )
}

export default HomeScreen
