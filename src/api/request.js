import axios from "@/plugins/axios";
import api from "./api";
import qs from "qs";
// import { getCookies } from "@/utils/cookie";
export default {
  login(data) {
    return axios({
      url: api.login,
      method: "post",
      data: qs.stringify(data)
    });
  },
  javaAPI(data) {
    return axios({
      url: api.javaAPI,
      method: "post",
      data: qs.stringify(data)
    });
  },
};
