import axios from 'axios';
import queryString from 'query-string';

// API on heroku server:
// export const API_SERVER_URL = 'https://hidden-refuge-96933.herokuapp.com/';

// API on local for debug
export const API_SERVER_URL = 'http://192.168.1.11:3000/';

console.log("API: " + API_SERVER_URL);

const axiosClient = axios.create({
  baseURL: API_SERVER_URL,
  // headers: {
  //   'content-type': 'application/json',
  // },
  paramsSerializer: params => queryString.stringify(params),
});

axiosClient.interceptors.request.use(async (config) => {
  // Handle token here ...
  return config;
});

axiosClient.interceptors.response.use((response) => {
  if (response && response.data) {
    return response.data;
  }
  return response;
}, (error) => {
  // Handle error
  throw error;
});

export default axiosClient;
