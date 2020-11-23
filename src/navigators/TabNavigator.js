/**
 * File định nghĩa các tab chính trong ứng dụng
 */
import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import NewfeedScreen from '../screens/posts-screens/NewfeedScreen';
import NotificationScreen from '../screens/NotificationScreen'
import MenuScreen from '../screens/MenuScreen'
import ProfileScreen from '../screens/profile-screens/ProfileScreen'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
const Tab = createMaterialTopTabNavigator();

export default function TabNavigator() {
  return (
    <Tab.Navigator tabBarOptions={{showIcon: true, showLabel: false}}>
      <Tab.Screen name="NewfeedScreen" component={NewfeedScreen}
        options={{
          tabBarIcon: (tabInfo) => (
            <FontAwesome5 name='newspaper' size={20}/>
          ),
        }} />
      <Tab.Screen name="ProfileScreen" component={ProfileScreen}
        options={{
          tabBarIcon: (tabInfo) => (
            <FontAwesome5 name='user-circle' size={20} />
          ),
        }} />
      <Tab.Screen name="NotificationScreen" component={NotificationScreen}
        options={{
          tabBarIcon: (tabInfo) => (
            <FontAwesome5 name='bell' size={20}/>
          ),
        }} />
      <Tab.Screen name="MenuScreen" component={MenuScreen}
        options={{
          tabBarIcon: (tabInfo) => (
            <FontAwesome5 name='bars' size={20} />
          ),
        }} />
    </Tab.Navigator>
  );
}