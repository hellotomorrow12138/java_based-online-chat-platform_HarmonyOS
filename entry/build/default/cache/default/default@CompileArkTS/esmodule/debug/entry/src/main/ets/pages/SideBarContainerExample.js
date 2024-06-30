import router from '@ohos:router';
export class SideBarContainerExample extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1) {
        super(parent, __localStorage, elmtId);
        this.normalIcon = { "id": 16777328, "type": 20000, params: [], "bundleName": "com.example.index_test1", "moduleName": "entry" };
        this.selectedIcon = { "id": 16777328, "type": 20000, params: [], "bundleName": "com.example.index_test1", "moduleName": "entry" };
        this.__arr = new ObservedPropertyObjectPU([1, 2, 3], this, "arr");
        this.__current = new ObservedPropertySimplePU(1, this, "current");
        this.pageRoutes = {
            1: 'pages/FirstPage',
            2: 'pages/FirstPage',
            3: 'pages/FirstPage', // 3对应Page3的路径
        };
        this.setInitiallyProvidedValue(params);
    }
    setInitiallyProvidedValue(params) {
        if (params.normalIcon !== undefined) {
            this.normalIcon = params.normalIcon;
        }
        if (params.selectedIcon !== undefined) {
            this.selectedIcon = params.selectedIcon;
        }
        if (params.arr !== undefined) {
            this.arr = params.arr;
        }
        if (params.current !== undefined) {
            this.current = params.current;
        }
        if (params.pageRoutes !== undefined) {
            this.pageRoutes = params.pageRoutes;
        }
    }
    updateStateVars(params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__arr.purgeDependencyOnElmtId(rmElmtId);
        this.__current.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__arr.aboutToBeDeleted();
        this.__current.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    get arr() {
        return this.__arr.get();
    }
    set arr(newValue) {
        this.__arr.set(newValue);
    }
    get current() {
        return this.__current.get();
    }
    set current(newValue) {
        this.__current.set(newValue);
    }
    initialRender() {
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            SideBarContainer.create(SideBarContainerType.Embed);
            SideBarContainer.controlButton({
                icons: {
                    hidden: { "id": 16777327, "type": 20000, params: [], "bundleName": "com.example.index_test1", "moduleName": "entry" },
                    shown: { "id": 16777323, "type": 20000, params: [], "bundleName": "com.example.index_test1", "moduleName": "entry" },
                    switching: { "id": 16777328, "type": 20000, params: [], "bundleName": "com.example.index_test1", "moduleName": "entry" }
                }
            });
            SideBarContainer.onChange((value) => {
                console.info('status:' + value);
            });
            if (!isInitialRender) {
                SideBarContainer.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Column.create();
            Column.width('100%');
            Column.justifyContent(FlexAlign.SpaceEvenly);
            Column.backgroundColor('#19000000');
            if (!isInitialRender) {
                Column.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            ForEach.create();
            const forEachItemGenFunction = _item => {
                const item = _item;
                this.observeComponentCreation((elmtId, isInitialRender) => {
                    ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                    Column.create({ space: 5 });
                    Column.onClick(() => {
                        this.current = item;
                        router.pushUrl({ url: this.pageRoutes[item] });
                    });
                    if (!isInitialRender) {
                        Column.pop();
                    }
                    ViewStackProcessor.StopGetAccessRecording();
                });
                this.observeComponentCreation((elmtId, isInitialRender) => {
                    ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                    Image.create(this.current === item ? this.selectedIcon : this.normalIcon);
                    Image.width(64);
                    Image.height(64);
                    if (!isInitialRender) {
                        Image.pop();
                    }
                    ViewStackProcessor.StopGetAccessRecording();
                });
                this.observeComponentCreation((elmtId, isInitialRender) => {
                    ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                    Text.create("Index" + item);
                    Text.fontSize(25);
                    Text.fontColor(this.current === item ? '#0A59F7' : '#999');
                    Text.fontFamily('source-sans-pro,cursive,sans-serif');
                    if (!isInitialRender) {
                        Text.pop();
                    }
                    ViewStackProcessor.StopGetAccessRecording();
                });
                Text.pop();
                Column.pop();
            };
            this.forEachUpdateFunction(elmtId, this.arr, forEachItemGenFunction, (item) => item, false, false);
            if (!isInitialRender) {
                ForEach.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        ForEach.pop();
        Column.pop();
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Column.create();
            if (!isInitialRender) {
                Column.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        Column.pop();
        SideBarContainer.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
}
//# sourceMappingURL=SideBarContainerExample.js.map