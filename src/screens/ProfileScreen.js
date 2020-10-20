import React, { useState } from 'react';
import { Button, Image, StyleSheet, Text, View, FlatList } from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import RoundedButton from '../components/RoundedButton';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Post from '../components/Post';

const exampleCoverImage = require('../imgs/example.jpg');
const exampleAvatar = require('../imgs/default-avatar.jpg');

export default function ProfileScreen({navigation}) {

  const typicalFriends = [
    {
      id: 1,
      avatar: {uri: 'https://picsum.photos/seed/exampleAvt1/200/200'},
      name: 'Huy Thao'
    },
    {
      id: 2,
      avatar: {uri: 'https://picsum.photos/seed/exampleAvt2/200/200'},
      name: 'Huyền Ngọc'
    },
    {
      id: 3,
      avatar: {uri: 'https://picsum.photos/seed/exampleAvt3/200/200'},
      name: 'Minh Ánh'
    },
    {
      id: 4,
      avatar: {uri: 'https://picsum.photos/seed/exampleAvt4/200/200'},
      name: 'Đỗ Duy Quang'
    },
    {
      id: 5,
      avatar: {uri: 'https://picsum.photos/seed/exampleAvt5/200/200'},
      name: 'Huyền Ngọc'
    },
    {
      id: 6,
      avatar: {uri: 'https://picsum.photos/seed/exampleAvt6/200/200'},
      name: 'Huy Hoàng'
    },
  ];
  const featuredPhotos = [
    {uri: 'https://picsum.photos/seed/examplePhoto1/200/200'},
    {uri: 'https://picsum.photos/seed/examplePhoto2/200/200'},
    {uri: 'https://picsum.photos/seed/examplePhoto3/200/200'},
    {uri: 'https://picsum.photos/seed/examplePhoto4/200/200'},
    {uri: 'https://picsum.photos/seed/examplePhoto5/200/200'},
    {uri: 'https://picsum.photos/seed/examplePhoto6/200/200'},
    {uri: 'https://picsum.photos/seed/examplePhoto7/200/200'},
    {uri: 'https://picsum.photos/seed/examplePhoto8/200/200'},
    {uri: 'https://picsum.photos/seed/examplePhoto9/200/200'},
  ]

  return(
    <ScrollView>
      <View style={styles.profileContainer}>
        {/* Cover */}
        <View style={styles.wrapper}>
          <Image style={styles.coverImage} source={exampleCoverImage}></Image>
          <View style={{justifyContent: 'space-around', flexDirection: 'row'}}>
            <Image style={styles.avatarImage} source={exampleAvatar}></Image>
          </View>
          <View style={{justifyContent: 'space-around', flexDirection: 'row'}}>
            <Text style={{fontSize: 25, fontWeight: 'bold'}}>Trang Nguyen</Text>
          </View>
          <View style={{ flexDirection: 'row', marginVertical: 10}}>
            <RoundedButton style={{flex: 1}} backgroundColor={'#2979FF'} content={'Thêm vào tin'}/>
            <RoundedButton style={{marginLeft: 8}} backgroundColor={'#ccc'} content={'...'} color='black'/>
          </View>
        </View>
        {/* Info summary*/}
        <View style={styles.wrapper}>
          <View style={styles.infoItem}>
            <FontAwesome5 name='graduation-cap' size={20} color='#777'/>
            <Text style={{marginLeft: 10}}>Sinh viên tại ĐH Bách Khoa Hà Nội</Text>
          </View>
          <View style={styles.infoItem}>
            <FontAwesome5 name='home' size={20} color='#777'/>
            <Text style={{marginLeft: 10}}>Sống tại Thuận Thành</Text>
          </View>
          <View style={styles.infoItem}>
            <FontAwesome5 name='map-marker-alt' size={20} color='#777'/>
            <Text style={{marginLeft: 10}}>Đến từ Bắc Ninh</Text>
          </View>
          <View style={styles.infoItem}>
            <FontAwesome5 name='heart' size={20} color='#777' solid/>
            <Text style={{marginLeft: 10}}>Độc thân</Text>
          </View>
          <View style={styles.infoItem}>
            <FontAwesome5 name='ellipsis-h' size={20} color='#777'/>
            <Text style={{marginLeft: 10}}>Xem thông tin giới thiệu của Trang Nguyen</Text>
          </View>
        </View>
        {/* Featured photos */}
        <View style={styles.wrapper}>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', borderRadius: 10 }}>
            {
              featuredPhotos.map((photo, index) => {
                const imgStyle = { width: '31%', marginBottom: 10 };
                if (index % 3 == 1) {
                  imgStyle['marginHorizontal'] = 10;
                }
                return (
                  <View style={imgStyle} key={index}>
                    <Image source={photo} style={styles.featuredPhotos} />
                  </View>
                )
              })
            }
          </View>
          <RoundedButton style={{flex: 1}} content={'Chỉnh sửa chi tiết công khai'} backgroundColor={'#E3F2FD'}  color={'black'}/>
        </View>
        {/* Typical friends */}
        <View style={styles.wrapper}> 
          <Text style={{fontSize: 20, fontWeight: 'bold'}}>Bạn bè</Text>
          <Text style={{fontSize: 20}}>272 (81 bạn chung)</Text>
          <View style={{flexDirection: 'row', flexWrap: 'wrap'}}> 
          {
            typicalFriends.map((item, index)=>{
              const imgStyle = {width: '31%', marginBottom: 20};
              if (index % 3 == 1) {
                imgStyle['marginHorizontal'] = 10;
              }
              return(
                <TouchableOpacity containerStyle={imgStyle} key={item.id} onPress={()=>alert('goto friend profile')}>
                  <View>
                    <Image source={item.avatar} style={styles.friendAvatar} />
                    <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{item.name}</Text>
                  </View>
                </TouchableOpacity>
              )
            })
          }
          </View>
        </View>
      </View>
      {/* Walls */}
      <Post
      displayName='Anh Hoàng'
      text='Fugiat aliqua consectetur duis amet non tempor. Exercitation aute laboris incididunt excepteur qui ea enim irure reprehenderit exercitation. Mollit consectetur ullamco nostrud in deserunt cupidatat anim id mollit adipisicing exercitation. Adipisicing incididunt esse Lorem sint officia ad tempor. Eiusmod ad veniam pariatur aliqua qui ipsum tempor deserunt. Ullamco sunt veniam duis do magna Lorem veniam. Laborum aliqua commodo cillum ut ut enim pariatur.'
      key='postId1'
      time='Vừa xong'
      navigation={navigation}
      />
      <Post
        displayName='Anh Hoàng'
        text='Fugiat aliqua consectetur duis amet non tempor. Exercitation aute laboris incididunt excepteur qui ea enim irure reprehenderit exercitation. Mollit consectetur ullamco nostrud in deserunt cupidatat anim id mollit adipisicing exercitation. Adipisicing incididunt esse Lorem sint officia ad tempor. Eiusmod ad veniam pariatur aliqua qui ipsum tempor deserunt. Ullamco sunt veniam duis do magna Lorem veniam. Laborum aliqua commodo cillum ut ut enim pariatur.'
        key='postId2'
        time='Vừa xong'
        navigation={navigation}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  profileContainer : {
    backgroundColor: 'white',
    marginBottom: 10,
    padding: 10,
  },
  wrapper : {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  coverImage : {
    height: 200,
    width: '100%',
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
  },
  avatarImage: {
    width: 180,
    height: 180,
    borderRadius: 100,
    borderWidth: 5,
    borderColor: 'white',
    marginTop: -90,
  },
  infoItem: {
    flexDirection: 'row', 
    marginBottom: 10
  },
  friendAvatar: {
    borderRadius: 10, width: '100%', height: 120,
  },
  featuredPhotos: {
    width: '100%', height: 120,
  }
});