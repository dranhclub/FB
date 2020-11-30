import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import postApi from '../apis/postApi';
import * as RES_CODE from '../constants/RES_CODE';
import {uploadImage, uploadVideo} from '../helper/uploader';

export const createPostRequest = createAsyncThunk('post/createPostRequest', async (args, {dispatch}) => {
  console.log("create post async thunk...");
  const { token, description, images, video, emotion } = args;
  let imagesURLs = [];
  let videoURL = null;

  if (video) {
    console.log("uploading video:", video);
    // TODO: Need to check video length
    videoURL = await uploadVideo(
      video, 
      (snapshot) => {
        const progress = Math.round(snapshot.bytesTransferred / snapshot.totalBytes * 100)
        console.log("progress in upload video thunk:",progress);
        dispatch(setUploadProgress({progress: progress}));
      });
    console.log("uploaded video, video URL = ", videoURL);
  } else if (images.length > 0) {
    console.log(`uploading ${images.length} images`);
    for (let i = 0; i < images.length; i++) {
      console.log(`uploading images[${i}]:`, images[i]);
      const image = images[i];
      const imgURL = await uploadImage(
        image,
        (snapshot) => {
          const progress = Math.round(snapshot.bytesTransferred / snapshot.totalBytes * 100 / images.length)
          const totalProgress = Math.round(100 / images.length * i + progress);
          console.log("total progress in upload images thunk:",totalProgress);
          dispatch(setUploadProgress({progress: totalProgress}));
        }
      );
      imagesURLs.push(imgURL);
      console.log(`uploaded, imgURL = `, imgURL);
    }
  }

  const params = {
    token: token,
    description: description,
    images: imagesURLs,
    video: videoURL,
    emotion: emotion
  };

  const response = await postApi.createPost(params);
  return response;
});

const post = createSlice({
  name: 'post',
  initialState: {
    uploading: false,
    uploadStatus: {
      progress: 0,
      success: false,
      error: null
    }
  },
  reducers: {
    resetUploadStatus: (state) => {
      state.uploadStatus = {
        progress: 0,
        success: false,
        error: null
      }
    },
    setUploadProgress: (state, action) => {
      state.uploadStatus.progress = action.payload.progress;
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
            progress: 100,
            success: true,
            error: null
          }
          break;
        default:
          state.uploadStatus = {
            ...state.uploadStatus,
            success: false,
            error: {message: action.payload.message}
          };
      }
    }
  },
});

const {reducer, actions} = post;

export const {
  resetUploadStatus,
  setUploadProgress
} = actions;

export default reducer;