import http from '@/utils/http'
// import qs from 'qs';
// import store from '@/store';
// import { getInfo, getToken } from "@/utils/auth";

export default {
  getInfo(params) {
    return http({
      url:'/users/getInfo',
      params
    })
  },
  login(data) {
    // 17888888888 zxcvbnm
    return http.post('/users/login', data)
  }
}