import React from 'react'
import { StyleSheet, View, ViewStyle } from 'react-native'
import { getStatusBarHeight } from 'react-native-status-bar-height'
import commonConstants from '../../style/globalConstants'
import ElevatedView from '../../components/common/wrappers/ElevatedView'
import { bgN1, flex } from '../../style/globalStyle'

interface Props {
   style?: ViewStyle
   children: JSX.Element | JSX.Element[]
}

const TopBarHome: React.FC<Props> = (props: Props) => {
   return <ElevatedView
      outerViewStyle={styles.outerView}
      innerViewStyle={[styles.innerView, props.style || {}]}
      elevation={10}>
      <View style={{...flex}}>
         {props.children}
      </View>
   </ElevatedView>
}

export default TopBarHome

const styles = StyleSheet.create({
   outerView: {
      height: getStatusBarHeight() + 50,
   },
   innerView: {
      ...bgN1,
      paddingTop: getStatusBarHeight() + commonConstants.layout.distance.s,
      borderBottomLeftRadius: 30,
      borderBottomRightRadius: 30
   },
})
