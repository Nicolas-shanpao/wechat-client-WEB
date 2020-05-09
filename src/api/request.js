import axios from "@/plugins/axios";
import api from "./api";
import qs from "qs";
// import { getCookies } from "@/utils/cookie";
export default {
  javaAPI(data) {
    return axios({
      url: api.javaAPI,
      method: "post",
      data: qs.stringify(data)
    });
  },
};
