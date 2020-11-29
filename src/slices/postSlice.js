import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import postApi from '../apis/postApi';
import * as RES_CODE from '../constants/RES_CODE';

export const createPostRequest = createAsyncThunk('post/createPostRequest', async (params) => {
  const response = await postApi.createPost(params);
  return response;
});

const post = createSlice({
  name: 'post',
  initialState: {
    uploading: false,
    uploadStatus: {
      success: false,
      error: null
    }
  },
  reducers: {
    resetStatus: (state) => {
      state.uploadStatus = {
        success: false,
        error: null
      }
    }
  },
  extraReducers: {
    [createPostRequest.pending] : (state) => {
      state.uploading = true;
    },
    [createPostRequest.rejected]: (state, action) => {

    },
    [createPostRequest.fulfilled]: (state, action) => {
      state.uploading = false;
      switch (action.payload.code) {
        case RES_CODE.OK:
          state.uploadStatus = {
            success: true,
            error: null
          }
          break;
        default:
          state.uploadStatus = {
            success: false,
            error: {message: action.payload.message}
          };
      }
    }
  },
});

const {reducer, actions} = post;

export const {
  resetStatus
} = actions;

export default reducer;