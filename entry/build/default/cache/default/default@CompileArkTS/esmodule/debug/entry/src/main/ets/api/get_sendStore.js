import httpRequest from '@bundle:chat.kalakala.top/entry/ets/model/Request_get';
export function get_sendStore(param) {
    return httpRequest({
        // 接口地址
        url: "/store/selected_products?id=" + param.selectedItemId + "&user_name=" + param.login_user,
        method: 'post',
    });
}
//# sourceMappingURL=get_sendStore.js.map