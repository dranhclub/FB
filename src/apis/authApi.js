import queryString from 'query-string';
import axiosClient from './axiosClient';

const authApi = {
  signUp: params => {
    const url = 'signup';
    return axiosClient.post(url, params);
  },
  login: params => {
    const url = 'login';
    return axiosClient.post(url, params);
  },
  getVerifyCode: params => {
    // const url = `/link?${queryString.stringify(params)}`;
    // return axiosClient.post(url);
    // phoneNumber o
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve({
          code: '1000',
        });
      }, 1000);
    });
    // 120s 1010, 1009
    // sdt actived 1010
    // sdt chua dk 1004 9995
  },
  checkVerifyCode: params => {
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
