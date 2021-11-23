import { TextStyle, ViewStyle } from 'react-native'
import globalConstants from './globalConstants'
import { theme } from './theme'

/**
 * Text
 */
export const text: TextStyle = {
   fontFamily: globalConstants.fonts.regular,
}

export const boldText: TextStyle = {
   fontFamily: globalConstants.fonts.bold
}

export const lightText: TextStyle = {
   fontFamily: globalConstants.fonts.light
}


export const textN1: TextStyle = {
   ...text,
   color: theme.normal.n3,
}

export const textO1: TextStyle = {
   ...text,
   color: theme.opposing.o1,
}


/**
 * Background
 */
export const bgN1: ViewStyle = {
   backgroundColor: theme.normal.n1,
}

export const bgN3: ViewStyle = {
   backgroundColor: theme.normal.n3,
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
export const marginListItem: ViewStyle = {
   marginTop: 0,
   marginLeft: 0,
   marginRight: 0,
}

export const marginListItemS: ViewStyle = {
   ...marginListItem,
   margin: globalConstants.layout.distance.s,
}

export const marginListItemM: ViewStyle = {
   ...marginListItem,
   margin: globalConstants.layout.distance.m,
}

export const marginListItemL: ViewStyle = {
   ...marginListItem,
   margin: globalConstants.layout.distance.l,
}

export const horizontalLayout: ViewStyle = {
   flexDirection: 'row',
}

export const centerAligned: ViewStyle = {
   alignItems: 'center',
}

export const middleAligned: ViewStyle = {
   justifyContent: 'center',
}


/**
 * Containers
 */
export const flex: ViewStyle = {
   flex: 1,
}

export const marginM: ViewStyle = {
   margin: globalConstants.layout.distance.m,
}

export const paddingS: ViewStyle = {
   padding: globalConstants.layout.distance.s,
}

export const paddingM: ViewStyle = {
   padding: globalConstants.layout.distance.m,
}

export const paddingL: ViewStyle = {
   padding: globalConstants.layout.distance.l,
}

export const roundedCornerS: ViewStyle = {
   borderRadius: globalConstants.border.roundness.s,
}

export const roundedCornerM: ViewStyle = {
   borderRadius: globalConstants.border.roundness.m,
}

export const roundedCornerXXL: ViewStyle = {
   borderRadius: globalConstants.border.roundness.xxl,
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

export const borderColorN2: ViewStyle = {
   ...borderSizeM,
   borderColor: theme.normal.n2,
}

