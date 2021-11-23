import HttpRequestStrategy from './HttpFetchStrategy'
import { AssetsListItem, filterAssetsListItems } from '../assets/AssetsListItem'
import Asset from '../assets/Asset'
import { CoinGeckoAssetFetcherExecuteArgs, CoinGeckoAssetFetcherResponseItem } from '../../features/assets/httpFetchers/coinGeckoAssetFetcher'

export default class AssetsFetcher {
   private assetsListFetcher: HttpRequestStrategy<AssetsListItem[], void, AssetsListItem[]>
   private assetsFetcher: HttpRequestStrategy<Asset[], CoinGeckoAssetFetcherExecuteArgs, CoinGeckoAssetFetcherResponseItem[]>
   private assetsList?: AssetsListItem[]
   private fetchedAssets: Map<string, Asset>

   constructor(assetsListFetcher: HttpRequestStrategy<AssetsListItem[], void, AssetsListItem[]>,
               assetsFetcher: HttpRequestStrategy<Asset[], CoinGeckoAssetFetcherExecuteArgs, CoinGeckoAssetFetcherResponseItem[]>) {
      this.assetsListFetcher = assetsListFetcher
      this.assetsFetcher = assetsFetcher
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
      const assets: Asset[] = await this.assetsFetcher.execute({resultsPerPage, pageNumber})
      this.addNewAssets(assets)
      return this
   }

   async searchAssets(label: string, resultsPerPage: number, pageNumber: number): Promise<AssetsFetcher> {
      if (!this.assetsList) {
         this.assetsList = await this.assetsListFetcher.execute()
      }
      const filteredAssetsList: AssetsListItem[] = filterAssetsListItems(this.assetsList, label)
      if (!filteredAssetsList.length) {
         return this // the item is not found in the list of assets
      }

      const idsToFetch: string[] = filteredAssetsList
         .filter(assetsListItem => !this.fetchedAssets.has(assetsListItem.id))
         .map(assetsListItem => assetsListItem.id)
         .slice(0, 300) // Prevent too long request error code

      const fetchResultsPerPage: number = resultsPerPage >= idsToFetch.length ? idsToFetch.length : resultsPerPage
      const assets: Asset[] = await this.assetsFetcher.execute(
         {resultsPerPage: fetchResultsPerPage, pageNumber, ids: idsToFetch})
      this.addNewAssets(assets)
      return this
   }

   public getAvailableAssets(): Asset[] {
      return Array.from(this.fetchedAssets.values())
   }
}
