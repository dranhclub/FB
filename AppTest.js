import React, { useEffect } from 'react';
import { Alert, Text, View } from 'react-native';
import messaging from '@react-native-firebase/messaging';

async function saveTokenToDatabase(token) {
  console.log('token:', token);
}

export default function AppTest() {
  useEffect(() => {
    // Alert.alert('A new FCM message arrived!');
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
    });

    return unsubscribe;
  }, []);

  useEffect(() => {
    // Get the device token
    messaging()
      .getToken()
      .then(token => {
        // console.log("token:", token);
        return saveTokenToDatabase(token);
      });
      
    // If using other push notification providers (ie Amazon SNS, etc)
    // you may need to get the APNs token instead for iOS:
    // if(Platform.OS == 'ios') { messaging().getAPNSToken().then(token => { return saveTokenToDatabase(token); }); }

    // Listen to whether the token changes
    return messaging().onTokenRefresh(token => {
      saveTokenToDatabase(token);
    });
  }, []);

  return(
    <View>
      <Text>Hello</Text>
    </View>
  );
}