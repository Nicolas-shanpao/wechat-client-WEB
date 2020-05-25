import axios from "@/plugins/axios";
import api from "@/api/api";
import qs from "qs";

export function login(data) {
  return axios({
    url: api.login,
    method: "post",
    data: qs.stringify(data)
    // data: data
  });
}

export function signup(data) {
  return axios({
    url: api.signup,
    method: "post",
    data: qs.stringify(data)
  });
}

export function userList(params) {
  return axios({
    url: api.userList,
    method: "get",
    params
  });
}

export function getUserinfo() {
  return axios({
    url: api.getUserinfo,
    method: "get"
  });
}

export function logout(data) {
  return axios({
    url: api.logout,
    method: "post",
    data: qs.stringify(data)
  });
}
