import { StyleSheet, ViewStyle } from 'react-native'

// todo akolov: add theme support
import lightTheme from './lightTheme'

// Here check for a dark theme can be made
export const theme = lightTheme

const mainBackgroundColor: ViewStyle = {
   backgroundColor: theme.mainBackgroundColor,
}

export const globalStyle = StyleSheet.create({
   mainBackgroundColor,
})
