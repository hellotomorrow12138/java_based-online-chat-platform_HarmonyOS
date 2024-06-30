import router from '@ohos:router';
import { CommonConstants } from '@bundle:chat.kalakala.top/entry/ets/common/constants/CommonConstants';
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
            if (!isInitialRender) {
                Column.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        this.Title.bind(this)();
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Scroll.create();
            Scroll.layoutWeight(CommonConstants.SCROLL_LAYOUT_WEIGHT);
            if (!isInitialRender) {
                Scroll.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Column.create();
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
            Image.create({ "id": 16777325, "type": 20000, params: [], "bundleName": "chat.kalakala.top", "moduleName": "entry" });
            Image.objectFit(ImageFit.Contain);
            Image.width({ "id": 16777310, "type": 10002, params: [], "bundleName": "chat.kalakala.top", "moduleName": "entry" });
            Image.height({ "id": 16777309, "type": 10002, params: [], "bundleName": "chat.kalakala.top", "moduleName": "entry" });
            if (!isInitialRender) {
                Image.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Text.create({ "id": 16777235, "type": 10003, params: [], "bundleName": "chat.kalakala.top", "moduleName": "entry" });
            Text.width({ "id": 16777308, "type": 10002, params: [], "bundleName": "chat.kalakala.top", "moduleName": "entry" });
            Text.height({ "id": 16777306, "type": 10002, params: [], "bundleName": "chat.kalakala.top", "moduleName": "entry" });
            Text.textAlign(TextAlign.Center);
            Text.fontSize({ "id": 16777305, "type": 10002, params: [], "bundleName": "chat.kalakala.top", "moduleName": "entry" });
            Text.fontColor({ "id": 16777255, "type": 10001, params: [], "bundleName": "chat.kalakala.top", "moduleName": "entry" });
            Text.margin({ top: { "id": 16777307, "type": 10002, params: [], "bundleName": "chat.kalakala.top", "moduleName": "entry" } });
            if (!isInitialRender) {
                Text.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        Text.pop();
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Text.create('进入主页');
            Text.width({ "id": 16777281, "type": 10002, params: [], "bundleName": "chat.kalakala.top", "moduleName": "entry" });
            Text.height({ "id": 16777280, "type": 10002, params: [], "bundleName": "chat.kalakala.top", "moduleName": "entry" });
            Text.textAlign(TextAlign.Center);
            Text.fontSize({ "id": 16777282, "type": 10002, params: [], "bundleName": "chat.kalakala.top", "moduleName": "entry" });
            Text.fontColor({ "id": 16777245, "type": 10001, params: [], "bundleName": "chat.kalakala.top", "moduleName": "entry" });
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
            Row.width(CommonConstants.FULL_WIDTH_PERCENT);
            Row.height({ "id": 16777317, "type": 10002, params: [], "bundleName": "chat.kalakala.top", "moduleName": "entry" });
            if (!isInitialRender) {
                Row.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Image.create({ "id": 16777323, "type": 20000, params: [], "bundleName": "chat.kalakala.top", "moduleName": "entry" });
            Image.width({ "id": 16777274, "type": 10002, params: [], "bundleName": "chat.kalakala.top", "moduleName": "entry" });
            Image.height({ "id": 16777274, "type": 10002, params: [], "bundleName": "chat.kalakala.top", "moduleName": "entry" });
            Image.margin({
                left: { "id": 16777272, "type": 10002, params: [], "bundleName": "chat.kalakala.top", "moduleName": "entry" },
                right: { "id": 16777273, "type": 10002, params: [], "bundleName": "chat.kalakala.top", "moduleName": "entry" }
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
            Text.create({ "id": 16777235, "type": 10003, params: [], "bundleName": "chat.kalakala.top", "moduleName": "entry" });
            Text.fontSize({ "id": 16777318, "type": 10002, params: [], "bundleName": "chat.kalakala.top", "moduleName": "entry" });
            Text.fontColor({ "id": 16777260, "type": 10001, params: [], "bundleName": "chat.kalakala.top", "moduleName": "entry" });
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
//# sourceMappingURL=RegistrationSuccessPage.js.map