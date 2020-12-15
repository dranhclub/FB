import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import MainStackNavigator from './src/navigators/MainStackNavigator';
import AuthStackNavigator from './src/navigators/AuthStackNavigator';
import SplashScreen from './src/screens/SplashScreen';
import { bootstrapAsync } from './src/slices/authSlice';
import messaging from '@react-native-firebase/messaging';
import { Alert } from 'react-native';

const App = () => {
  const showSplash = useSelector(state => state.auth.showSplash);
  const inApp = useSelector(state => state.auth.inApp);
  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(bootstrapAsync());
  }, []);

  useEffect(() => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      Alert.alert('Thông báo', JSON.stringify(remoteMessage.notification.body));
    });

    return unsubscribe;
  }, []);


  if (showSplash) {
    return <SplashScreen />;
  }

  if (inApp) {
    return <MainStackNavigator />;
  } else {
    return <AuthStackNavigator />;
  }
};

export default App;
