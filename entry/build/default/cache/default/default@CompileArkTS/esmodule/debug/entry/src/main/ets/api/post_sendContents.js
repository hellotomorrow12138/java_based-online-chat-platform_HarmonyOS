import httpRequest from '@bundle:chat.kalakala.top/entry/ets/model/Request_get';
export function send_inputContents(param) {
    return httpRequest({
        // 接口地址
        url: "/contents/send_inputContents?add_title=" + param.add_title + "&add_contents=" + param.add_contents + "&add_user=" + param.add_user,
        method: 'post',
        data: param
    });
}
//# sourceMappingURL=post_sendContents.js.map