import React from 'react';
import { Text, View,  StyleSheet, Image, FlatList } from 'react-native';
import { TouchableHighlight, TouchableOpacity } from 'react-native-gesture-handler';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Post from '../../components/Post';

const exampleAvatar = require('../../imgs/default-avatar.jpg');

const DATA = [
  {
    id: '1',
    avatar: { uri: 'https://picsum.photos/seed/anhhoang/200/200' },
    displayName: 'Anh Hoàng',
    time: 'Vừa xong',
    text: 'Non in magna fugiat Lorem aliquip dolor. Deserunt pariatur nulla id adipisicing sint nulla sunt commodo consequat esse enim deserunt. Sit fugiat in elit dolor adipisicing magna ex dolor. Ullamco laborum eiusmod elit est tempor laboris anim excepteur culpa anim commodo eiusmod. Non in magna fugiat Lorem aliquip dolor. Deserunt pariatur nulla id adipisicing sint nulla sunt commodo consequat esse enim deserunt. Sit fugiat in elit dolor adipisicing magna ex dolor. Ullamco laborum eiusmod elit est tempor laboris anim excepteur culpa anim commodo eiusmod.',
    photos : [],
    video : null,
    numLikes: 1,
    numComments: 0
  },
  {
    id: '2',
    avatar: { uri: 'https://picsum.photos/seed/huythao/200/200' },
    displayName: 'Huy Thao',
    time: '4 giờ',
    text: '😂😂😂',
    photos: [],
    video: {uri: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4'},    
    numLikes: 5,
    numComments: 3
  },
  {
    id: '3',
    avatar: { uri: 'https://picsum.photos/seed/khanhhuyen/200/200' },
    displayName: 'Khánh Huyền',
    time: '2 giờ',
    text: 'Thấy anh lúc chiều thế là ưng\nMê anh quá chừng thế là yêu.. 🤭',
    photos: [
      require('../../imgs/125269147_1093885694377989_4817391640640507065_o.jpg')
    ],
    video: null,
    numLikes: 20,
    numComments: 7
  },
  {
    id: '3.1',
    avatar: require('../../imgs/system32_comic.jpg'),
    displayName: 'System32 Comics',
    time: '7 giờ',
    text: 'Computer Test',
    photos: [
      require('../../imgs/computer_test.jpg')
    ],
    video: null,
    numLikes: 30,
    numComments: 3
  },
  {
    id: '4',
    avatar: require('../../imgs/codelearn.io_avatar.png'),
    displayName: 'CodeLearn.io',
    time: '4 giờ',
    text: 'Chuyện đâu của riêng ai...',
    photos: [
      require('../../imgs/codelearn_meme.jpg')
    ],
    video: null,
    numLikes: 21,
    numComments: 1
  },
  {
    id: '5',
    avatar: { uri: 'https://picsum.photos/seed/khanhhuyen/200/200' },
    displayName: 'Khánh Huyền',
    time: '2 giờ',
    text: 'Thấy anh lúc chiều thế là ưng\nMê anh quá chừng thế là yêu.. 🤭',
    photos: [
      { uri: 'https://picsum.photos/seed/anhhoang/200/200' }, 
      { uri: 'https://picsum.photos/seed/anhhoang2/200/200' }, 
      { uri: 'https://picsum.photos/seed/anhhoang3/200/200' }, 
      { uri: 'https://picsum.photos/seed/anhhoang4/200/200' }, 
    ],
    video: null,
    numLikes: 0,
    numComments: 0
  },
]

export default function NewfeedScreen({ navigation }) {

  /* Khung "Bạn đang nghĩ gì?" */
  const CreatePostView = () => {
    return (
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
    );
  }

  return (
    <View>
      <FlatList 
        ListHeaderComponent={CreatePostView}
        data={DATA}
        keyExtractor = {item => item.id}
        renderItem={({item})=>
          <Post 
            avatar={item.avatar}
            displayName={item.displayName}
            time={item.time}
            key={item.id}
            text={item.text}
            photos={item.photos}
            video={item.video}
            numLikes={item.numLikes}
            numComments={item.numComments}
          />}
        refreshing={false}
        onRefresh={()=>{}}
      />
    </View>
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