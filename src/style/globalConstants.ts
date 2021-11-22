const s = 6

export default {
   layout: {
      distance: {
         xs: s / 2,
         s: s,
         m: s * 2,
         l: s * 3,
         xl: s * 4,
      },
   },

   fonts: {
      regular: 'Montserrat-SemiBold',
      light: 'Montserrat-Regular',
      bold: 'Montserrat-Bold',
   },

   elevation: {
      s: 6,
      m: 9,
      l: 12,
   },

   border: {
      roundness: {
         s: s,
         m: s * 1.5,
         l: s * 2,
      },

      width: {
         s: 0.5,
         m: 1,
         l: 3,
      },
   },

   icons: {
      size: {
         s: s * 3,
         m: s * 4,
      },
   },
}
