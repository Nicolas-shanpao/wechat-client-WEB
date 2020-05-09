import Vue from "vue";
import Vuex from "vuex";
import cesium from "./modules/cesium";
import supermap from "./modules/supermap";
import user from "./modules/user";
import nodedetails from "./modules/nodedetails";

Vue.use(Vuex);
const index = new Vuex.Store({
  modules: {
    cesium,
    supermap,
    user,
    nodedetails
  }
});
if (module.hot) {
  module.hot.accept(
    [
      "./modules/cesium",
      "./modules/supermap",
      "./modules/user",
      "./modules/nodedetails"
    ],
    () => {
      index.hotUpdate({
        modules: {
          cesium: require("./modules/cesium").default,
          supermap: require("./modules/supermap").default,
          user: require("./modules/user").default,
          nodedetails: require("./modules/nodedetails").default
        }
      });
    }
  );
}

export default index;
