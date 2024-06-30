import router from '@ohos:router';
import { CommonConstants } from '@bundle:com.example.index_test1/entry/ets/common/constants/CommonConstants';
import { store } from '@bundle:com.example.index_test1/entry/ets/api/get_store';
import promptAction from '@ohos:promptAction';
import { get_sendStore } from '@bundle:com.example.index_test1/entry/ets/api/get_sendStore';
import PreferenceUtil from '@bundle:com.example.index_test1/entry/ets/model/PerferencesUtil';
import { get_likeStore } from '@bundle:com.example.index_test1/entry/ets/api/get_likeStore';
class StorePage extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1) {
        super(parent, __localStorage, elmtId);
        this.__store = new ObservedPropertyObjectPU([], this, "store");
        this.__likeStore = new ObservedPropertyObjectPU([], this, "likeStore");
        this.__selectedItemId = new ObservedPropertySimplePU(0, this, "selectedItemId");
        this.__login_user = new ObservedPropertySimplePU('', this, "login_user");
        this.addProvidedVar("login_user", this.__login_user);
        this.setInitiallyProvidedValue(params);
    }
    setInitiallyProvidedValue(params) {
        if (params.store !== undefined) {
            this.store = params.store;
        }
        if (params.likeStore !== undefined) {
            this.likeStore = params.likeStore;
        }
        if (params.selectedItemId !== undefined) {
            this.selectedItemId = params.selectedItemId;
        }
        if (params.login_user !== undefined) {
            this.login_user = params.login_user;
        }
    }
    updateStateVars(params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__store.purgeDependencyOnElmtId(rmElmtId);
        this.__likeStore.purgeDependencyOnElmtId(rmElmtId);
        this.__selectedItemId.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__store.aboutToBeDeleted();
        this.__likeStore.aboutToBeDeleted();
        this.__selectedItemId.aboutToBeDeleted();
        this.__login_user.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    get store() {
        return this.__store.get();
    }
    set store(newValue) {
        this.__store.set(newValue);
    }
    get likeStore() {
        return this.__likeStore.get();
    }
    set likeStore(newValue) {
        this.__likeStore.set(newValue);
    }
    get selectedItemId() {
        return this.__selectedItemId.get();
    }
    set selectedItemId(newValue) {
        this.__selectedItemId.set(newValue);
    }
    get login_user() {
        return this.__login_user.get();
    }
    set login_user(newValue) {
        this.__login_user.set(newValue);
    }
    async aboutToAppear() {
        this.login_user = await PreferenceUtil.getPreferenceUtilValue('MyData', 'indexLogin', '未登录');
        await store({}).then((res) => {
            console.log("data: " + JSON.stringify(res.data));
            this.store = res.data;
        }).catch((err) => {
            console.log(JSON.stringify(err));
        });
        await get_likeStore({
            "login_user": this.login_user
        }).then((res) => {
            console.log("get_likeStore data: " + JSON.stringify(res.data));
            this.likeStore = res.data;
        }).catch((err) => {
            console.log("get_likeStore error: " + JSON.stringify(err));
        });
    }
    initialRender() {
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Column.create();
            Column.debugLine("pages/StorePage.ets(37:5)");
            if (!isInitialRender) {
                Column.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        this.Title.bind(this)();
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            ForEach.create();
            const forEachItemGenFunction = _item => {
                const likeStore = _item;
                this.observeComponentCreation((elmtId, isInitialRender) => {
                    ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                    Column.create();
                    Column.debugLine("pages/StorePage.ets(40:11)");
                    Column.border({ width: { left: 1, right: 1, top: 1, bottom: 1 } });
                    if (!isInitialRender) {
                        Column.pop();
                    }
                    ViewStackProcessor.StopGetAccessRecording();
                });
                this.observeComponentCreation((elmtId, isInitialRender) => {
                    ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                    Text.create("收藏的商品为：");
                    Text.debugLine("pages/StorePage.ets(41:13)");
                    Text.fontSize(20);
                    Text.fontColor("#000");
                    Text.width('auto');
                    if (!isInitialRender) {
                        Text.pop();
                    }
                    ViewStackProcessor.StopGetAccessRecording();
                });
                Text.pop();
                this.observeComponentCreation((elmtId, isInitialRender) => {
                    var _a;
                    ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                    Text.create(` ${(_a = likeStore.goods_name) !== null && _a !== void 0 ? _a : '无商品名'} `);
                    Text.debugLine("pages/StorePage.ets(45:13)");
                    Text.fontSize(20);
                    Text.fontColor("#000");
                    Text.width('auto');
                    if (!isInitialRender) {
                        Text.pop();
                    }
                    ViewStackProcessor.StopGetAccessRecording();
                });
                Text.pop();
                this.observeComponentCreation((elmtId, isInitialRender) => {
                    var _a;
                    ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                    Text.create(` ${(_a = likeStore.goods_sell) !== null && _a !== void 0 ? _a : '无价格'}`);
                    Text.debugLine("pages/StorePage.ets(49:13)");
                    Text.fontSize(20);
                    Text.fontColor("#000");
                    Text.width('auto');
                    if (!isInitialRender) {
                        Text.pop();
                    }
                    ViewStackProcessor.StopGetAccessRecording();
                });
                Text.pop();
                Column.pop();
            };
            this.forEachUpdateFunction(elmtId, this.likeStore, forEachItemGenFunction);
            if (!isInitialRender) {
                ForEach.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        ForEach.pop();
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Row.create();
            Row.debugLine("pages/StorePage.ets(56:9)");
            Row.width('100%');
            Row.height('70%');
            Row.justifyContent(FlexAlign.Center);
            if (!isInitialRender) {
                Row.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Column.create();
            Column.debugLine("pages/StorePage.ets(57:11)");
            Column.border({ width: { left: 1, right: 1, top: 1, bottom: 1 } });
            if (!isInitialRender) {
                Column.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Text.create("选择：");
            Text.debugLine("pages/StorePage.ets(58:13)");
            Text.fontSize(20);
            Text.fontColor("#000");
            Text.width('auto');
            Text.margin({ "top": "5.00vp" });
            if (!isInitialRender) {
                Text.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        Text.pop();
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Text.create("商品id：");
            Text.debugLine("pages/StorePage.ets(63:13)");
            Text.fontSize(20);
            Text.fontColor("#000");
            Text.width('auto');
            if (!isInitialRender) {
                Text.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        Text.pop();
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Text.create("商品名：");
            Text.debugLine("pages/StorePage.ets(67:13)");
            Text.fontSize(20);
            Text.fontColor("#000");
            Text.width('auto');
            if (!isInitialRender) {
                Text.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        Text.pop();
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Text.create("商品价格：");
            Text.debugLine("pages/StorePage.ets(71:13)");
            Text.fontSize(20);
            Text.fontColor("#000");
            Text.width('auto');
            if (!isInitialRender) {
                Text.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        Text.pop();
        Column.pop();
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            ForEach.create();
            const forEachItemGenFunction = _item => {
                const store = _item;
                this.observeComponentCreation((elmtId, isInitialRender) => {
                    ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                    Column.create();
                    Column.debugLine("pages/StorePage.ets(78:13)");
                    Column.border({ width: { left: 1, right: 1, top: 1, bottom: 1 } });
                    if (!isInitialRender) {
                        Column.pop();
                    }
                    ViewStackProcessor.StopGetAccessRecording();
                });
                this.observeComponentCreation((elmtId, isInitialRender) => {
                    ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                    Radio.create({ value: store.id, group: 'radioGroup' });
                    Radio.debugLine("pages/StorePage.ets(79:15)");
                    Radio.width('17.00vp');
                    Radio.margin({ "top": "0.00px", "right": "0.00px", "bottom": "0.00px", "left": "0.00px" });
                    Radio.onChange(async (isChecked) => {
                        if (isChecked) {
                            //需要执行的操作
                            this.selectedItemId = store.id;
                        }
                    });
                    if (!isInitialRender) {
                        Radio.pop();
                    }
                    ViewStackProcessor.StopGetAccessRecording();
                });
                this.observeComponentCreation((elmtId, isInitialRender) => {
                    ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                    Text.create(`${store.id} `);
                    Text.debugLine("pages/StorePage.ets(88:15)");
                    Text.fontSize(20);
                    Text.fontColor("#000");
                    Text.width('auto');
                    if (!isInitialRender) {
                        Text.pop();
                    }
                    ViewStackProcessor.StopGetAccessRecording();
                });
                Text.pop();
                this.observeComponentCreation((elmtId, isInitialRender) => {
                    var _a;
                    ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                    Text.create(` ${(_a = store.goods_name) !== null && _a !== void 0 ? _a : '无商品名'} `);
                    Text.debugLine("pages/StorePage.ets(92:15)");
                    Text.fontSize(20);
                    Text.fontColor("#000");
                    Text.width('auto');
                    if (!isInitialRender) {
                        Text.pop();
                    }
                    ViewStackProcessor.StopGetAccessRecording();
                });
                Text.pop();
                this.observeComponentCreation((elmtId, isInitialRender) => {
                    var _a;
                    ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                    Text.create(` ${(_a = store.goods_sell) !== null && _a !== void 0 ? _a : '无价格'}`);
                    Text.debugLine("pages/StorePage.ets(96:15)");
                    Text.fontSize(20);
                    Text.fontColor("#000");
                    Text.width('auto');
                    if (!isInitialRender) {
                        Text.pop();
                    }
                    ViewStackProcessor.StopGetAccessRecording();
                });
                Text.pop();
                Column.pop();
            };
            this.forEachUpdateFunction(elmtId, this.store, forEachItemGenFunction);
            if (!isInitialRender) {
                ForEach.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        ForEach.pop();
        Row.pop();
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Column.create();
            Column.debugLine("pages/StorePage.ets(108:9)");
            Column.layoutWeight(CommonConstants.SCROLL_LAYOUT_WEIGHT);
            if (!isInitialRender) {
                Column.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Button.createWithLabel("点击收藏");
            Button.debugLine("pages/StorePage.ets(109:11)");
            Button.height('30%');
            Button.width('100%');
            Button.onClick(async () => {
                if (this.selectedItemId) {
                    await get_sendStore({
                        "selectedItemId": this.selectedItemId,
                        "login_user": this.login_user
                    }).then((res) => {
                        console.log("data: " + JSON.stringify(res.data));
                    }).catch((err) => {
                        console.log(JSON.stringify(err));
                    });
                }
                else {
                    promptAction.showToast({
                        message: '没有选择',
                        duration: 3000, // 显示时长，单位毫秒
                    });
                }
            });
            if (!isInitialRender) {
                Button.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        Button.pop();
        Column.pop();
        Column.pop();
    }
    Title(parent = null) {
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Row.create();
            Row.debugLine("pages/StorePage.ets(134:5)");
            Row.width(CommonConstants.FULL_WIDTH_PERCENT);
            Row.height({ "id": 16777323, "type": 10002, params: [], "bundleName": "com.example.index_test1", "moduleName": "entry" });
            if (!isInitialRender) {
                Row.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Image.create({ "id": 16777221, "type": 20000, params: [], "bundleName": "com.example.index_test1", "moduleName": "entry" });
            Image.debugLine("pages/StorePage.ets(135:7)");
            Image.width({ "id": 16777280, "type": 10002, params: [], "bundleName": "com.example.index_test1", "moduleName": "entry" });
            Image.height({ "id": 16777280, "type": 10002, params: [], "bundleName": "com.example.index_test1", "moduleName": "entry" });
            Image.margin({
                left: { "id": 16777278, "type": 10002, params: [], "bundleName": "com.example.index_test1", "moduleName": "entry" },
                right: { "id": 16777279, "type": 10002, params: [], "bundleName": "com.example.index_test1", "moduleName": "entry" }
            });
            Image.onClick(() => {
                router.back();
            });
            if (!isInitialRender) {
                Image.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Text.create("商店页面");
            Text.debugLine("pages/StorePage.ets(145:7)");
            Text.fontSize({ "id": 16777324, "type": 10002, params: [], "bundleName": "com.example.index_test1", "moduleName": "entry" });
            Text.fontColor({ "id": 16777266, "type": 10001, params: [], "bundleName": "com.example.index_test1", "moduleName": "entry" });
            Text.fontWeight(CommonConstants.TITLE_FONT_WEIGHT);
            if (!isInitialRender) {
                Text.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        Text.pop();
        Row.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
}
ViewStackProcessor.StartGetAccessRecordingFor(ViewStackProcessor.AllocateNewElmetIdForNextComponent());
loadDocument(new StorePage(undefined, {}));
ViewStackProcessor.StopGetAccessRecording();
