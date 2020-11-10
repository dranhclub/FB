import React, { useRef, useState } from 'react';
import { Button, Text, View,Image,TouchableOpacity } from 'react-native';
import { ScrollView, TouchableHighlight } from 'react-native-gesture-handler';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import RBSheet from "react-native-raw-bottom-sheet";
import { useNavigation } from '@react-navigation/native';

export default function NotificationScreen() {
  const navigation = useNavigation();
  
  const exampleNotifs = [
    {
      image: {uri : 'https://picsum.photos/seed/exampleImg1/200/200'},
      content: 'Bình Thường đã nhắc đến bạn trong một bình luận trong ...',
      type: 'comment',
      time: 'Hôm qua lúc 23:31',
      read: false,
    },
    {
      image: {uri : 'https://picsum.photos/seed/exampleImg2/200/200'},
      content: 'Gia Bao Ngo đã bình luận về bài viết của Nguyễn Ngọc Ánh',
      type: 'comment',
      time: 'T.7 lúc 19:28',
      read: true
    },
    {
      image: {uri : 'https://picsum.photos/seed/exampleAvt3/200/200'},
      type: 'like',
      content: 'Huy Thao đã thích ảnh của bạn',
      time: '14 Th10 lúc 23:39',
      read: true
    },
    {
      image: {uri : 'https://picsum.photos/seed/exampleImg4/200/200'},
      content: 'Bình Thường đã nhắc đến bạn trong một bình luận trong ...',
      type: 'comment',
      time: 'Hôm qua lúc 23:31',
      read: false,
    },
    {
      image: {uri : 'https://picsum.photos/seed/exampleImg5/200/200'},
      content: 'Gia Bao Ngo đã bình luận về bài viết của Nguyễn Ngọc Ánh',
      type: 'comment',
      time: 'T.7 lúc 19:28',
      read: true
    },
    {
      image: {uri : 'https://picsum.photos/seed/exampleAvt6/200/200'},
      type: 'like',
      content: 'Huy Thao đã thích ảnh của bạn',
      time: '14 Th10 lúc 23:39',
      read: true
    },
    {
      image: {uri : 'https://picsum.photos/seed/exampleAvt7/200/200'},
      type: 'like',
      content: 'Huy Thao đã thích ảnh của bạn',
      time: '14 Th10 lúc 23:39',
      read: true
    },
  ]

  const refRBSheet = useRef();

  return(
    <ScrollView contentContainerStyle={{backgroundColor: 'white'}}>
      {/* Header */}
      <View style={{flexDirection: 'row', justifyContent: 'space-between', padding: 10}}>
        <Text style={{fontSize: 25, fontWeight: 'bold'}}>Thông báo</Text>
        <TouchableOpacity onPress={()=>navigation.navigate("SearchScreen")}>
          <View style={{backgroundColor: '#ECEFF1', width: 40, height: 40, justifyContent: 'center', alignItems: 'center', borderRadius: 50}}>
            <FontAwesome5 size={22} name='search'/>
          </View>
        </TouchableOpacity>
      </View>

      {/* Notification items */}
      {
        exampleNotifs.map((item, index) => {
          const viewStyle = { flexDirection: 'row', padding: 10 };
          if (!item.read) {
            viewStyle['backgroundColor'] = '#E3F2FD'
          }
          var typeIcon = null;
          switch (item.type) {
            case 'comment':
              typeIcon = (
                <View style={{ flexDirection: 'row', justifyContent: 'flex-end', marginTop: -26 }}>
                  <View style={{ backgroundColor: '#7CB342', width: 30, height: 30, borderRadius: 25, alignItems: 'center', justifyContent: 'center' }}>
                    <FontAwesome5 name={'comment-alt'} color={'white'} solid />
                  </View>
                </View>
                );
                break;
            case 'like': 
            typeIcon = (
              <View style={{ flexDirection: 'row', justifyContent: 'flex-end', marginTop: -26 }}>
                <View style={{ backgroundColor: '#0091EA', width: 30, height: 30, borderRadius: 25, alignItems: 'center', justifyContent: 'center' }}>
                  <FontAwesome5 name={'thumbs-up'} color={'white'} solid />
                </View>
              </View>
              );
              break;
          }
          
          return (
            <View key={index} style={viewStyle}>
              <TouchableOpacity style={{flex: 1}} onPress={()=>alert('goto post')}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <View>
                    <Image source={item.image} style={{ width: 70, height: 70, borderRadius: 60 }} />
                    {typeIcon}
                  </View>
                  <View style={{ flex: 1, paddingHorizontal: 10 }}>
                    <Text style={{ fontSize: 16 }}>{item.content}</Text>
                    <Text style={{ fontSize: 14, color: '#777' }}>{item.time}</Text>
                  </View>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={()=>refRBSheet.current.open()}>
                <FontAwesome5 name='ellipsis-h' size={20} />
              </TouchableOpacity>
            </View>
          )
        })
      }
      
      {/* Options - bottom sheet */}
      <RBSheet
        height={200}
        ref={refRBSheet}
        closeOnDragDown={true}
        closeOnPressMask={true}
        customStyles={{
          wrapper: {
            backgroundColor: "transparent"
          },
          draggableIcon: {
            backgroundColor: "#000"
          }
        }}
      >
        <TouchableOpacity onPress={()=>alert("deleted")}>
          <View style={{padding: 20, flexDirection: 'row', alignItems: 'center'}}>
            <View style={{backgroundColor: '#ECEFF1', width: 40, height: 40, justifyContent: 'center', alignItems: 'center', borderRadius: 50}}>
              <FontAwesome5 size={22} name='trash-alt'/>
            </View>
            <Text style={{fontSize: 16, marginLeft: 10}}>Xoá thông báo này</Text>
          </View>
        </TouchableOpacity>
      </RBSheet>
    </ScrollView>
  );
}