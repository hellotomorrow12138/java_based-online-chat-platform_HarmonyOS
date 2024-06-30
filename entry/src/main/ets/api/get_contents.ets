import httpRequest from '../model/Request_get'
export function  contents(param:any){
  return httpRequest({
    // 接口地址
    url: "/contents/loadContents",
    method: 'get',
  })
}