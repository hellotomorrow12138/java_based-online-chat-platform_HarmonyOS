import httpRequest from '@bundle:chat.kalakala.top/entry/ets/model/Request_get';
export function contents(param) {
    return httpRequest({
        // 接口地址
        url: "/contents/loadContents",
        method: 'get',
    });
}
//# sourceMappingURL=get_contents.js.map