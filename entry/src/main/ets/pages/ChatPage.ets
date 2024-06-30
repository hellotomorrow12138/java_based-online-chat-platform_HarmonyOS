import webSocket from '@ohos.net.webSocket';
import PreferenceUtil from '../model/PerferencesUtil';
import router from '@ohos.router';
import {room} from '../api/get_room'
import promptAction from '@ohos.promptAction'

class UserModel {
  constructor(public username: string, public roomId: string) {}
}
@Entry
@Component
struct ChatPage {
  @Provide login_user: string = '';
  @Provide select_room: string = '1';
  @State room: any[] = [];
  @State msg: string = "";
  @State chatRecords: Array<{
    _id: string,
    message: string
  }> = [];
  private ws: any;
  private currentUser: UserModel | null = null; // 初始化为null，待设置
  async aboutToAppear() {
    try {
      this.login_user = await PreferenceUtil.getPreferenceUtilValue('MyData', 'indexLogin', '未登录') as string;
      if (this.login_user !== '未登录') {
        this.currentUser = new UserModel(this.login_user, '1'); // 确保login_user有效时再初始化
        if (this.currentUser) {
          this.ws = webSocket.createWebSocket();
          this.ws.connect(`ws://192.168.2.64:8080/socket/${this.currentUser.username}/${this.currentUser.roomId}`);
          this.setupWebSocketHandlers();
        }
      } else {
        promptAction.showToast({
          message: '用户未登录',
          duration: 3000,
        });
        router.pushUrl({ url: "pages/LoginPage"})
      }
    } catch (error) {
      promptAction.showToast({
        message: '发生错误'+error,
        duration: 3000,
      });
    }
    await room({
    }).then((res)=>{
      // console.log("room: "+JSON.stringify(res.data))
      this.room = res.data;
    }).catch((err)=>{
      console.log(JSON.stringify(err))
    })
  }
  private setupWebSocketHandlers() {
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
        } catch (error) {
          console.error("接收消息出错:", error);
        }
      } else {
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
  private closeWebSocket() {
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
  build() {
    Navigation() {
      Column() {
        this.Title()
        Row() {
        ForEach(this.room, (room) => {
          Button(`${room.room_name}`)
            .height(30)
            .width("auto")
            .fontSize(12)
            .onClick( () => {
              this.closeWebSocket();
              this.currentUser = new UserModel(this.login_user, room.id); // 确保login_user有效时再初始化
              if (this.currentUser!==null){
                this.ws = webSocket.createWebSocket();
                this.ws.connect(`ws://192.168.2.64:8080/socket/${this.login_user}/${this.currentUser.roomId}`);
                // console.log(`${this.login_user}+${this.currentUser.roomId}`);
                this.setupWebSocketHandlers();
              }
            })
        })
      }
        Column() {
          List() {
            ForEach(this.chatRecords, (item) => {
              ListItem() {
                Row() {
                  Text(`${item._id} : `).fontSize(14).fontColor('#333')
                  Text(item.message).padding({ top: 5, bottom: 5 })
                }
              }
            })
          }.height('95%')
          Row() {
            TextInput({ placeholder: "请输入您想要发送的内容", text: this.msg })
              .width("80%")
              .height("7%")
              .onChange((e) => {
                this.msg = e
              })
            Button("发送")
              .height(50)
              .width(70)
              .onClick(() => {
                this.sendData()
              })
          }
        }.height('100%')
      }.height('100%')
      .margin({"top":"-100.00vp"})
    }
  }
  @Builder Title() {
    Row() {
      Image($r('app.media.ic_back'))
        .width('10%')
        .height('20vp')
        .onClick(() => {
          this.closeWebSocket();
          router.back();
        })
      Text("文章页面")
        .fontSize('20vp')
        .fontColor('#182431')
    }
    .width('100%')
  }
}