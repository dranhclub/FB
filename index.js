import 'react-native-gesture-handler';
import { AppRegistry } from 'react-native';
import { name as appName } from './app.json';
import messaging from '@react-native-firebase/messaging';
import AppContainer from './AppContainer';

AppRegistry.registerComponent(appName, () => AppContainer);

// Register background handler
messaging().setBackgroundMessageHandler(async remoteMessage => {
  console.log('Message handled in the background!', remoteMessage);
});

