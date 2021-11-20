import React from 'react'
import { StyleSheet, View } from 'react-native'
import Logo from '../../components/common/Logo'
import { getStatusBarHeight } from 'react-native-status-bar-height';
import commonConstants from '../../style/commonConstants';
import { background1 } from '../../style/globalStyle';

interface Props {

}

const CenteredSpinner: React.FC<Props> = (props: Props) => {
   return <View style={style.wrapper}>
      <Logo style={style.logo}/>
   </View>
}

export default CenteredSpinner

const style = StyleSheet.create({
   wrapper: {
      ...background1,
      paddingTop: getStatusBarHeight() + 10,
      paddingBottom: commonConstants.layout.distance.small,
      borderBottomLeftRadius: commonConstants.sizes.roundedBorders.topBarHome,
      borderBottomRightRadius: commonConstants.sizes.roundedBorders.topBarHome
   },
   container: {
      flex: 1,
      justifyContent: 'center'
   },
   logo: {
      alignItems: 'center',
   },
})
