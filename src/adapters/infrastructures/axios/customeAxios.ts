import axios from "axios";
import { AXIOS_BASE_URL } from "../adapters.infrastructures.config";
// import mockAxios from "./../__mocks__/mockAxios";

// create new axios instance
const customAxios = axios.create({});
customAxios.defaults.baseURL = AXIOS_BASE_URL;
// customAxios.interceptors.request.use((config) => {
//   // eslint-disable-next-line no-param-reassign
//   // config.params = { ...config.params, timestamp: Date.now() };
//   return config;
// });

export default customAxios;
