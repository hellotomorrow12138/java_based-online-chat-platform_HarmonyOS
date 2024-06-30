import webSocket from '@ohos:net.webSocket';
import axios from '@package:pkg_modules/.ohpm/@ohos+axios@2.2.0/pkg_modules/@ohos/axios/index';
class Chat extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1) {
        super(parent, __localStorage, elmtId);
        this.__msg = new ObservedPropertySimplePU(""
        // 存储聊天记录
        , this, "msg");
        this.__chatRecords = new ObservedPropertyObjectPU([]
        // 声明一个ws,用于websocket的使用
        , this, "chatRecords");
        this.ws = undefined;
        this.setInitiallyProvidedValue(params);
    }
    setInitiallyProvidedValue(params) {
        if (params.msg !== undefined) {
            this.msg = params.msg;
        }
        if (params.chatRecords !== undefined) {
            this.chatRecords = params.chatRecords;
        }
        if (params.ws !== undefined) {
            this.ws = params.ws;
        }
    }
    updateStateVars(params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__msg.purgeDependencyOnElmtId(rmElmtId);
        this.__chatRecords.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__msg.aboutToBeDeleted();
        this.__chatRecords.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
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
        // 创建WebSocket连接
        this.ws = webSocket.createWebSocket();
        this.ws.connect("ws://192.168.2.112:8080/socket/kala/1");
        this.ws.on("open", (err, value) => {
            if (!err) {
                console.log("连接成功");
            }
        });
        this.ws.on("message", (err, value) => {
            if (!err) {
                console.log("收到消息" + value);
                this.chatRecords.push(JSON.parse(value)); // 假设服务器返回的是JSON格式的消息
            }
        });
        this.ws.on("close", (err, value) => {
            if (!err) {
                console.log("连接断开");
            }
        });
    }
    async sendData() {
        try {
            // 发送消息到服务器
            const response = await axios.post("lzx/sendMsg", { message: this.msg });
            console.log(JSON.stringify(response));
            this.chatRecords.push({ "_id": "you", message: this.msg }); // 简化处理，假设发送者ID为"you"
            this.msg = ""; // 发送后清空输入框
        }
        catch (error) {
            console.error(JSON.stringify(error));
        }
    }
    initialRender() {
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Navigation.create();
            Navigation.titleMode(NavigationTitleMode.Mini);
            if (!isInitialRender) {
                Navigation.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Column.create();
            Column.width('100%');
            Column.height('100%');
            Column.justifyContent(FlexAlign.SpaceBetween);
            if (!isInitialRender) {
                Column.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Column.create();
            Column.width("100%");
            if (!isInitialRender) {
                Column.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            List.create({ space: 10 });
            List.width("100%");
            List.height("100%");
            List.backgroundColor("#eee");
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
                            // 简化显示逻辑，不区分发送者和接收者样式
                            Row.create();
                            if (!isInitialRender) {
                                // 简化显示逻辑，不区分发送者和接收者样式
                                Row.pop();
                            }
                            ViewStackProcessor.StopGetAccessRecording();
                        });
                        this.observeComponentCreation((elmtId, isInitialRender) => {
                            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                            Text.create(`${item._id}: ${item.message}`);
                            if (!isInitialRender) {
                                Text.pop();
                            }
                            ViewStackProcessor.StopGetAccessRecording();
                        });
                        Text.pop();
                        // 简化显示逻辑，不区分发送者和接收者样式
                        Row.pop();
                        ListItem.pop();
                    };
                    const deepRenderFunction = (elmtId, isInitialRender) => {
                        itemCreation(elmtId, isInitialRender);
                        this.updateFuncByElmtId.set(elmtId, itemCreation);
                        this.observeComponentCreation((elmtId, isInitialRender) => {
                            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                            // 简化显示逻辑，不区分发送者和接收者样式
                            Row.create();
                            if (!isInitialRender) {
                                // 简化显示逻辑，不区分发送者和接收者样式
                                Row.pop();
                            }
                            ViewStackProcessor.StopGetAccessRecording();
                        });
                        this.observeComponentCreation((elmtId, isInitialRender) => {
                            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                            Text.create(`${item._id}: ${item.message}`);
                            if (!isInitialRender) {
                                Text.pop();
                            }
                            ViewStackProcessor.StopGetAccessRecording();
                        });
                        Text.pop();
                        // 简化显示逻辑，不区分发送者和接收者样式
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
        Column.pop();
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Row.create();
            Row.width("100%");
            if (!isInitialRender) {
                Row.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            TextInput.create({ placeholder: "请输入您想要发送的内容", text: this.msg });
            TextInput.width("80%");
            TextInput.height(50);
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
        Navigation.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
}
ViewStackProcessor.StartGetAccessRecordingFor(ViewStackProcessor.AllocateNewElmetIdForNextComponent());
loadDocument(new Chat(undefined, {}));
ViewStackProcessor.StopGetAccessRecording();
//# sourceMappingURL=Chat.js.map