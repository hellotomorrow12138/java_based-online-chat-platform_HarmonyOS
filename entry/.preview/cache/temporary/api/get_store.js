import httpRequest from '@bundle:com.example.index_test1/entry/ets/model/Request_get';
export function store(param) {
    return httpRequest({
        // 接口地址
        url: "/store/show_store",
        method: 'get',
    });
}
