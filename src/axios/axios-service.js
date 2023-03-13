import axios from 'axios';
import { BASE_URL } from '../../env.json'
//import { getAsyncStorage } from '../utils/asyncStorage';
//import auth from '../redux/action-types/auth';
//import { getSecureData } from '../../utils/keyChain';

axios.defaults.baseURL = BASE_URL;
//axios.defaults.headers.common['Content-Type'] = ['application/json', 'multipart/form-data'];
//axios.defaults.headers.common.Accept = 'application/json'
axios.defaults.timeout = 15000;

axios.interceptors.response.use(
  (response) => response,
  (error) => {
    console.log('interceptor response error', JSON.stringify(error));
    // return Promise.reject({ error, response: { status: 408 } });
    return Promise.reject(error);
  },
);

axios.interceptors.request.use(
  (response) => response,
  (error) => {
    console.log('interceptor request error', error);
    return Promise.reject(error);
  },
);

const AxiosService = function async() {
  let Authorization = null;
  async function addHeaders(userConfig) {
    const {
      params, headers, timeout, ...restConfigs
    } = userConfig;
    const globalHeaders = {};
    // globalHeaders.language = "english";
    globalHeaders['X-RapidAPI-Key'] = 'edbf0e8069msh3ea75286e4ae2ccp1dd880jsnb1d94f8db0ce'
    globalHeaders['X-RapidAPI-Host'] = 'edamam-recipe-search.p.rapidapi.com'
    const authToken = false//await getAsyncStorage('token')
    //console.log('Authssss'+' ' +authToken)
    if (authToken) {
      let Token = "Bearer " + authToken
      console.log("Token")
      console.log(Token.replace(/"/g, ""))
      // globalHeaders.Authorization = Token.replace(/"/g, "")
    }

    const { filter, ...restParams } = params || {};
    return {
      headers: {
        ...globalHeaders
      },
      timeout,
    }
  }
  async function get(endPoint, userConfig = {}) {
    const headers = await addHeaders(userConfig);
    return axios.get(endPoint, headers);
  }
  async function post(endPoint, params = {}, userConfig = {}) {
    const headers = await addHeaders(userConfig);
    return axios.post(endPoint, params, headers);
  }

  async function put(endPoint, params = {}, userConfig = {}) {
    const headers = await addHeaders(userConfig);
    return axios.put(endPoint, params, headers);
  }

  async function remove(endPoint, params = {}, userConfig = {}) {
    const headers = await addHeaders(userConfig);
    return axios.delete(endPoint, { ...headers, data: params });
  }
  return {
    get,
    post,
    put,
    remove
  }
}
export default AxiosService();
