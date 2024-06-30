import router from '@ohos.router';

import { CommonConstants } from '../common/constants/CommonConstants';
import PreferenceUtil from '../model/PerferencesUtil'

@Entry
@Component
struct MinePage {
  @Provide login_user: string = '';
  @State categoryTabIndex: number = 1;

  normalIcon: Resource = $r("app.media.icon")
  @State current: number = 1
  @State arr: Array<{ index: number, name: string,index_name:String }> = [
    { index: 1, name: 'ArticlePage',index_name:'文章' },
    { index: 2, name: 'ChatPage',index_name:'聊天房' },
    { index: 3, name: 'StorePage',index_name:'商店' },
  ];
  scroller: Scroller;
  async aboutToAppear(){
    this.login_user = await PreferenceUtil.getPreferenceUtilValue('MyData','indexLogin','未登录')as string
  }
  build() {
    SideBarContainer() {
      Column() {
        ForEach(this.arr, (item: { index: number, name: string,index_name:string }) => {
          Column() {
            Image(this.current === item.index ? `listImage/${item.name}.png` : `listImage/${item.name}.png`).width(64).height(64)
            Text(item.index_name) // 直接使用页面名称
              .fontSize(25)
              .fontColor(this.current === item.index ? '#0A59F7' : '#999')
              .fontFamily('source-sans-pro,cursive,sans-serif')
          }
          .onClick(() => {
            this.current = item.index;
            // 注意：这里需要根据实际情况调整如何获取页面路径，可能需要单独维护一个路径映射表或在页面对象中包含路径信息
            router.pushUrl({ url: `pages/${item.name}`}); // 示例路径转换
          })
        }, (item: { index: number, name: string }) => item.name)
      }
      .backgroundColor('#19000000')

      Column() {

        Scroll(){
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
                sm: CommonConstants.MINE_SPAN_SM,
                md: CommonConstants.MINE_SPAN_MD,
                lg: CommonConstants.MINE_SPAN_LG
              },
              offset: {
                lg: CommonConstants.OFFSET_LG
              }
            }) {
              Column(){
                Image(`userImage/${this.login_user}.png`)
                // Image($r("app.media.ic_tab_activated"))
                  .width('56vp')
                  .height('56vp')
                  .objectFit(ImageFit.Contain)
                Text(`${this.login_user}`)
                  .textAlign(TextAlign.Center)
                  .fontWeight(CommonConstants.NICKNAME_FONT_WEIGHT)
                  .fontSize('20vp')
                  .margin({ top: '12vp' })
                Text(`您已登录`)
                  .textAlign(TextAlign.Center)
                  .fontWeight(CommonConstants.NICKNAME_FONT_WEIGHT)
                  .fontSize('20vp')
                  .margin({ top: '12vp' })
              }
            }
          }
          .margin({
            left: '12vp',
            right: '12vp'
          })
        }
        .margin({ top: '4vp' })
      }
    }
    // .alignItems(HorizontalAlign.Center)
    .backgroundColor('#f1f3f5')
  }

}