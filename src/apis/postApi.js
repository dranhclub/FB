import queryString from 'query-string';
import axiosClient from './axiosClient';

const postApi = {
  createPost: async ({token, description, images, video, emotion}) => {
    const params = {
      token: token,
      description: description,
      images: images,
      video: video,
      emotion: emotion
    }
    console.log("SEND create post request:", params);
    const response = await axiosClient.post('create_post', params);
    console.log("RECEIVED create post response:", response);
    return response;
  },
  getPosts: async ({token}) => {
    const params = {
      token: token,
    }
    console.log("SEND get posts request:", params);
    const response = await axiosClient.post('get_posts', params);
    console.log("RECEIVED get posts response: ", response);
    return response;
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
