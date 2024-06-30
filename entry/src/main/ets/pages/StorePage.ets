import router from '@ohos.router';
import { CommonConstants } from '../common/constants/CommonConstants';
import { store } from '../api/get_store';
import promptAction from '@ohos.promptAction'
import { get_sendStore } from '../api/get_sendStore';
import PreferenceUtil from '../model/PerferencesUtil'
import { get_likeStore } from '../api/get_likeStore';

@Entry
@Component
struct StorePage {
  @State store: any[] = []; // 新增状态来保存文章数据
  @State likeStore: any[] = [];
  @State selectedItemId: number = 0;
  @Provide login_user: string = '';
  async aboutToAppear(){
    this.login_user = await PreferenceUtil.getPreferenceUtilValue('MyData','indexLogin','未登录')as string
    await store({
    }).then((res)=>{
      console.log("data: "+JSON.stringify(res.data))
      this.store = res.data;
    }).catch((err)=>{
      console.log(JSON.stringify(err))
    })

    await get_likeStore({
      "login_user": this.login_user
    }).then((res)=>{
      console.log("get_likeStore data: "+JSON.stringify(res.data))
      this.likeStore = res.data;
    }).catch((err)=>{
      console.log("get_likeStore error: "+JSON.stringify(err))
    })

  }
  build() {
    Column() {
      this.Title()
        ForEach(this.likeStore, (likeStore) => {
          Column() {
            Text("收藏的商品为：")
              .fontSize(20)
              .fontColor("#000")
              .width('100vp')
            Text(` ${likeStore.goods_name ?? '无商品名'} `) // 假设每篇文章有title字段
              .fontSize(20) // 使用定义好的字号
              .fontColor("#000")
              .width('100vp')
            Text(` ${likeStore.goods_sell ?? '无价格'}`) // 假设每篇文章有title字段
              .fontSize(20) // 使用定义好的字号
              .fontColor("#000")
              .width('100vp')
          }
          .border({ width: { left:1, right:1, top:1, bottom:1 }})
        })
        Column() {
          Row() {
            Text("选择：")
              .fontSize(20)
              .fontColor("#000")
              .width('100vp')
              .margin({"top":"5.00vp"})
            Text("商品id：")
              .fontSize(20)
              .fontColor("#000")
              .width('100vp')
            Text("商品名：")
              .fontSize(20)
              .fontColor("#000")
              .width('100vp')
            Text("商品价格：")
              .fontSize(20)
              .fontColor("#000")
              .width('100vp')
          }
          .border({ width: { left:1, right:1, top:1, bottom:1 }})
          .width('100%')

            ForEach(this.store, (store) => {
              Row() {
                Radio({ value: store.id, group: 'radioGroup' })
                  .width('20vp')
                  .onChange(async(isChecked: boolean) => {
                    if(isChecked) {
                      this.selectedItemId = store.id;
                    }
                  })
                Text(` `) // 假设每篇文章有title字段
                  .fontSize(20) // 使用定义好的字号
                  .fontColor("#000")
                  .width('100vp') // 同上
                Text(`${ store.id } `) // 假设每篇文章有title字段
                  .fontSize(20) // 使用定义好的字号
                  .fontColor("#000")
                  .width('100vp') // 同上
                Text(` ${store.goods_name ?? '无商品名'} `) // 假设每篇文章有title字段
                  .fontSize(20) // 使用定义好的字号
                  .fontColor("#000")
                  .width('100vp')
                Text(` ${store.goods_sell ?? '无价格'}`) // 假设每篇文章有title字段
                  .fontSize(20) // 使用定义好的字号
                  .fontColor("#000")
                  .width('100vp')
              }
              .border({ width: { left:1, right:1, top:1, bottom:1 }})
            })


        }
        .width('100%')
        .height('70%')
        // .justifyContent(FlexAlign.Center)
        Column() {
          Button("点击收藏")
            .height('30%')
            .width('100%')
            .onClick(async () => {
              if (this.selectedItemId) {
                await get_sendStore({
                  "selectedItemId": this.selectedItemId,
                  "login_user": this.login_user
                }).then((res) => {
                  console.log("data: " + JSON.stringify(res.data))
                }).catch((err) => {
                  console.log(JSON.stringify(err))
                })
              } else {
                promptAction.showToast({
                  message: '没有选择',
                  duration: 3000, // 显示时长，单位毫秒
                });
              }
            })
        }
      .layoutWeight(CommonConstants.SCROLL_LAYOUT_WEIGHT)
    }
    .linearGradient({
      direction: GradientDirection.Right,
      colors: [[0xa1ffce, 0], [0xfaffd1, 1]]
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
      Text("商店页面")
        .fontSize($r('app.float.title_text_size'))
        .fontColor($r('app.color.title'))
        .fontWeight(CommonConstants.TITLE_FONT_WEIGHT)
    }
    .width(CommonConstants.FULL_WIDTH_PERCENT)
    .height($r('app.float.title_height'))
  }
}