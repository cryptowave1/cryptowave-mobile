import Asset from '../../models/Asset';
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { theme } from '../../style/style';
import commonConstants from '../../style/commonConstants';

interface Props {
   asset: Asset;
   isSelected: boolean;
   onPressed: (asset: Asset) => void;
}

const SingleAssetComponent: React.FC<Props> = (props: Props) => {
   return <TouchableOpacity
      key={props.asset.getSymbol()}
      onPress={() => {
         props.onPressed(props.asset)
      }}
      style={[props.isSelected ? style.selectedStyle : null, style.container]}>
      <Image
         source={{
            uri: props.asset.getImageUrl(),
         }}
         style={style.image}/>
      <Text>{props.asset.getName()}</Text>
   </TouchableOpacity>
};

export default SingleAssetComponent;

const style = StyleSheet.create({
   container: {
      height: 50,
      flex: 1,
      flexDirection: 'row'
   },
   selectedStyle: {
      borderWidth: 1,
      borderColor: theme.selectedAssetBorderColor,
   },
   image: {
      width: commonConstants.homeScreenAssetImageSize,
      height: commonConstants.homeScreenAssetImageSize,
   }
});
