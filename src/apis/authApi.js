/* eslint-disable prettier/prettier */
import queryString from 'query-string';
import axiosClient from './axiosClient';

const authApi = {
  signUp: params => {
    // const url = `/user/signup?${queryString.stringify(params)}`;
    // return axiosClient.post(url);
    // phonenumber o
    // password o
    // uuid o
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve({
          code: '1000',
        });
      }, 1000);
    });
    // return new Promise((resolve, reject) => {
    //   setTimeout(() => {
    //     resolve({
    //       code: '9996',
    //     });
    //   }, 1000);
    // });
  },
  login: params => {
    // const url = `/link?${queryString.stringify(params)}`;
    // return axiosClient.post(url);
    // phonenumber o
    // password o
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve({
          code: '1000',
          data: {
            id: 'demoId',
            username: 'dmUnLg',
            token: 'demoTokenLogin',
            avatar: '-1', // -1 doi doi ten va avatar, 1 actived
          },
        });
      }, 1000);
    });
  },
  getVerifyCode: params => {
    // const url = `/link?${queryString.stringify(params)}`;
    // return axiosClient.post(url);
    // phonenumber o
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
    // phonenumber o
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
            phonenumber: 'dmPNCIAS', // x
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
