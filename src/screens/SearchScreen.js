/*
  Màn hình tìm kiếm
*/ 
import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import { ScrollView, TextInput } from 'react-native-gesture-handler';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Post from '../components/Post';

const Tab = createMaterialTopTabNavigator();
const examplePeople = [
  {
    name: 'Minh Ánh',
    avatar: 'https://picsum.photos/seed/minhanh/200/200',
    description: 'Bạn bè - Vinh'
  },
  {
    name: 'Ngọc Ánh',
    avatar: 'https://picsum.photos/seed/ngocanh/200/200',
    description: 'Bạn bè - Hà Nội'
  },
];

function PeopleView() {
  return(
    <View style={{ backgroundColor: 'white', borderRadius: 10, margin: 10 }}>
      <Text style={{ fontWeight: 'bold', fontSize: 20, padding: 20 }}>Mọi người</Text>
      {
        examplePeople.map((item, index) => {
          return (
            <TouchableOpacity key={index}>
              <View style={{ flexDirection: 'row', alignItems: 'center', padding: 10 }}>
                <Image
                  style={{ width: 60, height: 60, borderRadius: 100 }}
                  source={{ uri: item.avatar }}
                />
                <View style={{ flex: 1, paddingHorizontal: 10 }}>
                  <Text style={{ fontWeight: 'bold', fontSize: 16 }}>{item.name}</Text>
                  <Text>{item.description}</Text>
                </View>
                <FontAwesome5 name='facebook-messenger' size={20} />
              </View>
            </TouchableOpacity>
          )
        })
      }
    </View>
  );
}

function PostView() {
  return(
    <View style={{ backgroundColor: 'white', borderRadius: 10, margin: 10 }}>
      <Text style={{ fontWeight: 'bold', fontSize: 20, padding: 20 }}>Bài viết</Text>
      <Post
        displayName='Minh Ánh'
        text='Non minim pariatur voluptate est. Magna eiusmod dolore Lorem nulla ad ex quis officia incididunt irure do pariatur fugiat. Ex ut commodo veniam ad commodo. Consequat irure culpa dolore commodo.'
        key='postId2'
        time='Vừa xong'
      />
    </View>
  );
}

function ShowAll() {
  return (
    <ScrollView>
      <PeopleView />
      <PostView />
    </ScrollView>
  );
}

function Posts() {
  return (
    <ScrollView>
      <PostView />
    </ScrollView>
  );
}

function People() {
  return (
    <ScrollView>
      <PeopleView />
    </ScrollView>
  );
}

export default function SearchScreen({navigation}) {

  const SearchBar = () => {
    return (
      <View style={styles.searchBar}>
        <FontAwesome5 name='search' color='#757575' size={20} />
        <TextInput placeholder='Tìm kiếm' value='Ánh'/>
      </View>
    );
  };

  React.useLayoutEffect(() => {
    navigation.setOptions({
       headerTitle: props => <SearchBar/>
    });
  }, [navigation]);

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