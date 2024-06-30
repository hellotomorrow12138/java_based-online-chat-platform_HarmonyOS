import { TabItem } from '@bundle:com.example.index_test1/entry/ets/common/bean/TabItem';
export class CategoryViewModel {
    getTabItems() {
        let tabItems = [];
        for (let index = 0; index < 5; index++) {
            let tabItem = new TabItem();
            tabItem.index = index;
            tabItems.push(tabItem);
        }
        return tabItems;
    }
}
let categoryViewModel = new CategoryViewModel();
export default categoryViewModel;
//# sourceMappingURL=CategoryViewModel.js.map