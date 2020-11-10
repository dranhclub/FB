import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { View, Text, StyleSheet } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

const Tab = createMaterialTopTabNavigator();

function ShowAll() {
  return (
    <View>
      <Text>Show all</Text>
    </View>
  );
}

function Posts() {
  return (
    <View><Text>Bài viết</Text></View>
  );
}

function People() {
  return (
    <View><Text>Mọi người</Text></View>
  );
}

export function SearchBar() {
  return (
    <View style={styles.searchBar}>
      <FontAwesome5 name='search' color='#757575' size={20} />
      <TextInput placeholder='Tìm kiếm' />
    </View>
  );
};

export default function SearchScreen() {
  return (
    <Tab.Navigator
      tabBarOptions={{
        showLabel: true,
        activeTintColor: '#1565C0',
        inactiveTintColor: '#757575',
        labelStyle: { textTransform: 'none', fontSize: 16 }
      }}>
      <Tab.Screen name="ShowAll" component={ShowAll} options={{ tabBarLabel: 'Tất cả' }} />
      <Tab.Screen name="Posts" component={Posts} options={{ tabBarLabel: 'Bài viết' }} />
      <Tab.Screen name="People" component={People} options={{ title: 'Mọi người' }} />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  searchBar: {
    paddingHorizontal: 10,
    borderRadius: 100,
    height: 40,
    backgroundColor: '#ECEFF1',
    alignItems: 'center',
    flexDirection: 'row'
  }
});