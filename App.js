import * as React from 'react';
import { Button, Settings, Text, TextInput, View } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './src/screens/LoginScreen';
import RegisterScreen from './src/screens/RegisterScreen';
import PostScreen from './src/screens/PostScreen';
import ListFriendScreen from './src/screens/ListFriendScreen';
import Home from './src/Home';
import {AuthContext, LoginContext, RegisterContext} from './src/contexts/MyContexts'
import axios from 'axios';
import CommentScreen from './src/screens/CommentScreen';
import SplashScreen from './src/screens/SplashScreen'
import { registerCustomIconType } from 'react-native-elements';

const API_SERVER_URL = 'https://hidden-refuge-96933.herokuapp.com/';

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

      // This will switch to the App screen or Auth screen and this loading
      // screen will be unmounted and thrown away.
      dispatch({ type: 'RESTORE_TOKEN', token: userToken });
    };

    bootstrapAsync();
  }, []);

  const authContext = React.useMemo(
    () => ({
      signIn: async data => {
        setLoginState({error: false, isLoading: true});

        axios.post(API_SERVER_URL + 'login', {
          phonenumber: data.phonenumber,
          password: data.password
        })
        .then(function (response) {
          console.log(response.data);
          if (response.data.code == 1000) { // success
            setLoginState({error: undefined, isLoading: false});
            dispatch({ type: 'SIGN_IN', token: response.data.data.token });
            AsyncStorage.setItem('userToken', response.data.data.token);
          }
          else if (response.data.code == 9993) { // failed
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
        // In a production app, we need to send user data to server and get a token
        // We will also need to handle errors if sign up failed
        // After getting token, we need to persist the token using `AsyncStorage`
        // In the example, we'll use a dummy token
        setSignupState({error: false, isLoading: true});

        axios.post(API_SERVER_URL + 'signup', {
          phonenumber: data.phonenumber,
          password: data.password,
          uuid: 'device-01'
        }).then((response) => {
          if (response.data.code === 1000) { // sign up success
            dispatch({ type: 'SIGN_IN', token: 'dummy-auth-token' });
            setSignupState({error: undefined, isLoading: false});
          } else if (response.data.code === 9996) { // phone number existed
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
                  <Stack.Screen
                    name="LoginScreen"
                    component={LoginScreen}
                    options={{
                      title: 'Login',
                      animationTypeForReplace: state.isSignout ? 'pop' : 'push',
                      headerShown: false
                    }}
                  />
                  <Stack.Screen
                    name="RegisterScreen"
                    component={RegisterScreen}
                    options={{ title: 'Register' }}
                  />
                </>
              ) : (
                    // User is signed in
                    <>
                      <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
                      <Stack.Screen name="PostScreen" component={PostScreen} />
                      <Stack.Screen name="CommentScreen" component={CommentScreen} options={{ title: 'Bình luận' }} />
                      <Stack.Screen name="ListFriendScreen" component={ListFriendScreen}/>
                    </>
                  )}
            </Stack.Navigator>
          </NavigationContainer>
        </RegisterContext.Provider>
      </LoginContext.Provider>
    </AuthContext.Provider>
  );
}