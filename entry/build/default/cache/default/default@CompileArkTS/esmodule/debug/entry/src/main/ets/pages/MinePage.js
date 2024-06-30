import router from '@ohos:router';
import { CommonConstants } from '@bundle:chat.kalakala.top/entry/ets/common/constants/CommonConstants';
import PreferenceUtil from '@bundle:chat.kalakala.top/entry/ets/model/PerferencesUtil';
class MinePage extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1) {
        super(parent, __localStorage, elmtId);
        this.__login_user = new ObservedPropertySimplePU('', this, "login_user");
        this.addProvidedVar("login_user", this.__login_user);
        this.__categoryTabIndex = new ObservedPropertySimplePU(1, this, "categoryTabIndex");
        this.normalIcon = { "id": 16777327, "type": 20000, params: [], "bundleName": "chat.kalakala.top", "moduleName": "entry" };
        this.__current = new ObservedPropertySimplePU(1, this, "current");
        this.__arr = new ObservedPropertyObjectPU([
            { index: 1, name: 'ArticlePage', index_name: '文章' },
            { index: 2, name: 'ChatPage', index_name: '聊天房' },
            { index: 3, name: 'StorePage', index_name: '商店' },
        ], this, "arr");
        this.scroller = undefined;
        this.setInitiallyProvidedValue(params);
    }
    setInitiallyProvidedValue(params) {
        if (params.login_user !== undefined) {
            this.login_user = params.login_user;
        }
        if (params.categoryTabIndex !== undefined) {
            this.categoryTabIndex = params.categoryTabIndex;
        }
        if (params.normalIcon !== undefined) {
            this.normalIcon = params.normalIcon;
        }
        if (params.current !== undefined) {
            this.current = params.current;
        }
        if (params.arr !== undefined) {
            this.arr = params.arr;
        }
        if (params.scroller !== undefined) {
            this.scroller = params.scroller;
        }
    }
    updateStateVars(params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__categoryTabIndex.purgeDependencyOnElmtId(rmElmtId);
        this.__current.purgeDependencyOnElmtId(rmElmtId);
        this.__arr.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__login_user.aboutToBeDeleted();
        this.__categoryTabIndex.aboutToBeDeleted();
        this.__current.aboutToBeDeleted();
        this.__arr.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    get login_user() {
        return this.__login_user.get();
    }
    set login_user(newValue) {
        this.__login_user.set(newValue);
    }
    get categoryTabIndex() {
        return this.__categoryTabIndex.get();
    }
    set categoryTabIndex(newValue) {
        this.__categoryTabIndex.set(newValue);
    }
    get current() {
        return this.__current.get();
    }
    set current(newValue) {
        this.__current.set(newValue);
    }
    get arr() {
        return this.__arr.get();
    }
    set arr(newValue) {
        this.__arr.set(newValue);
    }
    async aboutToAppear() {
        this.login_user = await PreferenceUtil.getPreferenceUtilValue('MyData', 'indexLogin', '未登录');
    }
    initialRender() {
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            SideBarContainer.create();
            SideBarContainer.backgroundColor('#f1f3f5');
            if (!isInitialRender) {
                SideBarContainer.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Column.create();
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
                    Column.create();
                    Column.onClick(() => {
                        this.current = item.index;
                        // 注意：这里需要根据实际情况调整如何获取页面路径，可能需要单独维护一个路径映射表或在页面对象中包含路径信息
                        router.pushUrl({ url: `pages/${item.name}` }); // 示例路径转换
                    });
                    if (!isInitialRender) {
                        Column.pop();
                    }
                    ViewStackProcessor.StopGetAccessRecording();
                });
                this.observeComponentCreation((elmtId, isInitialRender) => {
                    ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                    Image.create(this.current === item.index ? `listImage/${item.name}.png` : `listImage/${item.name}.png`);
                    Image.width(64);
                    Image.height(64);
                    if (!isInitialRender) {
                        Image.pop();
                    }
                    ViewStackProcessor.StopGetAccessRecording();
                });
                this.observeComponentCreation((elmtId, isInitialRender) => {
                    ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                    Text.create(item.index_name);
                    Text.fontSize(25);
                    Text.fontColor(this.current === item.index ? '#0A59F7' : '#999');
                    Text.fontFamily('source-sans-pro,cursive,sans-serif');
                    if (!isInitialRender) {
                        Text.pop();
                    }
                    ViewStackProcessor.StopGetAccessRecording();
                });
                Text.pop();
                Column.pop();
            };
            this.forEachUpdateFunction(elmtId, this.arr, forEachItemGenFunction, (item) => item.name, false, false);
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
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Scroll.create();
            Scroll.margin({ top: '4vp' });
            if (!isInitialRender) {
                Scroll.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            GridRow.create({
                columns: {
                    sm: CommonConstants.GRID_ROW_SM,
                    md: CommonConstants.GRID_ROW_MD,
                    lg: CommonConstants.GRID_ROW_LG
                },
                gutter: { x: CommonConstants.GUTTER_X },
                breakpoints: { value: CommonConstants.BREAK_POINT }
            });
            GridRow.margin({
                left: '12vp',
                right: '12vp'
            });
            if (!isInitialRender) {
                GridRow.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            GridCol.create({
                span: {
                    sm: CommonConstants.MINE_SPAN_SM,
                    md: CommonConstants.MINE_SPAN_MD,
                    lg: CommonConstants.MINE_SPAN_LG
                },
                offset: {
                    lg: CommonConstants.OFFSET_LG
                }
            });
            if (!isInitialRender) {
                GridCol.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Column.create();
            if (!isInitialRender) {
                Column.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Image.create(`userImage/${this.login_user}.png`);
            Image.width('56vp');
            Image.height('56vp');
            Image.objectFit(ImageFit.Contain);
            if (!isInitialRender) {
                Image.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Text.create(`${this.login_user}`);
            Text.textAlign(TextAlign.Center);
            Text.fontWeight(CommonConstants.NICKNAME_FONT_WEIGHT);
            Text.fontSize('20vp');
            Text.margin({ top: '12vp' });
            if (!isInitialRender) {
                Text.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        Text.pop();
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Text.create(`您已登录`);
            Text.textAlign(TextAlign.Center);
            Text.fontWeight(CommonConstants.NICKNAME_FONT_WEIGHT);
            Text.fontSize('20vp');
            Text.margin({ top: '12vp' });
            if (!isInitialRender) {
                Text.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        Text.pop();
        Column.pop();
        GridCol.pop();
        GridRow.pop();
        Scroll.pop();
        Column.pop();
        SideBarContainer.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
}
ViewStackProcessor.StartGetAccessRecordingFor(ViewStackProcessor.AllocateNewElmetIdForNextComponent());
loadDocument(new MinePage(undefined, {}));
ViewStackProcessor.StopGetAccessRecording();
//# sourceMappingURL=MinePage.js.map