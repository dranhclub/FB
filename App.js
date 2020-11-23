import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import MainStackNavigator from './src/navigators/MainStackNavigator';
import AuthStackNavigator from './src/navigators/AuthStackNavigator';
import SplashScreen from './src/screens/SplashScreen';
import { bootstrapAsync } from './src/slices/authSlice';

const App = () => {
  const showSplash = useSelector(state => state.auth.showSplash);
  const inApp = useSelector(state => state.auth.inApp);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(bootstrapAsync());
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
