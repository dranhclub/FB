import React from 'react';
import { Text, View } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import NewfeedScreen from './screens/NewfeedScreen';
import NotificationScreen from './screens/NotificationScreen'
import MenuScreen from './screens/MenuScreen'
import CommentScreen from './screens/CommentScreen'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {createStackNavigator} from '@react-navigation/stack'
const Tab = createMaterialTopTabNavigator();
const Stack = createStackNavigator();

function NewfeedNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="NewfeedScreen" component={NewfeedScreen}
        options={{
          headerShown: false
        }} />
      <Stack.Screen name="CommentScreen" component={CommentScreen}
        options={{
          title:'Bình luận'
        }} />
    </Stack.Navigator>
  );
}

export default function Home() {
  return (
    <Tab.Navigator tabBarOptions={{showIcon: true, showLabel: false}}>
      <Tab.Screen name="NewfeedScreen" component={NewfeedNavigator}
        options={{
          tabBarIcon: (tabInfo) => (
            <FontAwesome5 name='newspaper' size={20}/>
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