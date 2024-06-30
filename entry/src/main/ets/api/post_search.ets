import httpRequest from '../model/Request_get'
export function searchContents(param:any){
  return httpRequest({
    // 接口地址
    url: "/contents/search_contents?input_contents=" + param.input_contents,
    method: 'post',
    data:param
  })
}