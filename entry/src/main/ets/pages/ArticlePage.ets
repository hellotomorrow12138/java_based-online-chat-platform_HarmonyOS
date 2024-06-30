import router from '@ohos.router';
import { CommonConstants } from '../common/constants/CommonConstants';
import { contents } from '../api/get_contents';
import { searchContents } from '../api/post_search';
import {send_inputContents} from '../api/post_sendContents'
import PreferenceUtil from '../model/PerferencesUtil'
import promptAction from '@ohos.promptAction'

@Entry
@Component
struct ArticlePage {
  @State articles: any[] = []; // 新增状态来保存文章数据
  @State login_user: string = '';
  @State add_title: string = '';
  @State add_contents: string = '';
  @State input_contents: string = '';
  async aboutToAppear(){
    this.login_user = await PreferenceUtil.getPreferenceUtilValue('MyData','indexLogin','未登录')as string
    await this.loadArticles();
  }
  // 新增一个方法来加载文章列表
  async loadArticles() {
    await contents({
    }).then((res)=>{
      console.log("data: "+JSON.stringify(res.data))
      this.articles = res.data; // 将获取到的文章数据保存到状态变量
    }).catch((err)=>{
      console.log(JSON.stringify(err))
    })
  }
  build() {
    Column() {
      this.Title()
      Row(){
        Search({ placeholder: '模糊查询' })
          .width('80%')
          .height('48vp')
          .border({
            width: { bottom: '1vp' },
            color: '#33000000',
            radius: '0vp'
          })
          .placeholderColor('#99182403')
          .placeholderFont({ size: '16vp' })
          .textFont({ size: '16fp' })
          .margin({ bottom: '8vp' })
          .onChange((value: string) => {
            this.input_contents = value;
          })
        Button('查询')
          .width('20%')
          .height('40vp')
          .borderRadius('20vp')
          .fontSize('16vp')
          .margin({ top: '12vp' })
          .fontWeight(CommonConstants.LOGIN_TEXT_FONT_WEIGHT)
          .onClick(async () => {
            if (this.input_contents!='') {
              await searchContents({
                "input_contents": this.input_contents,
              }).then((res) => {
                this.loadArticles(); // 新增方法来加载文章列表
                this.articles = res.data;
              }).catch((err) => {
                console.log(JSON.stringify(err))
              })
            }else{
              // 当用户名或密码为空时，显示Toast提示
              promptAction.showToast({
                message: '不允许留空',
                duration: 3000, // 显示时长，单位毫秒
              });
              return; // 阻止进一步的登录操作
            }
          })
      }
      Scroll() {
        Column() {
          Row() {
            Text("文章id：") // 假设每篇文章有title字段
              .fontSize(20) // 使用定义好的字号
              .fontColor("#000")
              .width('80vp') // 同上
            Text("文章标题：") // 假设每篇文章有title字段
              .fontSize(20) // 使用定义好的字号
              .fontColor("#000")
              .width('80vp')
            Text("文章作者：") // 假设每篇文章有title字段
              .fontSize(20) // 使用定义好的字号
              .fontColor("#000")
              .width('80vp')
            Text("文章内容：") // 假设每篇文章有content字段
              .fontSize(20)
              .width('80vp')
              .fontColor("#000")
            Text("是否私有：") // 假设每篇文章有title字段
              .fontSize(20) // 使用定义好的字号
              .fontColor("#000")
              .width('80vp')
          }
          .border({ width: { left:1, right:1, top:1, bottom:1 }})
          ForEach(this.articles, (article) => {
            Row() {
              Text(`${ article.id }`) // 假设每篇文章有title字段
                .fontSize(20) // 使用定义好的字号
                .fontColor("#000")
                .width('80vp') // 同上
              Text(article.title ?? '无标题') // 假设每篇文章有title字段
                .fontSize(20) // 使用定义好的字号
                .fontColor("#000")
                .width('80vp')
              Text(article.created_user ?? '无作者') // 假设每篇文章有title字段
                .fontSize(20) // 使用定义好的字号
                .fontColor("#000")
                .width('80vp')
              Text(article.text ?? '无内容') // 假设每篇文章有content字段
                .fontSize(20)
                .width('80vp')
                .fontColor("#000")
              Text(`${ article.status }`) // 假设每篇文章有title字段
                .fontSize(20) // 使用定义好的字号
                .fontColor("#000")
                .width('80vp')
            }
            .border({ width: { left:1, right:1, top:1, bottom:1 }})
          })
        }
        .width(CommonConstants.FULL_WIDTH_PERCENT)
        .height(CommonConstants.REGISTRATION_PAGE_HEIGHT_PERCENT)
        // .justifyContent(FlexAlign.Center)
      }
      .layoutWeight(CommonConstants.SCROLL_LAYOUT_WEIGHT)
      Column(){
        TextInput({ placeholder: '标题' })
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
            this.add_title = value;
          })
        TextInput({ placeholder: '内容' })
          .width(CommonConstants.TEXT_INPUT_WIDTH_PERCENT)
          .height('48vp')
          .placeholderColor('#99182403')
          .placeholderFont({ size: '16vp' })
          .fontSize('16vp')
          .backgroundColor('#00ffffff')
          .padding({ left: '20vp' })
          .border({
            width: { bottom: '1vp' },
            color: '#33000000',
            radius: '0vp'
          })
          .onChange((value: string) => {
            this.add_contents = value;
          })
        Button('提交')
          .width(CommonConstants.BUTTON_WIDTH_PERCENT)
          .height('40vp')
          .borderRadius('20vp')
          .fontSize('16vp')
          .margin({ top: '12vp' })
          .fontWeight(CommonConstants.LOGIN_TEXT_FONT_WEIGHT)
          .onClick(() => {
            if (this.add_title!='' && this.add_contents!='') {
              send_inputContents({
                "add_user": this.login_user,
                "add_title": this.add_title,
                "add_contents": this.add_contents
              }).then(() => {
                this.loadArticles(); // 新增方法来加载文章列表
              }).catch((err) => {
                console.log(JSON.stringify(err))
              })
            }else{
              // 当用户名或密码为空时，显示Toast提示
              promptAction.showToast({
                message: '不允许留空',
                duration: 3000, // 显示时长，单位毫秒
              });
              return; // 阻止进一步的登录操作
            }
          })
      }
    }
    .linearGradient({
      direction: GradientDirection.Right,
      colors: [[0xc9d6ff, 0], [0xe2e2e2, 1]]
    })
  }
  @Builder Title() {
    Row() {
      Image($r('app.media.ic_back'))
        .width($r('app.float.image_size'))
        .height($r('app.float.image_size'))
        .margin({
          left: $r('app.float.image_margin_left'),
          right: $r('app.float.image_margin_right')
        })
        .onClick(() => {
          router.back();
        })
      Text("文章页面")
        .fontSize($r('app.float.title_text_size'))
        .fontColor($r('app.color.title'))
        .fontWeight(CommonConstants.TITLE_FONT_WEIGHT)
    }
    .width(CommonConstants.FULL_WIDTH_PERCENT)
    .height($r('app.float.title_height'))
  }
}