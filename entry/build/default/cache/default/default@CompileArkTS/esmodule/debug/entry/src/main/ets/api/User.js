import httpRequest from '@bundle:com.example.index_test1/entry/ets/model/Request';
export function User(param) {
    return httpRequest({
        // 接口地址
        url: "/messageController?user_name=" + this.input_userName + "&user_password=" + this.input_password + "&check=1",
        method: 'post',
        data: param
    });
}
//# sourceMappingURL=User.js.map