/* eslint-disable prettier/prettier */
import queryString from 'query-string';
import axiosClient from './axiosClient';

const postApi = {
  addPost: params => {
    // const url = `/link?${queryString.stringify(params)}`;
    // return axiosClient.post(url);
    // token o
    // image x [file, file,...]
    // video x file
    // described x
    // status x
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve({
          code: '1000',
          data: {
            id: 'demoId',
            url: 'demoUrl', // co the de trong
          },
        });
      }, 1000);
    });
  },
  getPost: params => {
    // const url = `/link?${queryString.stringify(params)}`;
    // return axiosClient.post(url);
    // token o type?
    // id o type? id cua bai
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve({
          code: '1000',
          data: {
            id: 'demoId',
            described: 'demoDescribed',
            created: 'demoCreated',
            modified: 'demoModified',
            like: 'demoLike', // so luong like
            comment: 'demoComment', // so luong comment
            is_liked: '1', // 1 da like, 0 chua like
            image: [ // x
              {
                id: 'demoId',
                url: 'demoUrl',
              },
              {
                id: 'demoId',
                url: 'demoUrl',
              },
            ],
            video: { // x
              url: 'demoUrl',
              thumb: 'demoThumb',
            },
            author: {
              id: 'demoId',
              name: 'demoName',
              avatar: 'demoAvatar',
            },
            state: 'demoState',
            is_blocked: '',
            can_edit: '',
            banned: '',
            can_comment: '', // x
          },
        });
      }, 1000);
    });
  },
  editPost: params => {
    // const url = `/link?${queryString.stringify(params)}`;
    // return axiosClient.post(url);
    // token o
    // id o int id bai
    // ...
  },
};

export default postApi;
