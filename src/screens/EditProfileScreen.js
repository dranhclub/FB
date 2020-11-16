import React, { useState } from 'react';
import { Image, ScrollView, Text, TouchableOpacity } from 'react-native';
import { View, StyleSheet } from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import ImagePicker from 'react-native-image-picker';

const exampleAvatar = require('../imgs/avatar.jpg');
const exampleCover = require('../imgs/cover.jpg');

export default function EditProfileScreen() {

  const [avatar, setAvatar] = useState(exampleAvatar);
  const [cover, setCover] = useState(exampleCover);

  function showImgPicker(setter) {
    const options = {
      title: 'Select Image',
      mediaType: 'photo',
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };

    ImagePicker.showImagePicker(options, (response) => {
   
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        const source = { uri: response.uri };
        setter(source);
      }
    });
  }

  return(
    <ScrollView style={styles.container}>
      {/* Ảnh đại diện */}
      <View style={styles.div}>
        <View style={styles.header}>
          <Text style={styles.title}>Ảnh đại diện</Text>
          <TouchableOpacity onPress={()=>showImgPicker(setAvatar)}>
            <Text style={styles.edit}>Chỉnh sửa</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.imgWrapper}>
          <Image source={avatar} 
            style={{ width: 120, height: 120, borderRadius: 200 }} />
        </View>
      </View>

      {/* Ảnh bìa */}
      <View style={styles.div}>
        <View style={styles.header}>
          <Text style={styles.title}>Ảnh bìa</Text>
          <TouchableOpacity onPress={()=>showImgPicker(setCover)}>
            <Text style={styles.edit}>Chỉnh sửa</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.imgWrapper}>
          <Image source={cover} 
            style={{ width: '100%', height: 160, borderRadius: 10 }} />
        </View>
      </View>

      {/* Tiểu sử */}
      <View style={styles.div}>
        <View style={styles.header}>
          <Text style={styles.title}>Tiểu sử</Text>
          <TouchableOpacity>
            <Text style={styles.edit}>Chỉnh sửa</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.imgWrapper}>
          <Text style={{color: '#616161', fontSize: 18}}>Programmer</Text>
        </View>
      </View>

      {/* Thông tin thêm */}
      <View style={styles.div}>
        <View style={styles.header}>
          <Text style={styles.title}>Chi tiết</Text>
          <TouchableOpacity>
            <Text style={styles.edit}>Chỉnh sửa</Text>
          </TouchableOpacity>
        </View>
        <View>
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
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    paddingHorizontal: 10
  },  
  div: {
    borderTopColor: '#ddd',
    borderTopWidth: 1,
    padding: 10
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold'
  },
  edit: {
    color: '#2979FF',
    fontSize: 17
  },
  imgWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingVertical: 10
  },
  infoItem: {
    flexDirection: 'row', 
    marginBottom: 10
  },
});