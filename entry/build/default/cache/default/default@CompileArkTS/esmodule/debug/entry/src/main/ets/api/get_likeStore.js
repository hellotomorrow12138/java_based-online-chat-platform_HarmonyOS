import httpRequest from '@bundle:chat.kalakala.top/entry/ets/model/Request_get';
export function get_likeStore(param) {
    return httpRequest({
        // 接口地址
        url: "/store/favorite_products?user_name=" + param.login_user,
        method: 'get',
    });
}
//# sourceMappingURL=get_likeStore.js.map