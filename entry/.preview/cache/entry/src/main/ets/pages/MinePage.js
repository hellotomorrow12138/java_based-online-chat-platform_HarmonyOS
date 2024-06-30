import { CommonConstants } from '@bundle:com.example.index_test1/entry/ets/common/constants/CommonConstants';
class MinePage extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1) {
        super(parent, __localStorage, elmtId);
        this.__login_user = new ObservedPropertySimplePU(''
        // async login_internet(){
        //   axios<string, AxiosResponse<string>, null>({
        //     method: "get",
        //     headers:{'Content-Type': 'application/x-www-form-urlencoded' },
        //     url: "http://192.168.2.112:8080/getUsername"
        //   }).then((res: AxiosResponse) => {
        //     console.log('result:' + JSON.stringify(res.data));
        //     // router.pushUrl({
        //     //   url: 'pages/MinePage'
        //     // });
        //     this.connect_data = JSON.stringify(res.data)
        //   }).catch((error: AxiosError) => {
        //     console.error(error.message);
        //   })
        // }
        // async aboutToAppear(){
        //   this.login_user = await loginUtil.getPreference('login_Name','key_minepage','null') as string
        // }
        , this, "login_user");
        this.addProvidedVar("login_user", this.__login_user);
        this.__connect_data = new ObservedPropertyObjectPU('', this, "connect_data");
        this.setInitiallyProvidedValue(params);
    }
    setInitiallyProvidedValue(params) {
        if (params.login_user !== undefined) {
            this.login_user = params.login_user;
        }
        if (params.connect_data !== undefined) {
            this.connect_data = params.connect_data;
        }
    }
    updateStateVars(params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__connect_data.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__login_user.aboutToBeDeleted();
        this.__connect_data.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    get login_user() {
        return this.__login_user.get();
    }
    set login_user(newValue) {
        this.__login_user.set(newValue);
    }
    get connect_data() {
        return this.__connect_data.get();
    }
    set connect_data(newValue) {
        this.__connect_data.set(newValue);
    }
    initialRender() {
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Column.create();
            Column.debugLine("pages/MinePage.ets(38:5)");
            Column.alignItems(HorizontalAlign.Center);
            Column.backgroundColor('#f1f3f5');
            if (!isInitialRender) {
                Column.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            // this.Title()
            Scroll.create();
            Scroll.debugLine("pages/MinePage.ets(40:7)");
            // this.Title()
            Scroll.margin({ top: '4vp' });
            if (!isInitialRender) {
                // this.Title()
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
            GridRow.debugLine("pages/MinePage.ets(41:9)");
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
            GridCol.debugLine("pages/MinePage.ets(50:11)");
            if (!isInitialRender) {
                GridCol.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Column.create();
            Column.debugLine("pages/MinePage.ets(60:13)");
            if (!isInitialRender) {
                Column.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Image.create({ "id": 16777242, "type": 20000, params: [], "bundleName": "com.example.index_test1", "moduleName": "entry" });
            Image.debugLine("pages/MinePage.ets(61:15)");
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
            // Text(`123`)
            //   .textAlign(TextAlign.Center)
            //   .fontWeight(CommonConstants.NICKNAME_FONT_WEIGHT)
            //   .fontSize('20vp')
            //   .margin({ top: '12vp' })
            Text.create(`${this.connect_data}`);
            Text.debugLine("pages/MinePage.ets(70:15)");
            // Text(`123`)
            //   .textAlign(TextAlign.Center)
            //   .fontWeight(CommonConstants.NICKNAME_FONT_WEIGHT)
            //   .fontSize('20vp')
            //   .margin({ top: '12vp' })
            Text.textAlign(TextAlign.Center);
            // Text(`123`)
            //   .textAlign(TextAlign.Center)
            //   .fontWeight(CommonConstants.NICKNAME_FONT_WEIGHT)
            //   .fontSize('20vp')
            //   .margin({ top: '12vp' })
            Text.fontWeight(CommonConstants.NICKNAME_FONT_WEIGHT);
            // Text(`123`)
            //   .textAlign(TextAlign.Center)
            //   .fontWeight(CommonConstants.NICKNAME_FONT_WEIGHT)
            //   .fontSize('20vp')
            //   .margin({ top: '12vp' })
            Text.fontSize('20vp');
            // Text(`123`)
            //   .textAlign(TextAlign.Center)
            //   .fontWeight(CommonConstants.NICKNAME_FONT_WEIGHT)
            //   .fontSize('20vp')
            //   .margin({ top: '12vp' })
            Text.margin({ top: '12vp' });
            if (!isInitialRender) {
                // Text(`123`)
                //   .textAlign(TextAlign.Center)
                //   .fontWeight(CommonConstants.NICKNAME_FONT_WEIGHT)
                //   .fontSize('20vp')
                //   .margin({ top: '12vp' })
                Text.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        // Text(`123`)
        //   .textAlign(TextAlign.Center)
        //   .fontWeight(CommonConstants.NICKNAME_FONT_WEIGHT)
        //   .fontSize('20vp')
        //   .margin({ top: '12vp' })
        Text.pop();
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            // MinePageContentComponent()
            Button.createWithLabel({ "id": 16777229, "type": 10003, params: [], "bundleName": "com.example.index_test1", "moduleName": "entry" });
            Button.debugLine("pages/MinePage.ets(77:15)");
            // MinePageContentComponent()
            Button.height('40vp');
            // MinePageContentComponent()
            Button.borderRadius('20vp');
            // MinePageContentComponent()
            Button.fontSize('16vp');
            // MinePageContentComponent()
            Button.margin({ top: '12vp' });
            // MinePageContentComponent()
            Button.onClick(async () => {
                // this.login_internet()
            });
            if (!isInitialRender) {
                // MinePageContentComponent()
                Button.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        // MinePageContentComponent()
        Button.pop();
        Column.pop();
        GridCol.pop();
        GridRow.pop();
        // this.Title()
        Scroll.pop();
        Column.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
}
ViewStackProcessor.StartGetAccessRecordingFor(ViewStackProcessor.AllocateNewElmetIdForNextComponent());
loadDocument(new MinePage(undefined, {}));
ViewStackProcessor.StopGetAccessRecording();
//# sourceMappingURL=MinePage.js.map