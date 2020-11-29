/**
 * Màn hình splash khi mới khởi động ứng dụng
 */
import React from 'react';
import {View, Text, Image} from 'react-native'
import {API_SERVER_URL} from '../apis/axiosClient';

export default function SplashScreen() {
  const logo = require('../imgs/logoFB.jpg');
  const banner = require('../imgs/bannerFB.jpg');
  return (
    <View style={{alignItems: 'center', flex: 1, backgroundColor: 'white'}}>
      <View style={{flex: 1, justifyContent: 'center'}}>
        <Image source={logo} style={{width: 80, height: 80}}/>
      </View>
      <View style={{marginBottom: 30, alignItems: 'center'}}>
        <Image source={banner} style={{width: 308/120*60, height: 60}}/>
        <Text>Fakebook - Learning React Native</Text>
        <Text style={{color: '#616161'}}>
           API_SERVER_URL: 
          {API_SERVER_URL}
        </Text>
      </View>
    </View>
  );
}