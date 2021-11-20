const smallDistance = 10;
const mediumDistance = smallDistance * 2;
const bigDistance = smallDistance * 3;

export default {
   sizes: {
      roundedBorders: {
         topBarHome: 30,
      },
   },

   layout: {
      distance: {
         small: smallDistance,
         medium: mediumDistance,
         big: bigDistance
      },
   },

   common: {
      elevatedView: {
         defaultElevation: 3,
      },
   },

   asset: {
      homeScreen: {
         imageSize: 30
      },
      pairTrade: {
         homeScreen: {
            initialHeight: 50,
         },
      },
   },

   singleExchangePairTrades: {},
}
