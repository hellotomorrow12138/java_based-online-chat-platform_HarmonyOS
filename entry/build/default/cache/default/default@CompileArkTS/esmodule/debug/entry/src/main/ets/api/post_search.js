import httpRequest from '@bundle:chat.kalakala.top/entry/ets/model/Request_get';
export function searchContents(param) {
    return httpRequest({
        // 接口地址
        url: "/contents/search_contents?input_contents=" + param.input_contents,
        method: 'post',
        data: param
    });
}
//# sourceMappingURL=post_search.js.map