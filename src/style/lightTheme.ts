export const colors = {
   main: {
      m1: '#004385',
      m2: '#283845',
   },
   opposing: {
      o1: {
         first: '#FF4242',
         second: '#99C24D',
      },
   },
   complementary: {
      c1: '#C4BBB8',
      c2: '#fff'
   },
}

export default {
   common: {
      backgrounds: {
         bg1: colors.main.m1,
         bg2: colors.complementary.c2,
      },
      spinnerColor: colors.main.m2,

      elevatedView: {
         shadowColorIOS: '#777',
         defaultBackgroundColor: colors.main.m1,
      },
   },

   asserts: {
      selectedAssetBorderColor: colors.main.m2,
   },

   trades: {
      sortButton: {
         textColor: colors.main.m2,
         background: colors.complementary.c1,
      },
   },
}
