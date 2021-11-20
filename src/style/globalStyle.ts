import { ViewStyle } from 'react-native';
import commonConstants from './commonConstants';
import { theme } from './theme';

export const mainBackgroundColor: ViewStyle = {
   backgroundColor: theme.common.backgrounds.mainBackgroundColor,
}

export const mediumMarginListItem: ViewStyle = {
   margin: commonConstants.layout.distance.medium,
   marginTop: 0
}
