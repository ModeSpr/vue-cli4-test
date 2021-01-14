import axios from "axios";
import router from "@/router";
import store from "@/store";
import { Toast } from "vant";

// 创建axios实例
const service = axios.create({
  timeout: 6000, // 请求超时时间
  baseURL: process.env.VUE_APP_URL,
  headers: {
    "Content-Type": "application/json;charset=UTF-8",
    platform: "h5"
  }
});
// post请求头
service.defaults.headers.post["Content-Type"] =
  "application/x-www-form-urlencoded;charset=UTF-8";

// 设置全局的请求次数，请求的间隙
axios.defaults.retry = 4;
axios.defaults.retryDelay = 1000;

// 添加请求拦截器
service.interceptors.request.use(
  config => {
    // 携带token
    store.state.token && (config.headers.token = store.state.token);
    return config;
  },
  error => {
    // do something with request error
    console.log("request error: ", error); // for debug
    return Promise.reject(error);
  }
);
// 添加响应拦截器
service.interceptors.response.use(
  response => {
    return response.data; // 200
  },
  error => {
    console.log("response error code: ", error.response); // for debug
    console.log("response error: ", error); // for debug
    if (error && error.response) {
      // 根据响应码具体处理
      switch (error.response.status) {
        case 401:
          Toast("未授权，请登录");
          // store.dispatch('resetToken')
          router.replace("/login");
          break;
        case 403:
          Toast("服务器正在维护中");
          router.replace("/403");
          break;
        case 404:
          Toast("请求错误,未找到该资源");
          router.replace("/NotFound");
          break;
        case 429:
          Toast("请求太频繁");
          break;
        case 500:
          Toast("服务器内部错误");
          break;
        default:
          Toast(`连接错误${error.response.status}`);
      }
      return Promise.reject(error);
    } else {
      Toast(error.message);
      // 处理超时的情况
      const config = error.config;
      console.log("config", config);
      // If config does not exist or the retry option is not set, reject
      if (!config || !config.retry) return Promise.reject(error);

      // Set the variable for keeping track of the retry count
      config.__retryCount = config.__retryCount || 0;

      // Check if we've maxed out the total number of retries
      if (config.__retryCount >= config.retry) {
        // Reject with the error
        return Promise.reject(error);
      }

      // Increase the retry count
      config.__retryCount += 1;

      // Create new promise to handle exponential backoff
      const backoff = new Promise(function(resolve) {
        setTimeout(function() {
          resolve();
        }, config.retryDelay || 1);
      });

      // Return the promise in which recalls axios to retry the request
      return backoff.then(function() {
        return service(config);
      });
    }
  }
);

export default service;
