import axios from "axios";
import { Message, Loading } from "element-ui";
// import { getToken,removeToken } from '@/utils/auth'
import store from '@/store';

let loadingInstance = null; //loading

// 开发环境
const isDev = process.env.NODE_ENV === "development";
const baseUrl = isDev
  ? "http://daxun.kuboy.top/api"
  : "http://daxun.kuboy.top/api";

// 创建axios实例
const instance = axios.create({
  timeout: 7000, // 请求超时时间
  baseURL: baseUrl
  // headers: {
  //   "Content-Type": "application/json;charset=UTF-8"
  // }
});
// post请求头
instance.defaults.headers.post["Content-Type"] =
  "application/x-www-form-urlencoded;charset=UTF-8";
// 添加请求拦截器
instance.interceptors.request.use(config => {
  loadingInstance = Loading.service({
    lock: true,
    text: "loading..."
  });
  // 携带token
  if (store.getters.token) {
    config.headers['token'] = store.getters.token
  }
  return config;
});
// 添加响应拦截器
instance.interceptors.response.use(
  response => {
    loadingInstance.close();
    let res = response.data
    // token 失效
    if(res.code == '10119'){
      console.log('token失效');
      store.dispatch('user/resetToken')
    }
    return res;
  },
  error => {
    if (error && error.response) {
      // 根据响应码具体处理
      switch (error.response.status) {
        case 400:
          error.message = '错误请求'
          break;
        case 401:
          error.message = '未授权，请重新登录'
          break;
        case 403:
          error.message = '拒绝访问'
          break;
        case 404:
          error.message = '请求错误,未找到该资源'
          // window.location.href = "/NotFound"
          break;
        case 405:
          error.message = '请求方法未允许'
          break;
        case 408:
          error.message = '请求超时'
          break;
        case 500:
          error.message = '服务器端出错'
          break;
        case 501:
          error.message = '网络未实现'
          break;
        case 502:
          error.message = '网络错误'
          break;
        case 503:
          error.message = '服务不可用'
          break;
        case 504:
          error.message = '网络超时'
          break;
        case 505:
          error.message = 'http版本不支持该请求'
          break;
        default:
          error.message = `连接错误${error.response.status}`
      }
    }else{
      error.message = '连接服务器失败'
    }

    console.log("TCL: error", error);
    const msg = error.Message !== undefined ? error.Message : "";
    Message({
      message: "网络错误" + msg,
      type: "error",
      duration: 3 * 1000
    });
    loadingInstance.close();
    return Promise.reject(error);
  }
);

export default instance;
