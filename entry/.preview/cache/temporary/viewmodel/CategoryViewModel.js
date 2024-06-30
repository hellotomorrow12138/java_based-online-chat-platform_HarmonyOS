import { TabItem } from '@bundle:com.example.index_test1/entry/ets/common/bean/TabItem';
import { DetailItemData } from '@bundle:com.example.index_test1/entry/ets/common/bean/DetailItemData';
/**
 * Category ability view model.
 */
export class CategoryViewModel {
    /**
     * Get index list data on the left.
     *
     * @return {Array<IndexListItem>} indexListItems
     */
    /**
     * Get tab item data.
     *
     * @return {Array<TabItem>} tabItems
     */
    getTabItems() {
        let tabItems = [];
        for (let index = 0; index < 5; index++) {
            let tabItem = new TabItem();
            tabItem.index = index;
            tabItem.title = { "id": 16777240, "type": 10003, params: [], "bundleName": "com.example.index_test1", "moduleName": "entry" };
            tabItem.imageOriginal = { "id": 16777244, "type": 20000, params: [], "bundleName": "com.example.index_test1", "moduleName": "entry" };
            tabItem.imageActivated = { "id": 16777219, "type": 20000, params: [], "bundleName": "com.example.index_test1", "moduleName": "entry" };
            tabItems.push(tabItem);
        }
        return tabItems;
    }
    /**
     * Get detail list item info.
     *
     * @return {Array<DetailListItem>} detailListItems
     */
    // getDetailListItems(): Array<DetailListItem> {
    //   let detailListItems: Array<DetailListItem> = [];
    //   for (let i = 0; i < CommonConstants.LIST_SIZE; i++) {
    //     let detailListItem = new DetailListItem();
    //     detailListItem.index = i;
    //     detailListItem.title = $r('app.string.detail_list_item_text');
    //     detailListItem.detailItemData = this.getDetailItems();
    //     detailListItems.push(detailListItem);
    //   }
    //   return detailListItems;
    // }
    /**
     * Get detail item info.
     *
     * @return {Array<DetailItemData>} gridData
     */
    getDetailItems() {
        let detailData = [];
        for (let i = 0; i < 6; i++) {
            let gridItemData = new DetailItemData();
            gridItemData.content = { "id": 16777228, "type": 10003, params: [], "bundleName": "com.example.index_test1", "moduleName": "entry" };
            detailData.push(gridItemData);
        }
        return detailData;
    }
}
let categoryViewModel = new CategoryViewModel();
export default categoryViewModel;
