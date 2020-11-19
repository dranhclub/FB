/**
 * Component gốc
 * Khởi động ứng dụng, hiển thị splashscreen
 * Load token từ bộ nhớ trong của thiết bị
 * Nếu không tồn tại token thì hiện màn hình đăng nhập
 */
import * as React from 'react';
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {AuthContext, LoginContext, RegisterContext} from './src/contexts/MyContexts'
import ResponseCode from './src/constants/ResponeCode';

// Child screens
import TabNavigator from './src/TabNavigator';
import LoginScreen from './src/screens/auth-screens/LoginScreen';
import RegisterScreen from './src/screens/auth-screens/RegisterScreen';
import PostScreen from './src/screens/posts-screens/PostScreen';
import ChangePasswordScreen from './src/screens/auth-screens/ChangePasswordScreen';
import ListFriendScreen from './src/screens/friend-screens/ListFriendScreen';
import CommentScreen from './src/screens/posts-screens/CommentScreen';
import SplashScreen from './src/screens/SplashScreen'
import ReportScreen from './src/screens/posts-screens/ReportScreen';
import SearchScreen from './src/screens/SearchScreen';
import EditProfileScreen from './src/screens/profile-screens/EditProfileScreen';
import FriendScreen from './src/screens/friend-screens/FriendScreen';
import ListFriendRequestsScreen from './src/screens/friend-screens/ListFriendRequestsScreen';
import ListFriendSuggestionsScreen from './src/screens/friend-screens/ListFriendSuggestionsScreen';
import EmotionScreen from './src/screens/posts-screens/EmotionScreen';
import UpdateInfoAfterRegisterScreen from './src/screens/auth-screens/UpdateInfoAfterRegisterScreen';

// const API_SERVER_URL = 'https://hidden-refuge-96933.herokuapp.com/';
const API_SERVER_URL = 'http://192.168.1.11:3000/';

const Stack = createStackNavigator();

export default function App({ navigation }) {
  const [state, dispatch] = React.useReducer(
    (prevState, action) => {
      switch (action.type) {
        case 'RESTORE_TOKEN':
          return {
            ...prevState,
            userToken: action.token,
            isLoading: false,
          };
        case 'SIGN_IN':
          return {
            ...prevState,
            isSignout: false,
            userToken: action.token,
          };
        case 'SIGN_OUT':
          return {
            ...prevState,
            isSignout: true,
            userToken: null,
          };
      }
    },
    {
      isLoading: true,
      isSignout: false,
      userToken: null,
    }
  );

  const [loginState, setLoginState] = React.useState({error: undefined, isLoading: false});
  const [signupState, setSignupState] = React.useState({error: undefined, isLoading: false});

  React.useEffect(() => {
    // Fetch the token from storage then navigate to our appropriate place
    const bootstrapAsync = async () => {
      let userToken;

      try {
        userToken = await AsyncStorage.getItem('userToken');
      } catch (e) {
        console.log('Restoring token failed')
        console.log(e);
      }

      // After restoring token, we may need to validate it in production apps
      dispatch({ type: 'RESTORE_TOKEN', token: userToken });
    };

    bootstrapAsync();
  }, []);

  // Xử lí logic đăng nhập, đăng ký, đăng xuất
  const authContext = React.useMemo(
    () => ({
      signIn: async data => {
        setLoginState({error: false, isLoading: true});

        axios.post(API_SERVER_URL + 'login', {
          phonenumber: data.phonenumber,
          password: data.password,
          name: 'Hoang'
        })
        .then(function (response) {
          console.log(response.data);
          if (response.data.code === ResponseCode.OK) { // success
            setLoginState({error: undefined, isLoading: false});
            dispatch({ type: 'SIGN_IN', token: response.data.data.token });
            AsyncStorage.setItem('userToken', response.data.data.token);
          }
          else if (response.data.code == ResponseCode.WRONG_PASSWORD) { // failed
            setLoginState({error: 'INCORRECT', isLoading: false});
          } else {
            // unknown respone code
          }
        })
        .catch(function (error) {
          console.log(error);
          setLoginState({error: 'NET_ERR', isLoading: false})
        });
      },
      signOut: () => {
        dispatch({ type: 'SIGN_OUT' })
        AsyncStorage.removeItem('userToken');
      },
      signUp: async data => {
        setSignupState({error: false, isLoading: true});

        axios.post(API_SERVER_URL + 'signup', {
          phonenumber: data.phonenumber,
          password: data.password,
          uuid: 'device-01'
        }).then((response) => {
          if (response.data.code === ResponseCode.OK) {
            dispatch({ type: 'SIGN_IN', token: 'dummy-auth-token' });
            setSignupState({error: undefined, isLoading: false});
          } else if (response.data.code === ResponseCode.USER_EXISTED) {
            setSignupState({error: 'USER_EXISTED', isLoading: false});
          } else { 
            setSignupState({error: 'UNKNOWN', isLoading: false});
          }
        }).catch(function (error) {
          console.log(error);
          setSignupState({ error: 'NET_ERR', isLoading: false })
          });
      },
    }),
    []
  );

  return (
    <AuthContext.Provider value={authContext}>
      <LoginContext.Provider value={loginState}>
        <RegisterContext.Provider value={signupState}>
          <NavigationContainer>
            <Stack.Navigator>
              {state.isLoading ? (
                // We haven't finished checking for the token yet
                <Stack.Screen name="Splash" component={SplashScreen} options={{headerShown: false}} />
              ) : state.userToken == null ? (
                // No token found, user isn't signed in\
                <>
                  <Stack.Screen name="LoginScreen" component={LoginScreen} />
                  <Stack.Screen name="RegisterScreen" component={RegisterScreen} options={{ title: 'Đăng ký' }} />
                  <Stack.Screen name="UpdateInfoAfterRegisterScreen" component={UpdateInfoAfterRegisterScreen} options={{ title: 'Đăng ký' }} />
                </>
              ) : (
                    // User is signed in
                    <>
                      <Stack.Screen name="Home" component={TabNavigator} options={{ headerShown: false }} />
                      <Stack.Screen name="PostScreen" component={PostScreen} />
                      <Stack.Screen name="EmotionScreen" component={EmotionScreen} options={{title: 'Bạn đang cảm thấy thế nào?'}}/>
                      <Stack.Screen name="CommentScreen" component={CommentScreen} options={{ title: 'Bình luận' }} />
                      <Stack.Screen name="ChangePasswordScreen" component={ChangePasswordScreen} options={{ title: 'Đổi mật khẩu' }} />
                      <Stack.Screen name="FriendScreen" component={FriendScreen} options={{title: 'Bạn bè'}}/>
                      <Stack.Screen name="ListFriendScreen" component={ListFriendScreen} options={{title: 'Danh sách bạn bè'}}/>
                      <Stack.Screen name="ListFriendRequestsScreen" component={ListFriendRequestsScreen} options={{title: 'Lời mời kết bạn'}}/>
                      <Stack.Screen name="ListFriendSuggestionsScreen" component={ListFriendSuggestionsScreen} options={{title: 'Gợi ý kết bạn'}}/>
                      <Stack.Screen name="ReportScreen" component={ReportScreen} options={{title: 'Báo cáo'}} />
                      <Stack.Screen name="EditProfileScreen" component={EditProfileScreen} options={{ title: 'Chỉnh sửa trang cá nhân'}}  />
                      <Stack.Screen name="SearchScreen" component={SearchScreen} />
                    </>
                  )}
            </Stack.Navigator>
          </NavigationContainer>
        </RegisterContext.Provider>
      </LoginContext.Provider>
    </AuthContext.Provider>
  );
}