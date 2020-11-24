import 'react-native-gesture-handler';
import { AppRegistry } from 'react-native';
import { name as appName } from './app.json';
import messaging from '@react-native-firebase/messaging';
import AppContainer from './AppContainer';
import AppTest from './AppTest';


// AppRegistry.registerComponent(appName, () => AppContainer);

AppRegistry.registerComponent(appName, () => AppTest);

// Register background handler
messaging().setBackgroundMessageHandler(async remoteMessage => {
  console.log('Message handled in the background!', remoteMessage);
});

