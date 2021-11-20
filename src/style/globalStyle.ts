import {  ViewStyle } from 'react-native';
import commonConstants from './commonConstants';
import { theme } from './theme';

export const background1: ViewStyle = {
   backgroundColor: theme.common.backgrounds.bg1,
}

export const mediumMarginListItem: ViewStyle = {
   margin: commonConstants.layout.distance.medium,
   marginTop: 0,
}

export const horizontalLayout: ViewStyle = {
   flexDirection: 'row',
}
