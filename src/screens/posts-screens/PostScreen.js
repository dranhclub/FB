import React, { useState } from 'react';
import {Image, StyleSheet, View, Text, SafeAreaView, ImageBackground, Button, Alert, ScrollView, TextInput, TouchableOpacity } from "react-native";
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import ImagePicker from 'react-native-image-picker';
import VideoPlayer from 'react-native-video-player';
import AsyncStorage from '@react-native-community/async-storage';
import { useSelector } from 'react-redux';

export default function PostScreen({navigation, route}) {
  const [uploadedPhotos, setUploadedPhotos] = useState([]);
  const [uploadedVideo, setUploadedVideo] = useState();
  const [description, setDescription] = useState('');
  const [emotion, setEmotion] = useState();

  let avatar = useSelector(state => state.auth.currentUser.avatar);
  if (avatar === '-1') {
    avatar = require('../../imgs/default-avatar.jpg');
  }

  React.useEffect(()=>{
    if (route.params) {
      setEmotion(route.params.emotion);
      console.log(route);
    }
  }, [route]);

  function getMediaType() {
    return uploadedPhotos.length > 0 ? 'photo' : uploadedVideo ? 'video' : 'none';
  }

  function hasUnsavedChanges() {
    //TODO: implement
    return true;
  }

  const PhotoView = () => {
    return (
      <View style={styles.imgContainer}>
        {uploadedPhotos.map((img, index) => {
          return (
            <View style={styles.uploadedImgWrapper} key={`${index}`}>
              <ImageBackground style={styles.uploadedImg} source={img} >
                <TouchableOpacity onPress={()=>{
                  var array = [...uploadedPhotos];
                  console.log('remove index' + index);
                  array.splice(index, 1);
                  setUploadedPhotos(array);
                }}>
                  <Text style={styles.xBtn}>
                    <FontAwesome5 name={'times-circle'} size={20}/>
                  </Text>
                </TouchableOpacity>
              </ImageBackground>
            </View>
          )
        })}
      </View>
    );
  }

  const VideoView = () => {
    return(
      <VideoPlayer
        video = {uploadedVideo}
        videoWidth={1600}
        videoHeight={900}
        thumbnail={{ uri: 'https://i.picsum.photos/id/866/1600/900.jpg' }}
      />
    )
  }

  function showImgPicker() {
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

        setUploadedPhotos([
          ...uploadedPhotos,
          source
        ])

        setUploadedVideo(null);
      }
    });
  }

  function showVideoPicker() {
    const options = {
      title: 'Select Video',
      mediaType: 'video',
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };

    ImagePicker.showImagePicker(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled video picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        const source = { uri: response.uri };
        console.log(source);
        setUploadedVideo(source);
        setUploadedPhotos([]);
      }
    });
  }

  async function saveThePost() {
    const savedContent = {
      video: uploadedVideo,
      photos: uploadedPhotos,
      text: description,
      emotion: emotion
    }
    try{
      console.log("saving...");
      console.log(savedContent);
      await AsyncStorage.setItem('savedPost', JSON.stringify(savedContent));
    }catch(e){
      console.log("Failed to save the post");
      console.log(e);
    }
  }

  async function deleteSavedPost() {
    await AsyncStorage.removeItem('savedPost');
  }

  async function loadSavedPost() {
    try{
      const temp = await AsyncStorage.getItem('savedPost');
      if (temp != null) {
        const savedContent = JSON.parse(temp);
        console.log(savedContent);
        setDescription(savedContent.text);
        setUploadedPhotos(savedContent.photos);
        setUploadedVideo(savedContent.video);
        setEmotion(savedContent.emotion);
      }
    }catch(e) {
      console.log("Can not load saved post")
      console.log(e);
    }
  }

  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Tạo bài viết',
      headerRight: () => (
        <TouchableOpacity style={{paddingHorizontal: 10}}>
          <Text style={{color: '#717171'}}>ĐĂNG</Text>
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  // Load saved post
  React.useEffect(()=>{
    loadSavedPost();
  }, []);

  // Alert unsaved post
  React.useEffect(
    () =>
      navigation.addListener('beforeRemove', (e) => {
        if (!hasUnsavedChanges()) { return; }
        e.preventDefault();
        Alert.alert(
          'Lưu bài viết?',
          'Bạn có muốn lưu bài viết hay không?',
          [
            {
              text: 'Lưu', styles: 'positive',
              onPress: () => {
                saveThePost();
                navigation.dispatch(e.data.action)
              }
            },
            {
              text: 'Huỷ bài viết',
              style: 'negative',
              onPress: () => {
                deleteSavedPost();
                navigation.dispatch(e.data.action)
              } 
            },
            { text: "Tiếp tục chỉnh sửa", style: 'neutral', onPress: () => { } },
          ]
        );
      })
  );


  return (
    <View style={styles.container}>
      <View style={{ flex: 1, overflow: 'hidden' }}>
        {/* header */}
        <View style={styles.header}>
          <Image style={styles.avatar} source={avatar} />
          <View style={{ marginLeft: 10 }}>
            <Text style={styles.displayName}>
              Huy Hoàng
              {
                emotion ?
                  <Text style={{ color: '#717171', fontSize: 16, fontWeight: 'normal' }}> ― Đang {emotion.icon} cảm thấy {emotion.name}</Text>
                  : null
              }
            </Text>
            <View style={styles.options}>
              <TouchableOpacity>
                <View style={styles.option}>
                  <FontAwesome5 name={'globe-americas'} />
                  <Text>  Public  </Text>
                  <FontAwesome5 name={'caret-down'} />
                </View>
              </TouchableOpacity>
              <TouchableOpacity style={{ marginLeft: 10 }}>
                <View style={styles.option}>
                  <FontAwesome5 name={'plus'} />
                  <Text>  Album  </Text>
                  <FontAwesome5 name={'caret-down'} />
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* contents */}
        <SafeAreaView>
          <ScrollView>
            <TextInput
              placeholder='Bạn đang nghĩ gì?'
              multiline
              style={{ fontSize: 20 }}
              onChangeText={(text)=>setDescription(text)}
              value={description}
            />
            {
              getMediaType() === 'photo' ? <PhotoView /> : 
              getMediaType() === 'video' ? <VideoView /> : null
            }
          </ScrollView>
        </SafeAreaView>
      </View>

      {/* options */}
      <View style={styles.bottomMenu}>
        <View style={{flexDirection: 'row', alignItems:'center', paddingHorizontal: 10}}>
          <Text style={{flex: 1}}>Thêm vào bài viết của bạn</Text>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <TouchableOpacity onPress={()=>showImgPicker()}>
              <FontAwesome5 color={'#4CAF50'} name='image' size={25}/>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>showVideoPicker()}>
              <FontAwesome5 color={'#4287f5'} name='video'size={25} style={{marginHorizontal: 4}}/>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>navigation.navigate('EmotionScreen')}>
              <FontAwesome5 color={'#FBC02D'} name='laugh' size={25}/>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create(
  {
    container: {
      backgroundColor: 'white',
      flex: 1,
      padding: 10
    },
    header: {
      flexDirection: 'row'
    },
    avatar: {
      width: 50,
      height: 50,
      borderRadius: 25,
    },
    displayName: {
      fontWeight: 'bold',
      fontSize: 18,
      paddingRight: 40
    },
    options: {
      flexDirection: 'row'
    },
    option: {
      borderWidth: 1,
      borderColor: '#ccc',
      borderRadius: 5,
      paddingVertical: 3,
      paddingHorizontal: 5,
      flexDirection: 'row',
      alignItems: 'center'
    },
    bottomMenu: {
      height: 45,
      borderWidth: 1,
      borderColor: '#eee',
      borderRadius: 4,
      overflow: 'hidden',
      justifyContent: 'center'
    },
    imgContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap'
    },
    uploadedImgWrapper: {
      width: '50%',
      height: 50,
      aspectRatio: 1,
    },
    uploadedImg: {
      width: '100%',
      height: '100%',
    },
    xBtn: {
      textAlign: 'right',
      padding: 5
    }
  }
);