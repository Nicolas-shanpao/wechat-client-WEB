import axios from "@/plugins/axios";
import api from "@/api/api";
import qs from "qs";

export function gistreeMapadd(data) {
  return axios({
    url: api.gistree_mapadd,
    method: "post",
    data: qs.stringify(data)
  });
}

export function getZhiliang(params) {
  return axios({
    url: api.get_zhiliang,
    method: "get",
    params: params
  });
}

export function getJiliang(params) {
  return axios({
    url: api.get_jiliangk,
    method: "get",
    params: params
  });
}
