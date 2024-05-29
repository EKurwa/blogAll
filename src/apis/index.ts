import axios from "axios";

const request = axios.create({
  baseURL: "/apis",
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 3000,
});

// 请求拦截
request.interceptors.request.use(
  (config) => {
    // 添加请求头
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 响应拦截
request.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default request;
