import axiosClient from './axiosClient';

const friendApi = {
  getListFriendSuggestions: async params => {
    const url = 'get_list_suggestion';
    return axiosClient.post(url, params);
  },
  requestFriend: async params => {
    return axiosClient.post('request_friend', params);
  }
};

export default friendApi;