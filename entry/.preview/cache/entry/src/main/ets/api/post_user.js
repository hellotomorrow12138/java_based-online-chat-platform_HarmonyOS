import httpRequest from '@bundle:com.example.index_test1/entry/ets/model/Request_post';
export function User(param) {
    return httpRequest({
        // 接口地址
        url: "/messageController?user_name=" + param.user_name + "&user_password=" + param.user_password + "&check=1",
        method: 'post',
        data: param
    });
}
//# sourceMappingURL=post_user.js.map