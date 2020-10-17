import axios from 'axios'
import { message } from 'antd'
import 'antd/es/message/style/css';

// 创建axios实例
const service = axios.create({
    baseURL: process.env.BASE_API, // node环境的不同，对应不同的baseURL
    timeout: 5000, // 请求的超时时间
    withCredentials: true // 允许携带cookie
});

// 发送请求前处理request的数据
axios.defaults.transformRequest = [function (data) {
    let newData = '';
    for (let k in data) {
        newData += encodeURIComponent(k) + '=' + encodeURIComponent(data[k]) + '&'
    }
    return newData
}];

// request拦截器
service.interceptors.request.use(
    config => {
        // 发送请求之前，要做的业务
        return config
    },
    error => {
        // 错误处理代码
        return Promise.reject(error)
    }
);

// response拦截器
service.interceptors.response.use(
    response => {
        // 数据响应之后，要做的业务
        return response
    },
    error => {
        message.error(error.response.data.errmsg);
        // if(error.response.data.code===401){
        //     window.location.href = '#/login';
        // }
        return Promise.reject(error)
    }
);

export default service