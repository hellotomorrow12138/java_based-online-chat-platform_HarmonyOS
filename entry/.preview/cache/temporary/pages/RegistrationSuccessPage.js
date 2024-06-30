import router from '@ohos:router';
import { CommonConstants } from '@bundle:com.example.index_test1/entry/ets/common/constants/CommonConstants';
class RegistrationSuccessPage extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1) {
        super(parent, __localStorage, elmtId);
        this.setInitiallyProvidedValue(params);
    }
    setInitiallyProvidedValue(params) {
    }
    updateStateVars(params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
    }
    aboutToBeDeleted() {
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    initialRender() {
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Column.create();
            Column.debugLine("pages/RegistrationSuccessPage.ets(11:5)");
            if (!isInitialRender) {
                Column.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        this.Title.bind(this)();
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Scroll.create();
            Scroll.debugLine("pages/RegistrationSuccessPage.ets(14:7)");
            Scroll.layoutWeight(CommonConstants.SCROLL_LAYOUT_WEIGHT);
            if (!isInitialRender) {
                Scroll.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Column.create();
            Column.debugLine("pages/RegistrationSuccessPage.ets(15:9)");
            Column.width(CommonConstants.REGISTRATION_PAGE_WIDTH_PERCENT);
            Column.height(CommonConstants.REGISTRATION_PAGE_HEIGHT_PERCENT);
            Column.justifyContent(FlexAlign.Center);
            if (!isInitialRender) {
                Column.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Image.create({ "id": 16777220, "type": 20000, params: [], "bundleName": "com.example.index_test1", "moduleName": "entry" });
            Image.debugLine("pages/RegistrationSuccessPage.ets(16:11)");
            Image.objectFit(ImageFit.Contain);
            Image.width({ "id": 16777316, "type": 10002, params: [], "bundleName": "com.example.index_test1", "moduleName": "entry" });
            Image.height({ "id": 16777315, "type": 10002, params: [], "bundleName": "com.example.index_test1", "moduleName": "entry" });
            if (!isInitialRender) {
                Image.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Text.create({ "id": 16777238, "type": 10003, params: [], "bundleName": "com.example.index_test1", "moduleName": "entry" });
            Text.debugLine("pages/RegistrationSuccessPage.ets(21:11)");
            Text.width({ "id": 16777314, "type": 10002, params: [], "bundleName": "com.example.index_test1", "moduleName": "entry" });
            Text.height({ "id": 16777312, "type": 10002, params: [], "bundleName": "com.example.index_test1", "moduleName": "entry" });
            Text.textAlign(TextAlign.Center);
            Text.fontSize({ "id": 16777311, "type": 10002, params: [], "bundleName": "com.example.index_test1", "moduleName": "entry" });
            Text.fontColor({ "id": 16777261, "type": 10001, params: [], "bundleName": "com.example.index_test1", "moduleName": "entry" });
            Text.margin({ top: { "id": 16777313, "type": 10002, params: [], "bundleName": "com.example.index_test1", "moduleName": "entry" } });
            if (!isInitialRender) {
                Text.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        Text.pop();
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Text.create('返回主页');
            Text.debugLine("pages/RegistrationSuccessPage.ets(29:11)");
            Text.width({ "id": 16777287, "type": 10002, params: [], "bundleName": "com.example.index_test1", "moduleName": "entry" });
            Text.height({ "id": 16777286, "type": 10002, params: [], "bundleName": "com.example.index_test1", "moduleName": "entry" });
            Text.textAlign(TextAlign.Center);
            Text.fontSize({ "id": 16777288, "type": 10002, params: [], "bundleName": "com.example.index_test1", "moduleName": "entry" });
            Text.fontColor({ "id": 16777251, "type": 10001, params: [], "bundleName": "com.example.index_test1", "moduleName": "entry" });
            Text.onClick(() => {
                router.replaceUrl({
                    url: CommonConstants.MINE_PAGE_URL
                });
            });
            if (!isInitialRender) {
                Text.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        Text.pop();
        Column.pop();
        Scroll.pop();
        Column.pop();
    }
    Title(parent = null) {
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Row.create();
            Row.debugLine("pages/RegistrationSuccessPage.ets(50:5)");
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
            Image.debugLine("pages/RegistrationSuccessPage.ets(51:7)");
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
            Text.create({ "id": 16777238, "type": 10003, params: [], "bundleName": "com.example.index_test1", "moduleName": "entry" });
            Text.debugLine("pages/RegistrationSuccessPage.ets(62:7)");
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
loadDocument(new RegistrationSuccessPage(undefined, {}));
ViewStackProcessor.StopGetAccessRecording();
