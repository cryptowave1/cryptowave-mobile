import HttpRequestStrategy from './HttpFetchStrategy'
import { AssetsListItem, filterAssetsListItems } from '../../assets/AssetsListItem'
import Asset from '../../assets/Asset'
import { CoinGeckoAssetFetcherExecuteArgs, CoinGeckoAssetFetcherResponseItem } from './coinGeckoAssetFetcher'

export default class AssetsFetcher {
   private coinGeckoAssetsListFetcher: HttpRequestStrategy<AssetsListItem[], void, AssetsListItem[]>
   private coinGeckoAssetFetcher: HttpRequestStrategy<Asset[], CoinGeckoAssetFetcherExecuteArgs, CoinGeckoAssetFetcherResponseItem[]>
   private assetsList?: AssetsListItem[]
   private fetchedAssets: Map<string, Asset>

   constructor(coinGeckoAssetsListFetcher: HttpRequestStrategy<AssetsListItem[], void, AssetsListItem[]>,
               coinGeckoAssetFetcher: HttpRequestStrategy<Asset[], CoinGeckoAssetFetcherExecuteArgs, CoinGeckoAssetFetcherResponseItem[]>) {
      this.coinGeckoAssetsListFetcher = coinGeckoAssetsListFetcher
      this.coinGeckoAssetFetcher = coinGeckoAssetFetcher
      this.fetchedAssets = new Map<string, Asset>()
   }

   private addNewAssets(assets: Asset[]) {
      assets.forEach((asset: Asset) => {
         if (!this.fetchedAssets.has(asset.getId())) {
            this.fetchedAssets.set(asset.getId(), asset)
         }
      })
   }

   async fetchAssets(resultsPerPage: number, pageNumber: number): Promise<AssetsFetcher> {
      const assets: Asset[] = await this.coinGeckoAssetFetcher.execute({resultsPerPage, pageNumber})
      this.addNewAssets(assets)
      return this
   }

   async searchAssets(label: string, resultsPerPage: number, pageNumber: number): Promise<AssetsFetcher> {
      if (!this.assetsList) {
         this.assetsList = await this.coinGeckoAssetsListFetcher.execute()
      }
      const filteredAssetsList: AssetsListItem[] = filterAssetsListItems(this.assetsList, label)
      if (!filteredAssetsList.length) {
         return this // the item is not found in the list of assets
      }

      const idsToFetch: string[] = filteredAssetsList
         // filter out currently available assets
         .filter(assetsListItem => !this.fetchedAssets.has(assetsListItem.id))
         .map(assetsListItem => assetsListItem.id)
         .slice(0, 300) // Prevent too long request error code

      const fetchResultsPerPage: number = resultsPerPage >= idsToFetch.length ? idsToFetch.length : resultsPerPage
      const assets: Asset[] = await this.coinGeckoAssetFetcher.execute(
         {resultsPerPage: fetchResultsPerPage, pageNumber, ids: idsToFetch})
      this.addNewAssets(assets)
      return this
   }

   public getAvailableAssets(): Asset[] {
      return Array.from(this.fetchedAssets.values())
   }
}
