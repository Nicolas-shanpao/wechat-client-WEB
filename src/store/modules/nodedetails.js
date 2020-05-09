import { getZhiliang, getJiliang } from "@/api/nodedetails";

const state = {
  zlData: {
    name: "评定数量",
    sum: 0,
    legend: ["评定合格", "评定不合格"],
    graphic: "已评定数量",
    data: [
      { value: 0, name: "评定合格" },
      { value: 0, name: "评定不合格" }
    ],
    fileList: []
  },
  jlData: {
    name: "完成量",
    legend: ["已计量", "未计量"],
    data: [
      { value: 0, name: "已计量" },
      { value: 0, name: "未计量" }
    ],
    bgje: 0.00001,
    htje: 0.00001,
    jlje: 0.00001,
    sjcz: 0.00001
  },
  date: {
    jhjs: null,
    jhks: null,
    sjjs: null,
    sjks: null,
    id: null
  },
  uniqId: "",
  modelid: false
};

const mutations = {
  SET_ZHILIANG: (state, data) => {
    if (data.type == "fgx") {
      state.zlData = {
        name: "评定数量",
        sum: data.data.sum,
        legend: ["评定合格", "评定不合格"],
        graphic: "已评定数量",
        data: [
          { value: data.data.hege, name: "评定合格" },
          { value: data.data.sum - data.data.hege, name: "评定不合格" }
        ],
        fileList: data.data.fileList
      };
    } else if (data.type == "gx") {
      state.zlData = {
        name: "检查点数",
        sum: data.data.sum,
        legend: ["合格点数", "不合格点数"],
        graphic: "检查总数",
        data: [
          { value: data.data.hege, name: "合格点数" },
          { value: data.data.sum - data.data.hege, name: "不合格点数" }
        ],
        fileList: data.data.fileList
      };
    }
  },
  SET_JILIANG: (state, data) => {
    console.log(data);
    state.jlData = {
      name: "完成量",
      legend: ["已计量", "未计量"],
      bgje: data.data.bgje == null ? 0 : data.data.bgje, //变更金额
      htje: data.data.htje == null ? 0 : data.data.htje, //合同金额
      jlje: data.data.jlje == null ? 0 : data.data.jlje, //计量金额
      sjcz: data.data.sjcz == null ? 0 : data.data.sjcz, //实际产值
      // sjcz: 0,  //实际产值
      // jdwcbl: 0,//进度完成比例
      // jlje: 0,  //计量金额
      // jlwcbl: 0,//计量完成比例
      // jhks: 0,  //计量开始
      data: [
        {
          value: data.data.jlje == null ? 0 : data.data.jlje,
          name: "已计量"
        },
        {
          value:
            data.data.jlwcbl == 0
              ? 0
              : (data.data.jlje / data.data.jlwcbl) * 100 - data.data.jlje,
          name: "未计量"
        }
      ]
    };
  },
  SET_DATE: (state, data) => {
    console.log(data);
    state.date = {
      jhjs: data.jhjs,
      jhks: data.jhks,
      sjjs: data.sjjs,
      sjks: data.sjks,
      id: data.id
    };
  },
  SET_UNIQID: (state, data) => {
    console.log(data);
    state.uniqId = data;
  },
  SET_MODELID: (state, data) => {
    console.log(data);
    state.modelid = data;
  }
};

const actions = {
  // 获取质量详情
  GetZhiliang({ commit }, data) {
    console.log(data);
    let params = { uniqId: data.uniqId };
    let type = data.type;
    return new Promise((resolve, reject) => {
      getZhiliang(params)
        .then(response => {
          console.log(response.content);
          let data = {
            data: response.content,
            type: type
          };
          commit("SET_ZHILIANG", data);
          resolve(response.content);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  // 获取计量详情
  GetJiliang({ commit }, data) {
    let params = { uniqId: data.uniqId };
    let type = data.type;
    return new Promise((resolve, reject) => {
      getJiliang(params)
        .then(response => {
          console.log(response.content);
          let data = {
            data: response.content,
            type: type
          };
          commit("SET_JILIANG", data);
          resolve(response.content);
        })
        .catch(error => {
          reject(error);
        });
    });
  }
};
const getters = {
  zlData(state) {
    return state.zlData;
  }
};
export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};
