/* eslint-disable prettier/prettier */
import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../slices/authSlice';
import appReducer from '../slices/appSlice';

const rootReducer = {
  auth: authReducer,
  app: appReducer
};

const store = configureStore({
  reducer: rootReducer,
});

export default store;
