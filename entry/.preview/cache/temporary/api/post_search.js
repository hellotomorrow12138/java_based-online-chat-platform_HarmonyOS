import httpRequest from '@bundle:com.example.index_test1/entry/ets/model/Request_get';
export function searchContents(param) {
    return httpRequest({
        // 接口地址
        url: "/contents/search_contents?input_contents=" + param.input_contents,
        method: 'post',
        data: param
    });
}
