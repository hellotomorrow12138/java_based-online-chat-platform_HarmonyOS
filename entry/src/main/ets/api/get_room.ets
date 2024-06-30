import httpRequest from '../model/Request_get'
export function  room(param:any){
  return httpRequest({
    // 接口地址
    url: "/api/room_controller",
    method: 'get',
  })
}