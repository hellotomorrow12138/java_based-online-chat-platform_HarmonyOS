import webSocket from '@ohos:net.webSocket';
import PreferenceUtil from '@bundle:chat.kalakala.top/entry/ets/model/PerferencesUtil';
import router from '@ohos:router';
import { room } from '@bundle:chat.kalakala.top/entry/ets/api/get_room';
import promptAction from '@ohos:promptAction';
class UserModel {
    constructor(username, roomId) {
        this.username = username;
        this.roomId = roomId;
    }
}
class ChatPage extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1) {
        super(parent, __localStorage, elmtId);
        this.__login_user = new ObservedPropertySimplePU('', this, "login_user");
        this.addProvidedVar("login_user", this.__login_user);
        this.__select_room = new ObservedPropertySimplePU('1', this, "select_room");
        this.addProvidedVar("select_room", this.__select_room);
        this.__room = new ObservedPropertyObjectPU([], this, "room");
        this.__msg = new ObservedPropertySimplePU("", this, "msg");
        this.__chatRecords = new ObservedPropertyObjectPU([], this, "chatRecords");
        this.ws = undefined;
        this.currentUser = null;
        this.setInitiallyProvidedValue(params);
    }
    setInitiallyProvidedValue(params) {
        if (params.login_user !== undefined) {
            this.login_user = params.login_user;
        }
        if (params.select_room !== undefined) {
            this.select_room = params.select_room;
        }
        if (params.room !== undefined) {
            this.room = params.room;
        }
        if (params.msg !== undefined) {
            this.msg = params.msg;
        }
        if (params.chatRecords !== undefined) {
            this.chatRecords = params.chatRecords;
        }
        if (params.ws !== undefined) {
            this.ws = params.ws;
        }
        if (params.currentUser !== undefined) {
            this.currentUser = params.currentUser;
        }
    }
    updateStateVars(params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__room.purgeDependencyOnElmtId(rmElmtId);
        this.__msg.purgeDependencyOnElmtId(rmElmtId);
        this.__chatRecords.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__login_user.aboutToBeDeleted();
        this.__select_room.aboutToBeDeleted();
        this.__room.aboutToBeDeleted();
        this.__msg.aboutToBeDeleted();
        this.__chatRecords.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    get login_user() {
        return this.__login_user.get();
    }
    set login_user(newValue) {
        this.__login_user.set(newValue);
    }
    get select_room() {
        return this.__select_room.get();
    }
    set select_room(newValue) {
        this.__select_room.set(newValue);
    }
    get room() {
        return this.__room.get();
    }
    set room(newValue) {
        this.__room.set(newValue);
    }
    get msg() {
        return this.__msg.get();
    }
    set msg(newValue) {
        this.__msg.set(newValue);
    }
    get chatRecords() {
        return this.__chatRecords.get();
    }
    set chatRecords(newValue) {
        this.__chatRecords.set(newValue);
    }
    async aboutToAppear() {
        try {
            this.login_user = await PreferenceUtil.getPreferenceUtilValue('MyData', 'indexLogin', '未登录');
            if (this.login_user !== '未登录') {
                this.currentUser = new UserModel(this.login_user, '1'); // 确保login_user有效时再初始化
                if (this.currentUser) {
                    this.ws = webSocket.createWebSocket();
                    this.ws.connect(`ws://192.168.2.64:8080/socket/${this.currentUser.username}/${this.currentUser.roomId}`);
                    this.setupWebSocketHandlers();
                }
            }
            else {
                promptAction.showToast({
                    message: '用户未登录',
                    duration: 3000,
                });
                router.pushUrl({ url: "pages/LoginPage" });
            }
        }
        catch (error) {
            promptAction.showToast({
                message: '发生错误' + error,
                duration: 3000,
            });
        }
        await room({}).then((res) => {
            // console.log("room: "+JSON.stringify(res.data))
            this.room = res.data;
        }).catch((err) => {
            console.log(JSON.stringify(err));
        });
    }
    setupWebSocketHandlers() {
        // this.ws.on("open", (err, value) => {});
        this.ws.on("message", (err, value) => {
            if (!err) {
                try {
                    const receivedData = JSON.parse(value);
                    if ("msg" in receivedData && "name" in receivedData && "roomId" in receivedData) {
                        //此处是为了不乱发消息
                        const newMessage = {
                            _id: receivedData.name,
                            message: receivedData.msg,
                        };
                        this.chatRecords.push(newMessage);
                    }
                }
                catch (error) {
                    console.error("接收消息出错:", error);
                }
            }
            else {
                console.error("接收消息出错:", err);
            }
        });
        this.ws.on("close", (err) => {
            if (!err) {
                promptAction.showToast({
                    message: 'WebSocket连接已关闭',
                    duration: 3000,
                });
            }
        });
    }
    // 添加此方法来断开WebSocket连接
    closeWebSocket() {
        if (this.ws && this.ws.readyState === this.ws.OPEN) {
            this.ws.close();
        }
        this.ws = null; // 清空ws实例
        this.chatRecords = []; // 清空聊天记录，准备显示新房间的聊天信息
    }
    async sendData() {
        if (this.msg.trim() !== "" && this.currentUser) {
            const postData = {
                msg: this.msg,
                name: this.currentUser.username,
                roomId: this.currentUser.roomId,
            };
            this.ws.send(JSON.stringify(postData));
            this.msg = ""; // 发送后清空输入框
        }
    }
    initialRender() {
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Navigation.create();
            if (!isInitialRender) {
                Navigation.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Column.create();
            Column.height('100%');
            Column.margin({ "top": "-100.00vp" });
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
            ForEach.create();
            const forEachItemGenFunction = _item => {
                const room = _item;
                this.observeComponentCreation((elmtId, isInitialRender) => {
                    ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                    Button.createWithLabel(`${room.room_name}`);
                    Button.height(30);
                    Button.width("auto");
                    Button.fontSize(12);
                    Button.onClick(() => {
                        this.closeWebSocket();
                        this.currentUser = new UserModel(this.login_user, room.id); // 确保login_user有效时再初始化
                        if (this.currentUser !== null) {
                            this.ws = webSocket.createWebSocket();
                            this.ws.connect(`ws://192.168.2.64:8080/socket/${this.login_user}/${this.currentUser.roomId}`);
                            // console.log(`${this.login_user}+${this.currentUser.roomId}`);
                            this.setupWebSocketHandlers();
                        }
                    });
                    if (!isInitialRender) {
                        Button.pop();
                    }
                    ViewStackProcessor.StopGetAccessRecording();
                });
                Button.pop();
            };
            this.forEachUpdateFunction(elmtId, this.room, forEachItemGenFunction);
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
            Column.height('100%');
            if (!isInitialRender) {
                Column.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            List.create();
            List.height('95%');
            if (!isInitialRender) {
                List.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            ForEach.create();
            const forEachItemGenFunction = _item => {
                const item = _item;
                {
                    const isLazyCreate = true;
                    const itemCreation = (elmtId, isInitialRender) => {
                        ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                        ListItem.create(deepRenderFunction, isLazyCreate);
                        if (!isInitialRender) {
                            ListItem.pop();
                        }
                        ViewStackProcessor.StopGetAccessRecording();
                    };
                    const observedShallowRender = () => {
                        this.observeComponentCreation(itemCreation);
                        ListItem.pop();
                    };
                    const observedDeepRender = () => {
                        this.observeComponentCreation(itemCreation);
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
                            Text.create(`${item._id} : `);
                            Text.fontSize(14);
                            Text.fontColor('#333');
                            if (!isInitialRender) {
                                Text.pop();
                            }
                            ViewStackProcessor.StopGetAccessRecording();
                        });
                        Text.pop();
                        this.observeComponentCreation((elmtId, isInitialRender) => {
                            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                            Text.create(item.message);
                            Text.padding({ top: 5, bottom: 5 });
                            if (!isInitialRender) {
                                Text.pop();
                            }
                            ViewStackProcessor.StopGetAccessRecording();
                        });
                        Text.pop();
                        Row.pop();
                        ListItem.pop();
                    };
                    const deepRenderFunction = (elmtId, isInitialRender) => {
                        itemCreation(elmtId, isInitialRender);
                        this.updateFuncByElmtId.set(elmtId, itemCreation);
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
                            Text.create(`${item._id} : `);
                            Text.fontSize(14);
                            Text.fontColor('#333');
                            if (!isInitialRender) {
                                Text.pop();
                            }
                            ViewStackProcessor.StopGetAccessRecording();
                        });
                        Text.pop();
                        this.observeComponentCreation((elmtId, isInitialRender) => {
                            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                            Text.create(item.message);
                            Text.padding({ top: 5, bottom: 5 });
                            if (!isInitialRender) {
                                Text.pop();
                            }
                            ViewStackProcessor.StopGetAccessRecording();
                        });
                        Text.pop();
                        Row.pop();
                        ListItem.pop();
                    };
                    if (isLazyCreate) {
                        observedShallowRender();
                    }
                    else {
                        observedDeepRender();
                    }
                }
            };
            this.forEachUpdateFunction(elmtId, this.chatRecords, forEachItemGenFunction);
            if (!isInitialRender) {
                ForEach.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        ForEach.pop();
        List.pop();
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
            TextInput.create({ placeholder: "请输入您想要发送的内容", text: this.msg });
            TextInput.width("80%");
            TextInput.height("7%");
            TextInput.onChange((e) => {
                this.msg = e;
            });
            if (!isInitialRender) {
                TextInput.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Button.createWithLabel("发送");
            Button.height(50);
            Button.width(70);
            Button.onClick(() => {
                this.sendData();
            });
            if (!isInitialRender) {
                Button.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        Button.pop();
        Row.pop();
        Column.pop();
        Column.pop();
        Navigation.pop();
    }
    Title(parent = null) {
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Row.create();
            Row.width('100%');
            if (!isInitialRender) {
                Row.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Image.create({ "id": 16777323, "type": 20000, params: [], "bundleName": "chat.kalakala.top", "moduleName": "entry" });
            Image.width('10%');
            Image.height('20vp');
            Image.onClick(() => {
                this.closeWebSocket();
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
            Text.fontSize('20vp');
            Text.fontColor('#182431');
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
loadDocument(new ChatPage(undefined, {}));
ViewStackProcessor.StopGetAccessRecording();
//# sourceMappingURL=ChatPage.js.map