import Axios from 'axios'
import Cookie from 'js-cookie'

// 请求拦截
Axios.interceptors.request.use(
    config => {
        // 在每个请求的请求头中携带token
        config.headers['X-XSRF-TOKEN'] = Cookie.get('authorize_access_token');
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

// 响应拦截
Axios.interceptors.response.use(
    response => {
        return response;
    },
    error => {
        return Promise.reject(error);
    }
);