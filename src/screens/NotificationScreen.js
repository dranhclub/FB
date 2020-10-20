import React, { useRef, useState } from 'react';
import { Button, Text, View,Image } from 'react-native';
import { ScrollView, TouchableHighlight, TouchableOpacity } from 'react-native-gesture-handler';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import RoundedButton from '../components/RoundedButton';
import RBSheet from "react-native-raw-bottom-sheet";

export default function NotificationScreen() {
  
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
        <RoundedButton content={<FontAwesome5 name='search' size={25}/>} color={'#777'} backgroundColor={'#ccc'} borderRadius={20}/>
      </View>

      {/* Notification items */}
      {
        exampleNotifs.map((item, index) => {
          const viewStyle = { flexDirection: 'row', padding: 10 };
          if (!item.read) {
            viewStyle['backgroundColor'] = '#E3F2FD'
          }
          return (
            <View key={index} style={viewStyle}>
              <TouchableOpacity containerStyle={{flex: 1}} onPress={()=>alert('goto post')}>
                <View style={{flexDirection: 'row'}}>
                  <Image source={item.image} style={{ width: 70, height: 70, borderRadius: 60 }} />
                  <View style={{ flex: 1, paddingHorizontal: 10 }}>
                    <Text style={{ fontSize: 18 }}>{item.content}</Text>
                    <Text style={{ fontSize: 15, color: '#777' }}>{item.time}</Text>
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
        <Button title={'Xoá thông báo này'} onPress={()=>alert("deleted")}/>
      </RBSheet>
    </ScrollView>
  );
}