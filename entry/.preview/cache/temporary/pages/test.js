import router from '@ohos:router';
class SideBarContainerExample extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1) {
        super(parent, __localStorage, elmtId);
        this.normalIcon = { "id": 16777329, "type": 20000, params: [], "bundleName": "com.example.index_test1", "moduleName": "entry" };
        this.selectedIcon = { "id": 16777329, "type": 20000, params: [], "bundleName": "com.example.index_test1", "moduleName": "entry" };
        this.__arr = new ObservedPropertyObjectPU([1, 2, 3], this, "arr");
        this.__current = new ObservedPropertySimplePU(1, this, "current");
        this.pageRoutes = {
            1: '/RegistrationSuccessPage',
            2: '/RegistrationSuccessPage',
            3: '/RegistrationSuccessPage', // 3对应Page3的路径
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
            SideBarContainer.debugLine("pages/test.ets(16:5)");
            SideBarContainer.controlButton({
                icons: {
                    hidden: { "id": 16777244, "type": 20000, params: [], "bundleName": "com.example.index_test1", "moduleName": "entry" },
                    shown: { "id": 16777219, "type": 20000, params: [], "bundleName": "com.example.index_test1", "moduleName": "entry" },
                    switching: { "id": 16777329, "type": 20000, params: [], "bundleName": "com.example.index_test1", "moduleName": "entry" }
                }
            });
            SideBarContainer.sideBarWidth(150);
            SideBarContainer.minSideBarWidth(50);
            SideBarContainer.maxSideBarWidth(300);
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
            Column.debugLine("pages/test.ets(17:7)");
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
                    Column.debugLine("pages/test.ets(19:11)");
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
                    Image.debugLine("pages/test.ets(20:13)");
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
                    Text.debugLine("pages/test.ets(21:13)");
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
            Column.debugLine("pages/test.ets(35:7)");
            Column.margin({ top: 50, left: 20, right: 30 });
            if (!isInitialRender) {
                Column.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Text.create('SideBarContainer content text1');
            Text.debugLine("pages/test.ets(36:9)");
            Text.fontSize(25);
            if (!isInitialRender) {
                Text.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        Text.pop();
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Text.create('SideBarContainer content text2');
            Text.debugLine("pages/test.ets(37:9)");
            Text.fontSize(25);
            if (!isInitialRender) {
                Text.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        Text.pop();
        Column.pop();
        SideBarContainer.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
}
ViewStackProcessor.StartGetAccessRecordingFor(ViewStackProcessor.AllocateNewElmetIdForNextComponent());
loadDocument(new SideBarContainerExample(undefined, {}));
ViewStackProcessor.StopGetAccessRecording();
