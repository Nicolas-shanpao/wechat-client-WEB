import axios from "@/plugins/axios";
import api from "@/api/api";
import qs from "qs";

export function addArticle(data) {
  return axios({
    url: api.addArticle,
    method: "post",
    data: qs.stringify(data)
  });
}

export function getArticleList(params) {
  return axios({
    url: api.getArticleList,
    method: "get",
    params
  });
}
export function getArticleDetial(params) {
  return axios({
    url: api.getArticleDetial,
    method: "get",
    params
  });
}
