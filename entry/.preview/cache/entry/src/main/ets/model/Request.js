import axios from '@package:pkg_modules/.ohpm/@ohos+axios@2.2.0/pkg_modules/@ohos/axios/index';
const service = axios.create({
    // 配置域名前缀
    baseURL: "http://36.56.124.242:1234",
    headers: {
        'Content-Type': 'application/json',
        "Channel": "B2B"
    },
    method: "post",
});
// 添加请求拦截器
service.interceptors.request.use((config) => {
    // 对请求数据做点什么
    return config;
}, (error) => {
    // 对请求错误做些什么
    return Promise.resolve(error);
});
// 添加响应拦截器
service.interceptors.response.use((response) => {
    // 对响应数据做点什么
    return response;
}, (error) => {
    // 对响应错误做点什么
    return Promise.resolve(error);
});
export default service;
//# sourceMappingURL=Request.js.map