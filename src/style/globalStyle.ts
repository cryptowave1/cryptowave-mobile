import { TextStyle, ViewStyle } from 'react-native';
import globalConstants from './globalConstants'
import { theme } from './theme';

/**
 * Text
 */
export const textN1: TextStyle = {
   fontFamily: globalConstants.fonts.bold,
   color: theme.normal.n1,
}

/**
 * Background
 */
export const bgN1: ViewStyle = {
   backgroundColor: theme.normal.n1,
}

export const bgO1: ViewStyle = {
   backgroundColor: theme.opposing.o1,
}


/**
 * Layout
 */
export const marginListItemM: ViewStyle = {
   margin: globalConstants.layout.distance.m,
   marginTop: 0,
}

export const horizontalLayout: ViewStyle = {
   flexDirection: 'row',
}

/**
 * Containers
 */
export const marginM1: ViewStyle = {
   margin: globalConstants.layout.distance.m,
}

export const paddingM1: ViewStyle = {
   padding: globalConstants.layout.distance.m,
}

export const roundedBorderS: ViewStyle = {
   borderRadius: globalConstants.border.roundness.s,
}

export const borderColorN1: ViewStyle = {
   borderColor: theme.normal.n1,
}

export const borderSizeM: ViewStyle = {
   borderWidth: globalConstants.border.width.m,
}
