import React, { useEffect } from 'react';
import { Text, View, Button, StyleSheet, Image } from 'react-native';
import { ScrollView, TextInput, TouchableHighlight, TouchableOpacity } from 'react-native-gesture-handler';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Post from '../components/Post';

const exampleAvatar = require('../imgs/default-avatar.jpg');
const exampleImages = [
  {uri: 'https://picsum.photos/seed/hello1/200/200'},
  {uri: 'https://picsum.photos/seed/hello2/200/200'},
  {uri: 'https://picsum.photos/seed/hello3/200/200'},
  {uri: 'https://picsum.photos/seed/hello4/200/200'},
];


export default function NewfeedScreen({ navigation }) {
  return (
    <ScrollView>
      <View style={styles.createPostView}>
        <View style={styles.createPostTopWrapper}>
          <Image source={exampleAvatar} style={styles.avatar} />
          <View style={styles.whatDoUThinkBtn}>
            <TouchableHighlight onPress={() => navigation.navigate('PostScreen')} underlayColor={'#ccc'}>
              <Text style={{ fontSize: 18 }}>Bạn đang nghĩ gì?</Text>
            </TouchableHighlight>
          </View>
        </View>
        <View style={styles.createPostBottomWrapper}>
          <View style={styles.postBtn}>
            <TouchableOpacity style={{ flexDirection: 'row', justifyContent: 'center' }}>
              <FontAwesome5 name={'edit'} size={15} />
              <Text style={{ fontSize: 12 }}> Trạng thái</Text>
            </TouchableOpacity>
          </View>
          <View style={{ borderLeftWidth: 1, borderRightWidth: 1, ...styles.postBtn }}>
            <TouchableOpacity style={{ flexDirection: 'row', justifyContent: 'center' }}>
              <FontAwesome5 name={'image'} size={15} />
              <Text style={{ fontSize: 12 }}> Ảnh</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.postBtn}>
            <TouchableOpacity style={{ flexDirection: 'row', justifyContent: 'center' }}>
              <FontAwesome5 name={'map-marker-alt'} size={15} />
              <Text style={{ fontSize: 12 }}> Check in</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* Posts list */}
      <Post
        displayName='Anh Hoàng'
        text='Fugiat aliqua consectetur duis amet non tempor. Exercitation aute laboris incididunt excepteur qui ea enim irure reprehenderit exercitation. Mollit consectetur ullamco nostrud in deserunt cupidatat anim id mollit adipisicing exercitation. Adipisicing incididunt esse Lorem sint officia ad tempor. Eiusmod ad veniam pariatur aliqua qui ipsum tempor deserunt. Ullamco sunt veniam duis do magna Lorem veniam. Laborum aliqua commodo cillum ut ut enim pariatur.'
        key='postId1'
        time='Vừa xong'
        images={exampleImages}
        navigation={navigation}
      />
      <Post
        displayName='Anh Hoàng'
        text='😀😂😂😊🤣❤😍😒👌😘'
        key='postId2'
        time='Vừa xong'
        images={exampleImages}
        navigation={navigation}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  createPostView: {
    backgroundColor: 'white',
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  whatDoUThinkBtn: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 25,
    justifyContent: 'center',
    flex: 1,
    paddingLeft: 10,
    marginLeft: 10,
  },
  createPostTopWrapper: {
    flexDirection: 'row',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  createPostBottomWrapper: {
    flexDirection: 'row',
  },
  postBtn: {
    height: 30,
    borderColor: '#ccc',
    flex: 1,
    justifyContent: 'center'
  },


  
});