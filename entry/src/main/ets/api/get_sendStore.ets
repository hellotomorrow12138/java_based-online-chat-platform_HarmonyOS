import httpRequest from '../model/Request_get'
export function get_sendStore(param:any){
  return httpRequest({
    // 接口地址
    url: "/store/selected_products?id=" + param.selectedItemId + "&user_name=" + param.login_user,
    method: 'post',
  })
}