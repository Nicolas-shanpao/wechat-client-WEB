/* eslint-disable no-unused-vars */
import axios from "axios";
import store from "@/store";
import {getToken, getCookies} from "@/utils/cookies"; // get token from cookie
import {Message, MessageBox} from "element-ui";
import baseConfig from "./baseConfig";
// create an axios instance
// const whiteList = ['webapi']
const _axios = axios.create({
  baseURL: baseConfig.serverUrl // api的base_url
  // timeout: 10000 // request timeout
});
// request interceptor
_axios.interceptors.request.use(
  config => {
    // if (getToken() || sessionStorage.getItem("BimPlatformstokens")) {
    if (getToken() || sessionStorage.getItem("BimPlatformstokens")) {
      // 让每个请求携带token-- ['X-Token']为自定义key 请根据实际情况自行修改
      config.headers["Authorization"] = getCookie("duxiang-tokens");
      config.headers["Token"] =
        getToken() || sessionStorage.getItem("BimPlatformstokens");
    }
    return config;
  },
  error => {
    // Do something with request error
    Promise.reject(error);
  }
);

// respone interceptor
_axios.interceptors.response.use(
  response => {
    console.log(response);
    const res = response.data

    // if the custom code is not 20000, it is judged as an error.
    if (res.code !== 200) {
      Message({
        message: res.message || 'Error',
        type: res.type,
        duration: 5 * 1000
      })

      // 50008: Illegal token; 50012: Other clients logged in; 50014: Token expired;
      if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
        // to re-login
        MessageBox.confirm('您已注销，您可以点击取消以停留在此页，或重新登录', '确认注销', {
          confirmButtonText: '重新登陆',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          store.dispatch('user/resetToken').then(() => {
            location.reload()
          })
        })
      }
      return Promise.reject(new Error(res.message || 'Error'))
    } else {
      return res
    }
  },
  error => {
    console.log('err' + error) // for debug
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
);

export default _axios;
