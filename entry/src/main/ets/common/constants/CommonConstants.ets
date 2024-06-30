// 所有功能的公共常数。
export class CommonConstants {
  // 设备列数定义
  static readonly GRID_ROW_SM: number = 4; // SM设备
  static readonly GRID_ROW_MD: number = 8; // MD设备
  static readonly GRID_ROW_LG: number = 12; // LG设备
  // 间距定义
  static readonly GUTTER_X: number = vp2px(12); // x方向设备檐沟
  // 页面跨度定义
  static readonly SPAN_SM: number = 4; // SM设备
  static readonly SPAN_MD: number = 6; // MD设备
  static readonly SPAN_LG: number = 8; // LG设备
  // 隐私声明跨度
  static readonly PRIVACY_SPAN_SM: number = 2; // SM设备
  static readonly PRIVACY_SPAN_MD: number = 4; // MD设备
  static readonly PRIVACY_SPAN_LG: number = 4; // LG设备
  // “我的”页面跨度
  static readonly MINE_SPAN_SM: number = 4; // SM设备
  static readonly MINE_SPAN_MD: number = 8; // MD设备
  static readonly MINE_SPAN_LG: number = 8; // LG设备
  // 登录按钮跨度
  static readonly BUTTON_SPAN_SM: number = 4; // SM设备
  static readonly BUTTON_SPAN_MD_SMALL: number = 3; // MD设备（小断点）
  static readonly BUTTON_SPAN_MD_BIG: number = 6; // MD设备（大断点）
  static readonly BUTTON_SPAN_LG: number = 8; // LG设备
  // 偏移量定义
  static readonly OFFSET_SM: number = 1; // SM设备
  static readonly OFFSET_MD: number = 1; // MD设备
  static readonly OFFSET_LG: number = 2; // LG设备
  static readonly PRIVACY_OFFSET_SM: number = 1; // 隐私声明 SM设备
  static readonly PRIVACY_OFFSET_MD: number = 2; // 隐私声明 MD设备
  static readonly PRIVACY_OFFSET_LG: number = 4; // 隐私声明 LG设备
  static readonly BUTTON_OFFSET_SM: number = 0; // 登录按钮 SM设备
  static readonly BUTTON_OFFSET_MD: number = 2; // 登录按钮 MD设备
  static readonly BUTTON_OFFSET_LG: number = 4; // 登录按钮 LG设备
  // 断点设置
  static readonly BREAK_POINT: Array<string> = ['320vp', '600vp', '820vp'];
  // 布局权重
  static readonly LOGIN_SCROLL_LAYOUT_WEIGHT: number = 1;
  static readonly SCROLL_LAYOUT_WEIGHT: number = 1;
  static readonly COLUMN_LAYOUT_WEIGHT: number = 1;
  // 列表大小
  static readonly LIST_SIZE: number = 2;
  // 字体权重
  static readonly TITLE_FONT_WEIGHT: number = 500;
  static readonly LOGIN_TEXT_FONT_WEIGHT: number = 500;
  static readonly BUTTON_FONT_WEIGHT: number = 500;
  static readonly TEXT_FONT_WEIGHT: number = 500;
  static readonly NICKNAME_FONT_WEIGHT: number = 500;
  // 页面URL
  static readonly MINE_PAGE_URL: string = 'pages/MinePage';
  static readonly REGISTRATION_SUCCESS_PAGE_URL: string = 'pages/RegistrationSuccessPage';
  // 宽度百分比定义
  static readonly TEXT_INPUT_WIDTH_PERCENT: string = '100%';
  static readonly DIVIDER_WIDTH_PERCENT: string = '100%';
  static readonly BUTTON_WIDTH_PERCENT: string = '100%';
  static readonly FLEX_WIDTH_PERCENT: string = '100%';
  static readonly LOGIN_PAGE_WIDTH_PERCENT: string = '100%';
  static readonly FULL_WIDTH_PERCENT: string = '100%';
  static readonly TAB_ITEM_FONT_WEIGHT: number = 500;
  static readonly FULL_HEIGHT_PERCENT: string = '100%';

  static readonly REGISTRATION_PAGE_WIDTH_PERCENT: string = '100%';
  static readonly REGISTRATION_PAGE_HEIGHT_PERCENT: string = '100%';
  static readonly MINE_PAGE_TEXT_WIDTH_PERCENT: string = '100%';
  static readonly MINE_PAGE_WIDTH_PERCENT: string = '100%';
  static readonly CUSTOMER_COLUMN_WIDTH_PERCENT: string = '100%';
  static readonly CUSTOMER_COLUMN_HEIGHT_PERCENT: string = '100%';
  static readonly MINE_PAGE_HEIGHT_PERCENT: string = '100%';
  static readonly ROW_WIDTH_PERCENT: string = '100%';
  static readonly SCROLL_HEIGHT_PERCENT: string = '100%';
  static readonly DETAIL_COLUMN_WIDTH_PERCENT: string = '93%';
}