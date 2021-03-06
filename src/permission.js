import router from "./router";
import store from "./store";
// import { Message } from 'element-ui'
import NProgress from "nprogress"; // progress bar
import "nprogress/nprogress.css"; // progress bar style
import {getToken} from "@/utils/cookies"; // get token from cookie
// import getPageTitle from '@/utils/get-page-title'

NProgress.configure({showSpinner: false}); // NProgress Configuration

const whiteList = ["/login", "/signup", "/home"]; // no redirect whitelist

router.beforeEach(async (to, from, next) => {
  // start progress bar
  NProgress.start();
  // set page title
  // document.title = getPageTitle(to.meta.title)
  // 检验用户是否登录
  // const hasToken = getToken() || sessionStorage.getItem("BimPlatformstokens");
  const hasToken = getToken();
  // 检验是否获取用户信息
  // 存在token
  if (hasToken) {
    if (to.path === "/login") {
      // if is logged in, redirect to the home page
      next({path: "/"});
      NProgress.done();
    } else {
      // let hasGetRoles = store.state.user.roles;
      // if (hasGetRoles) {
      //   next();
      // } else {
      try {
        // get user info
        await store.dispatch("user/getUserinfo");
        next();
      } catch (error) {
        // remove token and go to login page to re-login
        await store.dispatch("user/logout");
        // Message.error(error || 'Has Error')
        next(`/login?redirect=${to.path}`);
        NProgress.done();
      }
      // }
    }
  } else {
    /* has no token*/

    if (whiteList.indexOf(to.path) !== -1) {
      // in the free login whitelist, go directly
      next();
    } else {
      // other pages that do not have permission to access are redirected to the login page.
      next(`/login?redirect=${to.path}`);
      NProgress.done();
    }
  }
});

router.afterEach(() => {
  // finish progress bar
  NProgress.done();
});
