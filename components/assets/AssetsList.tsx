import Asset from '../../models/Asset';
import React, { useEffect } from 'react';
import { ScrollView, } from 'react-native';
import SingleAssetComponent from './SingleAssetComponent';

interface Props {
   assets: Asset[];
   selectedAsset?: Asset;
   onAssetSelected: (asset: Asset) => void;
}

const HomeScreen: React.FC<Props> = (props: Props) => {
   return (<>
         <ScrollView>
            {
               props.assets.map(asset => <SingleAssetComponent
                  asset={asset}
                  isSelected={props.selectedAsset?.getSymbol() === asset.getSymbol()}
                  onPressed={asset => props.onAssetSelected(asset)}
                  key={asset.getSymbol()}/>)
            }
         </ScrollView>
      </>
   );
}

export default HomeScreen;
