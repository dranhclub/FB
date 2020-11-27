import queryString from 'query-string';
import axiosClient from './axiosClient';

const authApi = {
  signUp: async params => {
    const url = 'signup';
    console.log("Send signup request:", params);
    const response = await axiosClient.post(url, params);
    console.log("Received signup response:", response);
    return response;
  },
  login: async params => {
    const url = 'login';
    console.log("Send login request:", params);
    const response = await axiosClient.post(url, params);
    console.log("Received login response:", response);
    return response;
  },
  getVerifyCode: params => {
    return axiosClient.post('get_verify_code', params);
  },
  checkVerifyCode: params => {
    return axiosClient.post('check_verify_code', params);
    // const url = `/link?${queryString.stringify(params)}`;
    // return axiosClient.post(url);
    // phoneNumber o
    // code_verify o
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve({
          code: '1000',
          data: {
            token: 'demoTokenCheckVerifyCode',
            id: 'demoId',
          },
        });
      }, 1000);
    });
    // ...
  },
  changeInfoAfterSignUp: params => {
    // const url = `/link?${queryString.stringify(params)}`;
    // return axiosClient.post(url);
    // token o
    // username o
    // avatar x file
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve({
          code: '1000',
          data: {
            id: 'demoId',
            username: 'dmUnCIAS',
            phoneNumber: 'dmPNCIAS', // x
            created: 'demoCreated',
            avatar: 'https://picsum.photos/id/0/200/300',
            is_blocked: 'demoIsBlocked',
            online: 'demoOnline',
          },
        });
      }, 1000);
      // ...
    });
  },
  logout: params => {
    // const url = `/link?${queryString.stringify(params)}`;
    // return axiosClient.post(url);
    // token o
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve({
          code: '1000',
        });
      }, 1000);
    });
  },
};

export default authApi;
