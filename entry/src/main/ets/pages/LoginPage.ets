import MediaQueryModel from '../model/MediaQueryModel';
import { CommonConstants } from '../common/constants/CommonConstants';
import { LoginComponent } from '../view/LoginComponent';
@Entry
@Component
struct LoginPage {
  aboutToAppear() {
    MediaQueryModel.register();
  }
  aboutToDisappear() {
    MediaQueryModel.unRegister();
  }
  build() {
    Column() {
      Scroll() {
        Column() {

          // LoginComponent区域
          LoginComponent()
        }
        .linearGradient({
          direction: GradientDirection.Right,
          colors: [[0x5FC3E4, 0], [0xE55D87, 1]]
        })
        .height(CommonConstants.SCROLL_HEIGHT_PERCENT)
        .constraintSize({ minHeight: '304vp' })
        .alignItems(HorizontalAlign.Start)
        .padding('0vp')
      }
      .layoutWeight(CommonConstants.LOGIN_SCROLL_LAYOUT_WEIGHT)
      .opacity(1)

    }
    .width(CommonConstants.LOGIN_PAGE_WIDTH_PERCENT)
    .backgroundColor('#f1f3f5')
  }

}