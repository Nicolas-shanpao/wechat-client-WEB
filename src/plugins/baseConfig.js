/**
 * 接口域名的管理
 * 暂且不用
 */
let env = "test";
const configList = {
  test: {
    serverUrl: "http://localhost:3333"
  }
};
const baseConfig = configList[env];
export default baseConfig;
