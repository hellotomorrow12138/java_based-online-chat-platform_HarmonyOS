import httpRequest from '@bundle:chat.kalakala.top/entry/ets/model/Request_post';
export function Login(param) {
    return httpRequest({
        // 接口地址
        url: "/messageController?user_name=" + param.user_name + "&user_password=" + param.user_password + "&check=1",
        method: 'post',
        data: param
    });
}
//# sourceMappingURL=post_login.js.map