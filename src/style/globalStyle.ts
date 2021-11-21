import { TextStyle, ViewStyle } from 'react-native'
import globalConstants from './globalConstants'
import { theme } from './theme'

/**
 * Text
 */
export const text: TextStyle = {
   fontFamily: globalConstants.fonts.regular,
}

export const textN1: TextStyle = {
   ...text,
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

export const bgO2: ViewStyle = {
   backgroundColor: theme.opposing.o2,
}

/**
 * Layout
 */
export const marginListItemS: ViewStyle = {
   margin: globalConstants.layout.distance.s,
   marginTop: 0,
}

export const marginListItemM: ViewStyle = {
   margin: globalConstants.layout.distance.m,
   marginTop: 0,
}

export const horizontalLayout: ViewStyle = {
   flexDirection: 'row',
}

export const centerAligned: ViewStyle = {
   alignItems: 'center',
}


/**
 * Containers
 */
export const flex: ViewStyle = {
   flex: 1,
}

export const marginM1: ViewStyle = {
   margin: globalConstants.layout.distance.m,
}

export const paddingM1: ViewStyle = {
   padding: globalConstants.layout.distance.m,
}

export const roundedCornerS: ViewStyle = {
   borderRadius: globalConstants.border.roundness.s,
}

export const roundedCornerM: ViewStyle = {
   borderRadius: globalConstants.border.roundness.m,
}

export const borderSizeXS: ViewStyle = {
   borderWidth: globalConstants.border.width.xs,
}

export const borderSizeS: ViewStyle = {
   borderWidth: globalConstants.border.width.s,
}

export const borderSizeM: ViewStyle = {
   borderWidth: globalConstants.border.width.m,
}

export const borderColorN1: ViewStyle = {
   ...borderSizeM,
   borderColor: theme.normal.n1,
}

