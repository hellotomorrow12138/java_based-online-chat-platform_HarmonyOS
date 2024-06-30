import router from '@ohos:router';
import { CommonConstants } from '@bundle:chat.kalakala.top/entry/ets/common/constants/CommonConstants';
import { contents } from '@bundle:chat.kalakala.top/entry/ets/api/get_contents';
import { searchContents } from '@bundle:chat.kalakala.top/entry/ets/api/post_search';
import { send_inputContents } from '@bundle:chat.kalakala.top/entry/ets/api/post_sendContents';
import PreferenceUtil from '@bundle:chat.kalakala.top/entry/ets/model/PerferencesUtil';
import promptAction from '@ohos:promptAction';
class ArticlePage extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1) {
        super(parent, __localStorage, elmtId);
        this.__articles = new ObservedPropertyObjectPU([], this, "articles");
        this.__login_user = new ObservedPropertySimplePU('', this, "login_user");
        this.__add_title = new ObservedPropertySimplePU('', this, "add_title");
        this.__add_contents = new ObservedPropertySimplePU('', this, "add_contents");
        this.__input_contents = new ObservedPropertySimplePU('', this, "input_contents");
        this.setInitiallyProvidedValue(params);
    }
    setInitiallyProvidedValue(params) {
        if (params.articles !== undefined) {
            this.articles = params.articles;
        }
        if (params.login_user !== undefined) {
            this.login_user = params.login_user;
        }
        if (params.add_title !== undefined) {
            this.add_title = params.add_title;
        }
        if (params.add_contents !== undefined) {
            this.add_contents = params.add_contents;
        }
        if (params.input_contents !== undefined) {
            this.input_contents = params.input_contents;
        }
    }
    updateStateVars(params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__articles.purgeDependencyOnElmtId(rmElmtId);
        this.__login_user.purgeDependencyOnElmtId(rmElmtId);
        this.__add_title.purgeDependencyOnElmtId(rmElmtId);
        this.__add_contents.purgeDependencyOnElmtId(rmElmtId);
        this.__input_contents.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__articles.aboutToBeDeleted();
        this.__login_user.aboutToBeDeleted();
        this.__add_title.aboutToBeDeleted();
        this.__add_contents.aboutToBeDeleted();
        this.__input_contents.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    get articles() {
        return this.__articles.get();
    }
    set articles(newValue) {
        this.__articles.set(newValue);
    }
    get login_user() {
        return this.__login_user.get();
    }
    set login_user(newValue) {
        this.__login_user.set(newValue);
    }
    get add_title() {
        return this.__add_title.get();
    }
    set add_title(newValue) {
        this.__add_title.set(newValue);
    }
    get add_contents() {
        return this.__add_contents.get();
    }
    set add_contents(newValue) {
        this.__add_contents.set(newValue);
    }
    get input_contents() {
        return this.__input_contents.get();
    }
    set input_contents(newValue) {
        this.__input_contents.set(newValue);
    }
    async aboutToAppear() {
        this.login_user = await PreferenceUtil.getPreferenceUtilValue('MyData', 'indexLogin', '未登录');
        await this.loadArticles();
    }
    // 新增一个方法来加载文章列表
    async loadArticles() {
        await contents({}).then((res) => {
            console.log("data: " + JSON.stringify(res.data));
            this.articles = res.data; // 将获取到的文章数据保存到状态变量
        }).catch((err) => {
            console.log(JSON.stringify(err));
        });
    }
    initialRender() {
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Column.create();
            Column.linearGradient({
                direction: GradientDirection.Right,
                colors: [[0xc9d6ff, 0], [0xe2e2e2, 1]]
            });
            if (!isInitialRender) {
                Column.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        this.Title.bind(this)();
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Row.create();
            if (!isInitialRender) {
                Row.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Search.create({ placeholder: '模糊查询' });
            Search.width('80%');
            Search.height('48vp');
            Search.border({
                width: { bottom: '1vp' },
                color: '#33000000',
                radius: '0vp'
            });
            Search.placeholderColor('#99182403');
            Search.placeholderFont({ size: '16vp' });
            Search.textFont({ size: '16fp' });
            Search.margin({ bottom: '8vp' });
            Search.onChange((value) => {
                this.input_contents = value;
            });
            if (!isInitialRender) {
                Search.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        Search.pop();
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Button.createWithLabel('查询');
            Button.width('20%');
            Button.height('40vp');
            Button.borderRadius('20vp');
            Button.fontSize('16vp');
            Button.margin({ top: '12vp' });
            Button.fontWeight(CommonConstants.LOGIN_TEXT_FONT_WEIGHT);
            Button.onClick(async () => {
                if (this.input_contents != '') {
                    await searchContents({
                        "input_contents": this.input_contents,
                    }).then((res) => {
                        this.loadArticles(); // 新增方法来加载文章列表
                        this.articles = res.data;
                    }).catch((err) => {
                        console.log(JSON.stringify(err));
                    });
                }
                else {
                    // 当用户名或密码为空时，显示Toast提示
                    promptAction.showToast({
                        message: '不允许留空',
                        duration: 3000, // 显示时长，单位毫秒
                    });
                    return; // 阻止进一步的登录操作
                }
            });
            if (!isInitialRender) {
                Button.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        Button.pop();
        Row.pop();
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
            Column.width(CommonConstants.FULL_WIDTH_PERCENT);
            Column.height(CommonConstants.REGISTRATION_PAGE_HEIGHT_PERCENT);
            if (!isInitialRender) {
                Column.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Row.create();
            Row.border({ width: { left: 1, right: 1, top: 1, bottom: 1 } });
            if (!isInitialRender) {
                Row.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Text.create("文章id：");
            Text.fontSize(20);
            Text.fontColor("#000");
            Text.width('80vp');
            if (!isInitialRender) {
                Text.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        Text.pop();
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Text.create("文章标题：");
            Text.fontSize(20);
            Text.fontColor("#000");
            Text.width('80vp');
            if (!isInitialRender) {
                Text.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        Text.pop();
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Text.create("文章作者：");
            Text.fontSize(20);
            Text.fontColor("#000");
            Text.width('80vp');
            if (!isInitialRender) {
                Text.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        Text.pop();
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Text.create("文章内容：");
            Text.fontSize(20);
            Text.width('80vp');
            Text.fontColor("#000");
            if (!isInitialRender) {
                Text.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        Text.pop();
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Text.create("是否私有：");
            Text.fontSize(20);
            Text.fontColor("#000");
            Text.width('80vp');
            if (!isInitialRender) {
                Text.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        Text.pop();
        Row.pop();
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            ForEach.create();
            const forEachItemGenFunction = _item => {
                const article = _item;
                this.observeComponentCreation((elmtId, isInitialRender) => {
                    ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                    Row.create();
                    Row.border({ width: { left: 1, right: 1, top: 1, bottom: 1 } });
                    if (!isInitialRender) {
                        Row.pop();
                    }
                    ViewStackProcessor.StopGetAccessRecording();
                });
                this.observeComponentCreation((elmtId, isInitialRender) => {
                    ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                    Text.create(`${article.id}`);
                    Text.fontSize(20);
                    Text.fontColor("#000");
                    Text.width('80vp');
                    if (!isInitialRender) {
                        Text.pop();
                    }
                    ViewStackProcessor.StopGetAccessRecording();
                });
                Text.pop();
                this.observeComponentCreation((elmtId, isInitialRender) => {
                    var _a;
                    ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                    Text.create((_a = article.title) !== null && _a !== void 0 ? _a : '无标题');
                    Text.fontSize(20);
                    Text.fontColor("#000");
                    Text.width('80vp');
                    if (!isInitialRender) {
                        Text.pop();
                    }
                    ViewStackProcessor.StopGetAccessRecording();
                });
                Text.pop();
                this.observeComponentCreation((elmtId, isInitialRender) => {
                    var _a;
                    ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                    Text.create((_a = article.created_user) !== null && _a !== void 0 ? _a : '无作者');
                    Text.fontSize(20);
                    Text.fontColor("#000");
                    Text.width('80vp');
                    if (!isInitialRender) {
                        Text.pop();
                    }
                    ViewStackProcessor.StopGetAccessRecording();
                });
                Text.pop();
                this.observeComponentCreation((elmtId, isInitialRender) => {
                    var _a;
                    ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                    Text.create((_a = article.text) !== null && _a !== void 0 ? _a : '无内容');
                    Text.fontSize(20);
                    Text.width('80vp');
                    Text.fontColor("#000");
                    if (!isInitialRender) {
                        Text.pop();
                    }
                    ViewStackProcessor.StopGetAccessRecording();
                });
                Text.pop();
                this.observeComponentCreation((elmtId, isInitialRender) => {
                    ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                    Text.create(`${article.status}`);
                    Text.fontSize(20);
                    Text.fontColor("#000");
                    Text.width('80vp');
                    if (!isInitialRender) {
                        Text.pop();
                    }
                    ViewStackProcessor.StopGetAccessRecording();
                });
                Text.pop();
                Row.pop();
            };
            this.forEachUpdateFunction(elmtId, this.articles, forEachItemGenFunction);
            if (!isInitialRender) {
                ForEach.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        ForEach.pop();
        Column.pop();
        Scroll.pop();
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
            TextInput.create({ placeholder: '标题' });
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
                this.add_title = value;
            });
            if (!isInitialRender) {
                TextInput.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            TextInput.create({ placeholder: '内容' });
            TextInput.width(CommonConstants.TEXT_INPUT_WIDTH_PERCENT);
            TextInput.height('48vp');
            TextInput.placeholderColor('#99182403');
            TextInput.placeholderFont({ size: '16vp' });
            TextInput.fontSize('16vp');
            TextInput.backgroundColor('#00ffffff');
            TextInput.padding({ left: '20vp' });
            TextInput.border({
                width: { bottom: '1vp' },
                color: '#33000000',
                radius: '0vp'
            });
            TextInput.onChange((value) => {
                this.add_contents = value;
            });
            if (!isInitialRender) {
                TextInput.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Button.createWithLabel('提交');
            Button.width(CommonConstants.BUTTON_WIDTH_PERCENT);
            Button.height('40vp');
            Button.borderRadius('20vp');
            Button.fontSize('16vp');
            Button.margin({ top: '12vp' });
            Button.fontWeight(CommonConstants.LOGIN_TEXT_FONT_WEIGHT);
            Button.onClick(() => {
                if (this.add_title != '' && this.add_contents != '') {
                    send_inputContents({
                        "add_user": this.login_user,
                        "add_title": this.add_title,
                        "add_contents": this.add_contents
                    }).then(() => {
                        this.loadArticles(); // 新增方法来加载文章列表
                    }).catch((err) => {
                        console.log(JSON.stringify(err));
                    });
                }
                else {
                    // 当用户名或密码为空时，显示Toast提示
                    promptAction.showToast({
                        message: '不允许留空',
                        duration: 3000, // 显示时长，单位毫秒
                    });
                    return; // 阻止进一步的登录操作
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
            Text.create("文章页面");
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
loadDocument(new ArticlePage(undefined, {}));
ViewStackProcessor.StopGetAccessRecording();
//# sourceMappingURL=ArticlePage.js.map