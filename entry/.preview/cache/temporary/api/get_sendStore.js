import httpRequest from '@bundle:com.example.index_test1/entry/ets/model/Request_get';
export function get_sendStore(param) {
    return httpRequest({
        // 接口地址
        url: "/store/selected_products?id=" + param.selectedItemId + "&user_name=" + param.login_user,
        method: 'post',
    });
}
