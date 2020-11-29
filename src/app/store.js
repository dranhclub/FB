/* eslint-disable prettier/prettier */
import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../slices/authSlice';
import appReducer from '../slices/appSlice';
import postReducer from '../slices/postSlice';

const rootReducer = {
  auth: authReducer,
  app: appReducer,
  post: postReducer
};

const store = configureStore({
  reducer: rootReducer,
});

export default store;
