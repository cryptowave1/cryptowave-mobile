import React from 'react'
import { StyleSheet } from 'react-native'
import Logo from '../../components/common/Logo'
import { getStatusBarHeight } from 'react-native-status-bar-height'
import commonConstants from '../../style/globalConstants'
import ElevatedView from '../../components/common/wrappers/ElevatedView'
import { bgN1, flex } from '../../style/globalStyle'

interface Props {
}

const TopBarHome: React.FC<Props> = (props: Props) => {
   return <ElevatedView style={styles.wrapper}>
      <Logo style={styles.logo}/>
   </ElevatedView>
}

export default TopBarHome

const styles = StyleSheet.create({
   wrapper: {
      ...bgN1,
      paddingTop: getStatusBarHeight() + commonConstants.layout.distance.s,
      paddingBottom: commonConstants.layout.distance.m,
      borderBottomLeftRadius: 30,
      borderBottomRightRadius: 30,
   },
   container: {
      ...flex,
      justifyContent: 'center'
   },
   logo: {
      alignItems: 'center',
   },
})
