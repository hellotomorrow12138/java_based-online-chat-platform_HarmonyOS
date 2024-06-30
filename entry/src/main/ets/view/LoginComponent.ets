import router from '@ohos.router';
import { CommonConstants } from '../common/constants/CommonConstants';
import {Login} from '../api/post_login'
import {Register} from '../api/post_register'
import {MD5} from '../model/MD5'
import PreferenceUtil from '../model/PerferencesUtil'
import promptAction from '@ohos.promptAction'
// 登录页面组件。
@Component
export struct LoginComponent {

  @StorageProp('isMinHeight') isMinHeight: boolean = false;
  @State input_userName: string = '';
  @State input_password: string = '';



  build() {
    GridRow({
      columns: {
        sm: CommonConstants.GRID_ROW_SM,
        md: CommonConstants.GRID_ROW_MD,
        lg: CommonConstants.GRID_ROW_LG
      },
      gutter: { x: CommonConstants.GUTTER_X },
      breakpoints: { value: CommonConstants.BREAK_POINT }
    }) {
      GridCol({
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
      }) {
        Column() {
          Text(`KALA`)
            .width('100%')
            .height('60vp')
            .textAlign(TextAlign.Center)
            .fontSize('60vp')
            .margin({"top":"-40.00vp","right":"0.00vp","bottom":"100.00vp","left":"0.00vp"})
          TextInput({ placeholder: '账号' })
            .width('100%')
            .height('48vp')
            .placeholderColor('#99182431')
            .placeholderFont({ size: '16vp' })
            .backgroundColor('#00FFFFFF')
            .fontSize('16vp')
            .padding({ left: '20vp' })
            .border({
              width: { bottom: '1vp' },
              color: '#33000000',
              radius: '0vp'
            })
            .onChange((value: string) => {
              this.input_userName = value;
            })
          TextInput({ placeholder: '密码' })
            .width(CommonConstants.TEXT_INPUT_WIDTH_PERCENT)
            .height('48vp')
            .placeholderColor('#99182403')
            .placeholderFont({ size: '16vp' })
            .fontSize('16vp')
            .backgroundColor('#00ffffff')
            .type(InputType.Password)
            .padding({ left: '20vp' })
            .border({
              width: { bottom: '1vp' },
              color: '#33000000',
              radius: '0vp'
            })
            .margin({ bottom: '28vp' })
            .onChange((value: string) => {
              this.input_password = value;
            })
        }
      }
      GridCol({
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
      }) {
        Button('点击以登录')
          .width(CommonConstants.BUTTON_WIDTH_PERCENT)
          .height('40vp')
          .borderRadius('20vp')
          .fontSize('16vp')
          .margin({ top: '12vp' })
          .fontWeight(CommonConstants.LOGIN_TEXT_FONT_WEIGHT)
          .fontColor((this.input_userName, this.input_password) ? Color.White : '#66ffffff')
          .backgroundColor((this.input_userName, this.input_password) ? '#007dff' : '#66007dff')
          .onClick(async () => {
            if (this.input_userName!='' && this.input_password!='') {
              let passwordHash = await MD5.md5(this.input_password)
              Login({
                "user_name": this.input_userName,
                "user_password": passwordHash
              }).then((res)=>{
                PreferenceUtil.putPreferenceUtilValue('MyData','indexLogin',this.input_userName)
                // console.log("res: "+JSON.stringify(res))
                router.pushUrl({ url: "pages/MinePage"})
                // console.log("headers: "+JSON.stringify(res.headers))
              }).catch((err)=>{
                console.log(JSON.stringify(err))
              })
            }else{
              // 当用户名或密码为空时，显示Toast提示
              promptAction.showToast({
                message: '请输入账号和密码',
                duration: 3000, // 显示时长，单位毫秒
              });
              return; // 阻止进一步的登录操作
            }
          })
      }
      GridCol({
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
      }) {
        Button('点击以注册')
          .width(CommonConstants.BUTTON_WIDTH_PERCENT)
          .height('40vp')
          .fontSize('16vp')
          .fontWeight(CommonConstants.BUTTON_FONT_WEIGHT)
          .borderRadius('20vp')
          .margin({ top: '12vp' })
          .fontColor('#007DFF')
          .backgroundColor('#0D000000')
          .onClick(async () => {
            if (this.input_userName!='' && this.input_password!='') {
              let passwordHash = await MD5.md5(this.input_password)
              Register({
                "user_name": this.input_userName,
                "user_password": passwordHash
              }).then((res)=>{
                PreferenceUtil.putPreferenceUtilValue('MyData','indexLogin',this.input_userName)
                router.pushUrl({ url: 'pages/RegistrationSuccessPage'})
              }).catch((err)=>{
                console.log(JSON.stringify(err))
              })
            }else{
              promptAction.showToast({
                message: '请输入账号和密码',
                duration: 3000,
              });
              return;
            }
          })
      }
    }
    .opacity(1)
    .grayscale(0)
    .padding({"top":"0.00vp","right":"0.00vp","bottom":"0.00vp","left":"0.00vp"})
    .margin({"top":"200.00vp","right":"0.00vp","bottom":"0.00vp","left":"0.00vp"})
  }
}
