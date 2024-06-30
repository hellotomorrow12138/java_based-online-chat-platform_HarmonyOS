import httpRequest from '@bundle:chat.kalakala.top/entry/ets/model/Request_post';
export function Register(param) {
    return httpRequest({
        // 接口地址
        url: "/messageController?user_name=" + param.user_name + "&user_password=" + param.user_password + "&check=0",
        method: 'post',
        data: param
    });
}
//# sourceMappingURL=post_register.js.map