import httpRequest from '@bundle:chat.kalakala.top/entry/ets/model/Request_get';
export function store(param) {
    return httpRequest({
        // 接口地址
        url: "/store/show_store",
        method: 'get',
    });
}
//# sourceMappingURL=get_store.js.map