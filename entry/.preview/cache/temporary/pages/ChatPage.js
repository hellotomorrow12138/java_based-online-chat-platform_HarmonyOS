import webSocket from '@ohos:net.webSocket';
import PreferenceUtil from '@bundle:com.example.index_test1/entry/ets/model/PerferencesUtil';
// import { CommonConstants } from '@bundle:com.example.index_test1/entry/ets/common/constants/CommonConstants';
import router from '@ohos:router';
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
        this.__msg.purgeDependencyOnElmtId(rmElmtId);
        this.__chatRecords.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__login_user.aboutToBeDeleted();
        this.__select_room.aboutToBeDeleted();
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
            // this.select_room = await PreferenceUtil.getPreferenceUtilValue('MyData2', 'joinRoom', '1') as string;
            if (this.login_user !== '未登录') {
                this.currentUser = new UserModel(this.login_user, '1'); // 确保login_user有效时再初始化
                // this.initWebSocket(); // 调用初始化WebSocket的方法
                if (this.currentUser) {
                    this.ws = webSocket.createWebSocket();
                    this.ws.connect(`ws://192.168.2.112:8080/socket/${this.currentUser.username}/${this.currentUser.roomId}`);
                    this.setupWebSocketHandlers();
                }
            }
            else {
                console.error("User is not logged in.");
            }
        }
        catch (error) {
            console.error("Error fetching user preference:", error);
        }
    }
    // private initWebSocket() {
    //   if (this.currentUser) {
    //     this.ws = webSocket.createWebSocket();
    //     this.ws.connect(`ws://192.168.2.112:8080/socket/${this.currentUser.username}/${this.currentUser.roomId}`);
    //     this.setupWebSocketHandlers();
    //   }
    // }
    initWebSocket_2() {
        this.currentUser = new UserModel(this.login_user, '2'); // 确保login_user有效时再初始化
        if (this.currentUser) {
            this.ws = webSocket.createWebSocket();
            this.ws.connect(`ws://192.168.2.112:8080/socket/${this.currentUser.username}/${this.currentUser.roomId}`);
            this.setupWebSocketHandlers();
        }
    }
    setupWebSocketHandlers() {
        this.ws.on("open", (err, value) => {
            if (!err) {
                console.log("WebSocket连接成功！");
            }
        });
        this.ws.on("message", (err, value) => {
            if (!err) {
                try {
                    const receivedData = JSON.parse(value);
                    if ("msg" in receivedData && "name" in receivedData && "roomId" in receivedData) {
                        const newMessage = {
                            _id: receivedData.name,
                            message: receivedData.msg,
                        };
                        this.chatRecords.push(newMessage);
                    }
                    else {
                        console.log("Received unexpected message format:", receivedData);
                    }
                }
                catch (error) {
                    console.error("Error parsing received message:", error);
                }
            }
            else {
                console.error("Error receiving message:", err);
            }
        });
        this.ws.on("close", (err, value) => {
            if (!err) {
                console.log("WebSocket连接已关闭");
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
            this.sendWebSocketMessage(postData);
            this.msg = ""; // 发送后清空输入框
            // this.closeWebSocket(); // 添加这行来断开连接
        }
    }
    sendWebSocketMessage(data) {
        if (this.ws && this.ws.readyState === this.ws.OPEN) {
            this.ws.send(JSON.stringify(data));
        }
        else {
            console.error("WebSocket is not open to send message.");
        }
    }
    initialRender() {
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Navigation.create();
            Navigation.debugLine("pages/ChatPage.ets(124:5)");
            if (!isInitialRender) {
                Navigation.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Column.create();
            Column.debugLine("pages/ChatPage.ets(125:7)");
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
            Row.debugLine("pages/ChatPage.ets(127:9)");
            Row.height('auto');
            if (!isInitialRender) {
                Row.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Button.createWithLabel("AMD研讨会");
            Button.debugLine("pages/ChatPage.ets(128:11)");
            Button.height(50);
            Button.width(70);
            Button.width(124);
            Button.fontSize(15);
            Button.onClick(() => {
                this.closeWebSocket();
                this.initWebSocket_2(); // 发送加入房间1的请求
            });
            if (!isInitialRender) {
                Button.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        Button.pop();
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Button.createWithLabel("INTEL研讨会");
            Button.debugLine("pages/ChatPage.ets(138:11)");
            Button.height(50);
            Button.width(70);
            Button.width(124);
            Button.fontSize(15);
            Button.onClick(() => {
                this.closeWebSocket();
                this.initWebSocket_2(); // 发送加入房间1的请求
            });
            if (!isInitialRender) {
                Button.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        Button.pop();
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Button.createWithLabel("NVIDA研讨会");
            Button.debugLine("pages/ChatPage.ets(148:11)");
            Button.height(50);
            Button.width(70);
            Button.width(124);
            Button.fontSize(15);
            Button.onClick(() => {
                this.closeWebSocket();
                this.initWebSocket_2(); // 发送加入房间1的请求
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
            Column.create();
            Column.debugLine("pages/ChatPage.ets(159:9)");
            Column.height('100%');
            if (!isInitialRender) {
                Column.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            List.create();
            List.debugLine("pages/ChatPage.ets(160:11)");
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
                        ListItem.debugLine("pages/ChatPage.ets(162:15)");
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
                            Row.debugLine("pages/ChatPage.ets(163:17)");
                            if (!isInitialRender) {
                                Row.pop();
                            }
                            ViewStackProcessor.StopGetAccessRecording();
                        });
                        this.observeComponentCreation((elmtId, isInitialRender) => {
                            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                            Text.create(`${item._id} : `);
                            Text.debugLine("pages/ChatPage.ets(164:19)");
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
                            Text.debugLine("pages/ChatPage.ets(165:19)");
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
                            Row.debugLine("pages/ChatPage.ets(163:17)");
                            if (!isInitialRender) {
                                Row.pop();
                            }
                            ViewStackProcessor.StopGetAccessRecording();
                        });
                        this.observeComponentCreation((elmtId, isInitialRender) => {
                            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                            Text.create(`${item._id} : `);
                            Text.debugLine("pages/ChatPage.ets(164:19)");
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
                            Text.debugLine("pages/ChatPage.ets(165:19)");
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
            Row.debugLine("pages/ChatPage.ets(171:11)");
            if (!isInitialRender) {
                Row.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            TextInput.create({ placeholder: "请输入您想要发送的内容", text: this.msg });
            TextInput.debugLine("pages/ChatPage.ets(172:13)");
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
            Button.debugLine("pages/ChatPage.ets(178:13)");
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
            Row.debugLine("pages/ChatPage.ets(192:5)");
            Row.width('100%');
            if (!isInitialRender) {
                Row.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Image.create({ "id": 16777221, "type": 20000, params: [], "bundleName": "com.example.index_test1", "moduleName": "entry" });
            Image.debugLine("pages/ChatPage.ets(193:7)");
            Image.width('10%');
            Image.height('20vp');
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
            Text.debugLine("pages/ChatPage.ets(199:7)");
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
