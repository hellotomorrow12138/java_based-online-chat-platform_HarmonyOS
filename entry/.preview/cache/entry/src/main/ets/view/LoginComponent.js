// 导入鸿蒙内置的路由模块
import router from '@ohos:router';
import { CommonConstants } from '@bundle:com.example.index_test1/entry/ets/common/constants/CommonConstants';
//导入鸿蒙内置的弹窗模块
// import promptAction from '@ohos.promptAction';
// import dataPreferences from '@ohos.data.preferences';
// import axios, { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from '@ohos/axios';
// import login_util from '../model/login_util'
import { User } from '@bundle:com.example.index_test1/entry/ets/api/post_user';
export class LoginComponent extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1) {
        super(parent, __localStorage, elmtId);
        this.__isMinHeight = this.createStorageProp('isMinHeight', false, "isMinHeight");
        this.__input_userName = new ObservedPropertySimplePU('', this, "input_userName");
        this.__input_password = new ObservedPropertySimplePU('', this, "input_password");
        this.setInitiallyProvidedValue(params);
    }
    setInitiallyProvidedValue(params) {
        if (params.input_userName !== undefined) {
            this.input_userName = params.input_userName;
        }
        if (params.input_password !== undefined) {
            this.input_password = params.input_password;
        }
    }
    updateStateVars(params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__input_userName.purgeDependencyOnElmtId(rmElmtId);
        this.__input_password.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__isMinHeight.aboutToBeDeleted();
        this.__input_userName.aboutToBeDeleted();
        this.__input_password.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    get isMinHeight() {
        return this.__isMinHeight.get();
    }
    set isMinHeight(newValue) {
        this.__isMinHeight.set(newValue);
    }
    get input_userName() {
        return this.__input_userName.get();
    }
    set input_userName(newValue) {
        this.__input_userName.set(newValue);
    }
    get input_password() {
        return this.__input_password.get();
    }
    set input_password(newValue) {
        this.__input_password.set(newValue);
    }
    initialRender() {
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
            GridRow.debugLine("view/LoginComponent.ets(19:5)");
            GridRow.opacity(1);
            GridRow.grayscale(0);
            GridRow.padding({ "top": "0.00vp", "right": "0.00vp", "bottom": "0.00vp", "left": "0.00vp" });
            GridRow.margin({ "top": "200.00vp", "right": "0.00vp", "bottom": "0.00vp", "left": "0.00vp" });
            if (!isInitialRender) {
                GridRow.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            GridCol.create({
                span: {
                    sm: CommonConstants.SPAN_SM,
                    md: CommonConstants.SPAN_MD,
                    lg: CommonConstants.SPAN_LG
                },
                offset: {
                    sm: CommonConstants.OFFSET_SM,
                    md: CommonConstants.OFFSET_MD,
                    lg: CommonConstants.OFFSET_LG
                }
            });
            GridCol.debugLine("view/LoginComponent.ets(28:7)");
            if (!isInitialRender) {
                GridCol.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Column.create();
            Column.debugLine("view/LoginComponent.ets(40:9)");
            if (!isInitialRender) {
                Column.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Text.create(`KALA`);
            Text.debugLine("view/LoginComponent.ets(41:11)");
            Text.width('100%');
            Text.height('60vp');
            Text.textAlign(TextAlign.Center);
            Text.fontSize('60vp');
            Text.margin({ "top": "-40.00vp", "right": "0.00vp", "bottom": "100.00vp", "left": "0.00vp" });
            if (!isInitialRender) {
                Text.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        Text.pop();
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            TextInput.create({ placeholder: '账号' });
            TextInput.debugLine("view/LoginComponent.ets(49:11)");
            TextInput.width('100%');
            TextInput.height('48vp');
            TextInput.placeholderColor('#99182431');
            TextInput.placeholderFont({ size: '16vp' });
            TextInput.backgroundColor('#00FFFFFF');
            TextInput.fontSize('16vp');
            TextInput.padding({ left: '20vp' });
            TextInput.border({
                width: { bottom: '1vp' },
                color: '#33000000',
                radius: '0vp'
            });
            TextInput.onChange((value) => {
                this.input_userName = value;
            });
            if (!isInitialRender) {
                TextInput.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            TextInput.create({ placeholder: '密码' });
            TextInput.debugLine("view/LoginComponent.ets(65:11)");
            TextInput.width(CommonConstants.TEXT_INPUT_WIDTH_PERCENT);
            TextInput.height('48vp');
            TextInput.placeholderColor('#99182403');
            TextInput.placeholderFont({ size: '16vp' });
            TextInput.fontSize('16vp');
            TextInput.backgroundColor('#00ffffff');
            TextInput.type(InputType.Password);
            TextInput.padding({ left: '20vp' });
            TextInput.border({
                width: { bottom: '1vp' },
                color: '#33000000',
                radius: '0vp'
            });
            TextInput.margin({ bottom: '28vp' });
            TextInput.onChange((value) => {
                this.input_password = value;
            });
            if (!isInitialRender) {
                TextInput.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        Column.pop();
        GridCol.pop();
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            GridCol.create({
                span: {
                    sm: CommonConstants.BUTTON_SPAN_SM,
                    md: this.isMinHeight ? CommonConstants.BUTTON_SPAN_MD_SMALL : CommonConstants.BUTTON_SPAN_MD_BIG,
                    lg: CommonConstants.BUTTON_SPAN_LG
                },
                offset: {
                    sm: CommonConstants.BUTTON_OFFSET_SM,
                    md: CommonConstants.BUTTON_OFFSET_MD,
                    lg: CommonConstants.BUTTON_OFFSET_LG
                }
            });
            GridCol.debugLine("view/LoginComponent.ets(86:7)");
            if (!isInitialRender) {
                GridCol.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Button.createWithLabel('点击以登录');
            Button.debugLine("view/LoginComponent.ets(98:9)");
            Button.width(CommonConstants.BUTTON_WIDTH_PERCENT);
            Button.height('40vp');
            Button.borderRadius('20vp');
            Button.fontSize('16vp');
            Button.margin({ top: '12vp' });
            Button.fontWeight(CommonConstants.LOGIN_TEXT_FONT_WEIGHT);
            Button.fontColor((this.input_userName, this.input_password) ? Color.White : '#66ffffff');
            Button.backgroundColor((this.input_userName, this.input_password) ? '#007dff' : '#66007dff');
            Button.onClick(() => {
                User({
                    "user_name": this.input_userName,
                    "user_password": this.input_password
                }).then((res) => {
                    console.log("res: " + JSON.stringify(res));
                    // router.pushUrl({ url: "pages/MinePage"})
                    console.log("headers: " + JSON.stringify(res.headers));
                }).catch((err) => {
                    console.log(JSON.stringify(err));
                });
            });
            if (!isInitialRender) {
                Button.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        Button.pop();
        GridCol.pop();
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            GridCol.create({
                span: {
                    sm: CommonConstants.BUTTON_SPAN_SM,
                    md: this.isMinHeight ? CommonConstants.BUTTON_SPAN_MD_SMALL : CommonConstants.BUTTON_SPAN_MD_BIG,
                    lg: CommonConstants.BUTTON_SPAN_LG
                },
                offset: {
                    sm: CommonConstants.BUTTON_OFFSET_SM,
                    md: this.isMinHeight ? CommonConstants.BUTTON_OFFSET_SM : CommonConstants.BUTTON_OFFSET_MD,
                    lg: CommonConstants.BUTTON_OFFSET_LG
                }
            });
            GridCol.debugLine("view/LoginComponent.ets(123:7)");
            if (!isInitialRender) {
                GridCol.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Button.createWithLabel('点击以注册');
            Button.debugLine("view/LoginComponent.ets(135:9)");
            Button.width(CommonConstants.BUTTON_WIDTH_PERCENT);
            Button.height('40vp');
            Button.fontSize('16vp');
            Button.fontWeight(CommonConstants.BUTTON_FONT_WEIGHT);
            Button.borderRadius('20vp');
            Button.margin({ top: '12vp' });
            Button.fontColor('#007DFF');
            Button.backgroundColor('#0D000000');
            Button.onClick(() => {
                router.pushUrl({
                    url: CommonConstants.REGISTRATION_SUCCESS_PAGE_URL
                });
            });
            if (!isInitialRender) {
                Button.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        Button.pop();
        GridCol.pop();
        GridRow.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
}
//# sourceMappingURL=LoginComponent.js.map