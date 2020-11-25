import AsyncStorage from '@react-native-community/async-storage';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import authApi from '../apis/authApi';
import * as RES_CODE from './../constants/RES_CODE';
import messaging from '@react-native-firebase/messaging';

export const bootstrapAsync = createAsyncThunk('auth/bootstrapAsync', async () => {
  console.log('Running bootstrapAsync');
  try {
    let token = await AsyncStorage.getItem('tokenPersist');
    console.log("tokenPersit:", token);
    let deviceToken = await messaging().getToken();
    console.log("deviceToken:", deviceToken);
    const jsonData = await AsyncStorage.getItem('dataPersist');
    let data = jsonData !== null ? JSON.parse(jsonData) : null;
    console.log("dataPersist:", data);
    return {
      token, 
      deviceToken, 
      data
    }
  } catch (error) {
    console.log('Error at bootstrapAsync:', error.message);
  }
});

export const signUpRequest = createAsyncThunk('auth/signUpRequest', async params => {
  try {
    const response = await authApi.signUp(params);
    return response;
  } catch (error) {
    console.log('Error at signUpRequest:', error.message);
  }
});

export const loginRequestFromSignInAlertScreen = createAsyncThunk('auth/loginRequestFromSignInAlertScreen', async params => {
  try {
    const response = await authApi.login(params);
    return response;
  } catch (error) {
    console.log('Error at loginRequestFromSignInAlertScreen:', error.message);
  }
});

export const saveTokenDataFromSignInAlertScreen = createAsyncThunk('auth/saveDataFromSignInAlertScreen', async params => {
  try {
    await AsyncStorage.setItem('tokenPersist', params.token);
    let data;
    if (params.savePassword) {
      data = {
        username: params.username,
        phoneNumber: params.phoneNumber,
        password: params.password,
      };
    } else {
      data = {
        username: params.username,
        phoneNumber: params.phoneNumber,
      };
    }
    const jsonData = JSON.stringify(data);
    await AsyncStorage.setItem('dataPersist', jsonData);
    if (params.savePassword) {
      return {
        key: true,
        data: {
          username: params.username,
          phoneNumber: params.phoneNumber,
          password: params.password,
        },
      };
    } else {
      return {
        key: false,
        data: {
          username: params.username,
          phoneNumber: params.phoneNumber,
        },
      };
    }
  } catch (error) {
    console.log('Error at saveTokenDataFromSignInAlertScreen:', error.message);
  }
});

export const checkVerifyCodeRequest = createAsyncThunk('auth/checkVerifyCodeRequest', async params => {
  try {
    const response = await authApi.checkVerifyCode(params);
    return response;
  } catch (error) {
    console.log('Error at checkVerifyCodeRequest:', error.message);
  }
});

export const changeInfoAfterSignUpRequest = createAsyncThunk('auth/changeInfoAfterSignUpRequest', async params => {
  try {
    const response = await authApi.changeInfoAfterSignUp(params);
    const jsonData = await AsyncStorage.getItem('dataPersist');
    const data = JSON.parse(jsonData);
    const newData = {
      ...data,
      avatar: response.data.avatar,
    };
    const newJsonData = JSON.stringify(newData);
    await AsyncStorage.setItem('dataPersist', newJsonData);
    return response;
  } catch (error) {
    console.log('Error at changeInfoAfterSignUpRequest:', error.message);
  }
});

export const logoutRequest = createAsyncThunk('auth/logoutRequest', async params => {
  try {
    await AsyncStorage.removeItem('tokenPersist');
    const response = await authApi.logout(params);
    return response;
  } catch (error) {
    console.log('Error at logoutRequest:', error.message);
  }
});

export const loginRequestFromSignInScreen = createAsyncThunk('auth/loginRequestFromSignInScreen', async params => {
  try {
    console.log("Login request:", params);
    const response = await authApi.login(params);
    console.log("Login response:", response);

    return response;
  } catch (error) {
    console.log('Error at loginRequestFromSignInScreen:', error.message);
  }
});

export const loginRequestFromSelectAccountScreen = createAsyncThunk('auth/loginRequestFromSelectAccountScreen', async params => {
  try {
    const response = await authApi.login(params);
    return response;
  } catch (error) {
    console.log('Error at loginRequestFromSelectAccountScreen:', error.message);
  }
});

const auth = createSlice({
  name: 'auth',
  initialState: {
    showSplash: true,
    inApp: false,

    usernameMain: null,
    phoneNumberMain: null,
    passwordMain: null,
    avatarMain: null,

    tokenPersist: null,
    tokenMain: null,
    deviceToken: null,

    haveDataPersist: false,
    usernamePersist: null,
    phoneNumberPersist: null,
    passwordPersist: null,
    avatarPersist: null,

    usernameCreated: null,
    birthdayCreated: null,
    phoneNumberCreated: null,
    passwordCreated: null,
    avatarCreated: null,

    loadingLoginRequestFromSignInScreen: false,
    loadingLoginRequestFromSelectAccountScreen: false,

    loadingSignUpRequest: false,
    createAccountStatus: null,
    signInStatus: null,

    loadingLoginRequestFromSignInAlertScreen: true,

    loadingCheckVerifyCodeRequest: false,
    checkVerifyCodeRequestStatus: null,

    loadingChangeInfoAfterSignUpRequest: false,

    loadingLogoutRequest: false,

  },
  reducers: {
    saveUsernameCreated: (state, action) => {
      state.usernameCreated = action.payload.usernameCreated;
    },
    savePhoneNumberCreated: (state, action) => {
      state.phoneNumberCreated = action.payload.phoneNumberCreated;
    },
    savePasswordCreated: (state, action) => {
      state.passwordCreated = action.payload.passwordCreated;
    },
    resetCreateAccountStatus: state => {
      state.createAccountStatus = null;
    },
    resetSignInStatus: state => {
      state.signInStatus = null
    },
  },
  extraReducers: {
    [bootstrapAsync.pending]: () => {

    },
    [bootstrapAsync.rejected]: () => {

    },
    [bootstrapAsync.fulfilled]: (state, action) => {
      state.showSplash = false;
      if (action.payload.token) {
        state.inApp = true;
        state.usernameMain = action.payload.data.username;
        state.phoneNumberMain = action.payload.data.phoneNumber;
        state.passwordMain = action.payload.data.password;
        state.avatarMain = action.payload.data.avatar;
      }
      if (action.payload.data) {
        state.haveDataPersist = true;
        state.usernamePersist = action.payload.data.username;
        state.phoneNumberPersist = action.payload.data.phoneNumber;
        state.passwordPersist = action.payload.data.password;
        state.avatarPersist = action.payload.data.avatar;
      }

      state.deviceToken = action.payload.deviceToken;
      
      // if (action.payload.key === 'TD') {
      //   state.inApp = true;
      //   state.usernameMain = action.payload.data.username;
      //   state.phoneNumberMain = action.payload.data.phoneNumber;
      //   state.passwordMain = action.payload.data.password;
      //   state.avatarMain = action.payload.data.avatar;
      //   state.haveDataPersist = true;
      //   state.usernamePersist = action.payload.data.username;
      //   state.phoneNumberPersist = action.payload.data.phoneNumber;
      //   state.passwordPersist = action.payload.data.password;
      //   state.avatarPersist = action.payload.data.avatar;
      // } else if (action.payload.key === 'nTD') {
      //   state.haveDataPersist = true;
      //   state.usernamePersist = action.payload.data.username;
      //   state.phoneNumberPersist = action.payload.data.phoneNumber;
      //   state.passwordPersist = action.payload.data.password;
      //   state.avatarPersist = action.payload.data.avatar;
      // } // else if (action.payload.key === 'nTnD') {
      // // nothing
      // // }
    },



    [signUpRequest.pending]: state => {
      state.loadingSignUpRequest = true;
    },
    [signUpRequest.rejected]: () => {

    },
    [signUpRequest.fulfilled]: (state, action) => {
      state.loadingSignUpRequest = false;
      if (action.payload.code === RES_CODE.OK) {
        state.createAccountStatus = 'SUCCESS';
      } else {
        state.createAccountStatus = 'FAILED';
      }
    },

    [loginRequestFromSignInAlertScreen.pending]: () => {

    },
    [loginRequestFromSignInAlertScreen.rejected]: () => {

    },
    [loginRequestFromSignInAlertScreen.fulfilled]: (state, action) => {
      state.loadingLoginRequestFromSignInAlertScreen = false;
      if (action.payload.code === RES_CODE.OK) {
        state.tokenMain = action.payload.data.token;
        state.usernameMain = action.payload.data.username;
      }
    },

    [saveTokenDataFromSignInAlertScreen.pending]: () => {

    },
    [saveTokenDataFromSignInAlertScreen.rejected]: () => {

    },
    [saveTokenDataFromSignInAlertScreen.fulfilled]: (state, action) => {
      state.haveDataPersist = true;
      state.usernamePersist = action.payload.data.username;
      state.phoneNumberPersist = action.payload.data.phoneNumber;
      if (action.payload.key) {
        state.passwordPersist = action.payload.data.password;
      } else {
        state.passwordPersist = null;
      }
    },

    [checkVerifyCodeRequest.pending]: (state) => {
      state.loadingCheckVerifyCodeRequest = true;
    },
    [checkVerifyCodeRequest.rejected]: () => {

    },
    [checkVerifyCodeRequest.fulfilled]: (state, action) => {
      state.loadingCheckVerifyCodeRequest = false;
      if (action.payload.code === RES_CODE.OK) {
        state.checkVerifyCodeRequestStatus = 'SUCCESS';
        state.tokenMain = action.payload.data.token;
      } else {
        state.checkVerifyCodeRequestStatus = 'FAILED';
      }
    },

    [changeInfoAfterSignUpRequest.pending]: (state) => {
      state.loadingChangeInfoAfterSignUpRequest = true;
    },
    [changeInfoAfterSignUpRequest.rejected]: () => {

    },
    [changeInfoAfterSignUpRequest.fulfilled]: (state, action) => {
      state.loadingChangeInfoAfterSignUpRequest = false;
      if (action.payload.code === RES_CODE.OK) {
        state.inApp = true;
        state.avatarMain = action.payload.data.avatar;
        state.usernameMain = action.payload.data.username;
        state.phoneNumberMain = action.payload.data.phoneNumber;
        // is_blocked
        // online
        state.avatarPersist = action.payload.data.avatar;
      } else {

      }
    },
    [loginRequestFromSignInScreen.pending]: (state) => {
      state.loadingLoginRequestFromSignInScreen = true;
    },
    [loginRequestFromSignInScreen.rejected]: () => {

    },
    [loginRequestFromSignInScreen.fulfilled]: (state, action) => {
      state.loadingLoginRequestFromSignInScreen = false;
      switch(action.payload.code) {
        case RES_CODE.OK:
          state.inApp = true;
          state.usernameMain = action.payload.data.username;
          state.tokenMain = action.payload.data.token;
          // AsyncStorage
          break;
        case RES_CODE.WRONG_PASSWORD:
          state.signInStatus = {
            error: {
              message: action.payload.message
            }
          }
          break;
        case RES_CODE.PHONE_NUMBER_UNMATCH:
          state.signInStatus = {
            error: {
              message: action.payload.message
            }
          }
          break;
      }
    },
    [loginRequestFromSelectAccountScreen.pending]: (state) => {
      state.loadingLoginRequestFromSelectAccountScreen = true;
    },
    [loginRequestFromSelectAccountScreen.rejected]: () => {

    },
    [loginRequestFromSelectAccountScreen.fulfilled]: (state, action) => {
      state.loadingLoginRequestFromSelectAccountScreen = false;
      if (action.payload.code === RES_CODE.OK) {
        state.inApp = true;
        state.usernameMain = action.payload.data.username;
        state.tokenMain = action.payload.data.token;
        // AsyncStorage
      }
    },

    [logoutRequest.pending]: (state) => {
      state.loadingLogoutRequest = true;
    },
    [logoutRequest.rejected]: () => {

    },
    [logoutRequest.fulfilled]: (state, action) => {
      state.loadingLogoutRequest = false;
      state.inApp = false;
      state.tokenMain = null;
      state.tokenPersist = null;
      if (action.payload.code === RES_CODE.OK) {

      } else {

      }
    },
  },
});

const { reducer, actions } = auth;

export const {
  saveUsernameCreated,
  savePhoneNumberCreated,
  savePasswordCreated,
  resetCreateAccountStatus,
  resetSignInStatus,
} = actions;
export default reducer;