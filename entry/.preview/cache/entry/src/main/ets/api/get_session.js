import httpRequest from '@bundle:com.example.index_test1/entry/ets/model/Request_get';
export function Session(param) {
    return httpRequest({
        // 接口地址
        url: "/getSessionId",
        method: 'get',
    });
}
//# sourceMappingURL=get_session.js.map