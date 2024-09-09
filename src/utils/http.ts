import axios from "axios" // 引入axios模块

// 创建axios实例，设置基础URL和请求超时时间
const httpInstance = axios.create({
    baseURL: "http://geek.itheima.net/v1_0",
    timeout: 50000,
});

// 请求拦截器，请求成功时执行
httpInstance.interceptors.request.use(
    (config) => {
        // 在发送请求之前做些什么
        return config;
    },
    (error) => {
        // 对请求错误做些什么
        return Promise.reject(error);
    })

// 响应拦截器，请求成功时执行
httpInstance.interceptors.response.use((response) => {
    // 对响应数据做点什么
    return response;
}, (error) => {
    // 对响应错误做点什么
    return Promise.reject(error);
}
);

export default httpInstance // 导出httpInstance实例