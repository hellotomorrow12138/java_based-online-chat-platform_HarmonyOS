import httpRequest from '@bundle:chat.kalakala.top/entry/ets/model/Request_get';
export function room(param) {
    return httpRequest({
        // 接口地址
        url: "/api/room_controller",
        method: 'get',
    });
}
//# sourceMappingURL=get_room.js.map