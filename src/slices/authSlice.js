import AsyncStorage from '@react-native-community/async-storage';
import { createAsyncThunk, createSlice, current } from '@reduxjs/toolkit';
import authApi from '../apis/authApi';
import * as RES_CODE from './../constants/RES_CODE';
import messaging from '@react-native-firebase/messaging';

export const bootstrapAsync = createAsyncThunk('auth/bootstrapAsync', async (params, {dispatch, getState}) => {
  console.log('Running bootstrapAsync');
  try {
    // Lấy thông tin từ tài khoản hiện tại
    let temp = await AsyncStorage.getItem('currentUser');
    const currentUser = temp !== null ? JSON.parse(temp) : null;
    console.log("currentUser:", currentUser);

    // Lấy thông tin về các tài khoản đã từng đăng nhập
    temp = await AsyncStorage.getItem('savedUsers');
    const savedUsers = temp !== null ? JSON.parse(temp) : [];
    console.log("savedUsers:", savedUsers);

    if (currentUser) {
      await dispatch(loginRequest({
        phoneNumber: currentUser.phoneNumber,
        password: currentUser.password
      }));
      if (getState().auth.loggedIn) {
        return {
          key: 'HAS CURRENT, LOGIN SUCCESS',
          currentUser: currentUser
        };
      } else {
        return {key: 'HAS CURRENT, LOGIN FAILED'};
      }
    } else if (savedUsers.length > 0) {
      return {
        key: 'HAS NOT CURRENT, HAS HISTORY',
        savedUsers: savedUsers
      };
    } else {
      return {
        key: 'HAS NOT CURRENT, HAS NOT HISTORY',
        savedUsers: []
      }
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

export const saveAccount = createAsyncThunk('auth/saveAccount', async currentUser => {
  try {
    // Save current
    AsyncStorage.setItem('currentUser', JSON.stringify(currentUser));
    console.log('saved currentUser:', currentUser);

    // Add current to history
    const temp = await AsyncStorage.getItem('savedUsers');
    let savedUsers = temp !== null ? JSON.parse(temp) : [];
    if (savedUsers.length == 0) {
      savedUsers = [currentUser];
    } else {
      let existed = false;
      for (let i = 0; i < savedUsers.length; i++) {
        if (savedUsers[i].phoneNumber === currentUser.phoneNumber) {
          existed = true;
          break;
        }
      }
      if (!existed) {
        savedUsers.push(currentUser);
      }
    }
    AsyncStorage.setItem('savedUsers', JSON.stringify(savedUsers));
    console.log('saved savedUsers:', savedUsers);

    return {
      currentUser,
      savedUsers
    }
  } catch (error) {
    console.log('Error at save account:', error.message);
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

export const changeInfoAfterSignUpRequest = createAsyncThunk('auth/changeInfoAfterSignUpRequest', async (params) => {
  try {
    const response = await authApi.changeInfoAfterSignUp(params);
    return response;
  } catch (error) {
    console.log('Error at changeInfoAfterSignUpRequest:', error.message);
  }
});

export const loginRequest = createAsyncThunk('auth/loginRequest', async (params, {dispatch}) => {
  // lấy ra device token
  let deviceToken = await messaging().getToken();
  console.log("deviceToken:", deviceToken);
  const response = await authApi.login({
    ...params,
    deviceToken,
    uuid: `${Math.trunc(1000 + 9000 * Math.random())}`,
  });

  if (response.code === RES_CODE.OK) {
    let currentUser = response.data;
    dispatch(saveAccount(currentUser));
  }

  return response;
});

export const logoutRequest = createAsyncThunk('auth/logoutRequest', async params => {
  try {
    const response = await authApi.logout(params);
    await AsyncStorage.removeItem('currentUser');
    console.log("LOG OUT, removed currentUser");
    return response;
  } catch (error) {
    console.log('Error at logoutRequest:', error.message);
  }
});

export const removeAccountThunk = createAsyncThunk('auth/removeAccountThunk', async account => {
  try {
    const temp = await AsyncStorage.getItem('savedUsers');
    let savedUsers = JSON.parse(temp);
    let id = -1;
    console.log("saved usersa d a", savedUsers);
    savedUsers.forEach((value, index) => {
      console.log('for each',index,value);
      if (value.phoneNumber === account.phoneNumber) {
        console.log('found one');
        id = index;
      }
    });
    console.log("user to remove:", id);
    savedUsers.splice(id, 1);
    await AsyncStorage.setItem('savedUsers', JSON.stringify(savedUsers));
    console.log('removed account, accounts left:', savedUsers);
    return savedUsers;
  } catch (error) {
    console.log('Error at remove account thunk', error);
  }
});

const auth = createSlice({
  name: 'auth',
  initialState: {
    showSplash: true,
    inApp: false,

    loggedIn: false,
    currentUser: null,
    savedUsers: [],
 
    usernameCreated: null,
    birthdayCreated: null,
    phoneNumberCreated: null,
    passwordCreated: null,
    avatarCreated: null,
    
    signUpError: null,
    signInError: null,
    
    checkVerifyCodeRequestStatus: null,
    
    loading: false,
  },
  reducers: {
    saveUsernameCreated: (state, action) => {
      state.usernameCreated = action.payload.usernameCreated;
    },
    saveBirthdayCreated: (state, action) => {
      state.birthdayCreated = action.payload.birthdayCreated;
    },
    savePhoneNumberCreated: (state, action) => {
      state.phoneNumberCreated = action.payload.phoneNumberCreated;
    },
    savePasswordCreated: (state, action) => {
      state.passwordCreated = action.payload.passwordCreated;
    },
    clearSignUpError: state => {
      state.signUpError = null;
    },
    clearSignInError: state => {
      state.signInError = null
    },
  },
  extraReducers: {
    /* Bootstrap Async */
    [bootstrapAsync.pending]: (state) => {
      state.showSplash = true;
    },
    [bootstrapAsync.fulfilled]: (state, action) => {
      state.showSplash = false;
      switch(action.payload.key) {
        case 'HAS CURRENT, LOGIN SUCCESS':
          state.inApp = true;
          state.loggedIn = true;
          state.currentUser = action.payload.currentUser;
          break;
        case 'HAS CURRENT, LOGIN FAILED':
          // Hiện màn hình nhập sđt, mật khẩu
          state.loggedIn = false;
          state.currentUser = action.payload.currentUser;
          break;
        case 'HAS NOT CURRENT, HAS HISTORY':
          // show select account screen
          state.loggedIn = false;
          state.savedUsers = action.payload.savedUsers;
          break;
        case 'HAS NOT CURRENT, HAS NOT HISTORY':
          // show sign in screen
          state.loggedIn = false;
          break;
        default:
          throw "bootstrap key invalid";
      }
    },

    /* Sign Up Request */
    [signUpRequest.pending]: state => {
      state.loading = true;
    },
    [signUpRequest.fulfilled]: (state, action) => {
      state.loading = false;
      if (action.payload.code !== RES_CODE.OK) {
        signUpError = {message: action.payload.message};
      }
    },

    /* Save account */
    [saveAccount.pending]: (state)=>{
      state.loading = true;
    },
    [saveAccount.fulfilled]: (state, action)=>{
      state.loading = false;
      state.currentUser = action.payload.currentUser;
      state.savedUsers = action.payload.savedUsers;
    },

    /* Check Verify Code Request */
    [checkVerifyCodeRequest.pending]: (state) => {
      state.loadingCheckVerifyCodeRequest = true;
    },
    [checkVerifyCodeRequest.fulfilled]: (state, action) => {
      state.loadingCheckVerifyCodeRequest = false;
      if (action.payload.code === RES_CODE.OK) {
        state.checkVerifyCodeRequestStatus = 'SUCCESS';
        state.token = action.payload.data.token;
      } else {
        state.checkVerifyCodeRequestStatus = 'FAILED';
      }
    },

    /* Change Info After Sign Up Request */
    [changeInfoAfterSignUpRequest.pending]: (state) => {
      state.loading = true;
    },
    [changeInfoAfterSignUpRequest.fulfilled]: (state, action) => {
      state.loading = false;
      if (action.payload.code === RES_CODE.OK) {
        state.inApp = true;
        state.currentUser = action.payload.data;
      } else {
        
      }
    },

    /* Login Request */
    [loginRequest.pending]: (state) => {
      state.loading = true;
    },
    [loginRequest.rejected]: (state) => {
      state.loading = false;
    },
    [loginRequest.fulfilled]: (state, action) => {
      const response = action.payload;
      state.loading = false;
      if (response.code === RES_CODE.OK) {
        state.inApp = true;
        state.loggedIn = true;
        state.currentUser = response.data;
      } else if (response.code === RES_CODE.PHONE_NUMBER_UNMATCH || response.code === RES_CODE.WRONG_PASSWORD) {
        state.signInError = { message: response.data.message };
      } else {
        throw "Unknown response code";
      }
    },

    /* Logout Request */
    [logoutRequest.pending]: (state) => {
      state.loading = true;
    },
    [logoutRequest.fulfilled]: (state, action) => {
      state.loading = false;
      state.inApp = false;
      state.currentUser = null;
      if (action.payload.code === RES_CODE.OK) {

      } else {

      }
    },

    [removeAccountThunk.pending]: state => {
      state.loading = true;
    },
    [removeAccountThunk.fulfilled]: (state, action) => {
      state.loading = false;
      state.savedUsers = action.payload;
    }
  },
});

const { reducer, actions } = auth;

export const {
  saveUsernameCreated,
  saveBirthdayCreated,
  savePhoneNumberCreated,
  savePasswordCreated,
  clearSignUpError,
  clearSignInError,
} = actions;
export default reducer;
