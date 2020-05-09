const state = {
  smViewer: {},
  smCesium: {},
  smDataSource: {},
  smTracker: undefined
};

const mutations = {
  SET_SMVIEWER: (state, smviewer) => {
    state.smViewer = smviewer;
  },
  SET_SMDATASOURCE: (state, smDataSource) => {
    state.smDataSource = smDataSource;
  },
  SET_SMCESIUM: (state, smCesium) => {
    state.smCesium = smCesium;
  },
  SET_SMTRACKER: (state, smTracker) => {
    state.smTracker = smTracker;
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
