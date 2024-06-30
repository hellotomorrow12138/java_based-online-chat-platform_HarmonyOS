import httpRequest from '../model/Request_get'
export function store(param:any){
  return httpRequest({
    // 接口地址
    url: "/store/show_store",
    method: 'get',
  })
}