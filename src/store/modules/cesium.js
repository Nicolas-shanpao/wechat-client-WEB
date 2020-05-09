const state = {
  viewer: {},
  dataSource: {},
  Cesium: {}
};

const mutations = {
  SET_VIEWER: (state, viewer) => {
    state.viewer = viewer;
  },
  SET_DATASOURCE: (state, dataSource) => {
    state.dataSource = dataSource;
  },
  SET_CESIUM: (state, Cesium) => {
    state.Cesium = Cesium;
  }
};

const actions = {
  // 风险列表
  // GetFengxianList ({
  //   commit,
  // }, params) {
  //   return new Promise((resolve, reject) => {
  //     getFengxianList(params).then(res => {
  //       resolve(res)
  //     }).catch(error => {
  //       reject(error)
  //     })
  //   })
  // },
  // 风险详情
};
const getters = {};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};
