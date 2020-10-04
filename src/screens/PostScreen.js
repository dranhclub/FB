import React, { useState } from 'react';
import {Image, StyleSheet, View, Text, SafeAreaView, Dimensions, ImageBackground, Button } from "react-native";
import { ScrollView, TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import ImagePicker from 'react-native-image-picker';

export default function PostScreen({navigation}) {
  const [uploadedImages, setUploadedImages] = useState([
    // require('../imgs/default-avatar.jpg'),
    // require('../imgs/login-img.png'),
    // require('../imgs/register-img.png'),
    // require('../imgs/default-avatar.jpg')
  ]);

  const [text, setText] = useState('');

  const options = {
    title: 'Select Image',
    customButtons: [{ name: 'fb', title: 'Choose Photo from Facebook' }],
    storageOptions: {
      skipBackup: true,
      path: 'images',
    },
  };

  // show image picker
  function sip() {
    ImagePicker.showImagePicker(options, (response) => {
   
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        const source = { uri: response.uri };
    
        // You can also display the image using data:
        // const source = { uri: 'data:image/jpeg;base64,' + response.data };
    
        setUploadedImages([
          ...uploadedImages,
          source
        ])
      }
    });
  }

  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Tạo bài viết',
      headerRight: () => (
        <Button onPress={() => alert('Coi như đã đăng :D')} title="Đăng" />
      ),
    });
  }, [navigation]);

  return (
    <View style={styles.container}>
      <View style={{ flex: 1, overflow: 'hidden' }}>
        <View style={styles.header}>
          <Image style={styles.avatar} source={require('../imgs/default-avatar.jpg')} />
          <View style={{ marginLeft: 10 }}>
            <Text style={styles.displayName}>Anh Hoang</Text>
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

        <SafeAreaView>
          <ScrollView>
            <TextInput
              placeholder='Bạn đang nghĩ gì?'
              multiline
              style={{ fontSize: 20 }}
              onChangeText={(text)=>setText(text)}
            />
            {
              uploadedImages.length > 0 ? (
                <View style={styles.imgContainer}>
                  {uploadedImages.map((img, index) => {
                    return (
                      <View style={styles.uploadedImgWrapper} key={`${index}`}>
                        <ImageBackground style={styles.uploadedImg} source={img} >
                          <TouchableOpacity onPress={()=>{
                            var array = [...uploadedImages];
                            console.log('remove index' + index);
                            array.splice(index, 1);
                            setUploadedImages(array);
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
              ) : <></>
            }
          </ScrollView>
        </SafeAreaView>
      </View>



      <View style={styles.bottomMenu}>
        <View style={{flexDirection: 'row', alignItems:'center'}}>
          <Text style={{flex: 1}}>Thêm vào bài viết của bạn</Text>
          <View style={{flexDirection: 'row'}}>
            <TouchableOpacity onPress={()=>sip()}>
              <FontAwesome5 color={'green'} name='image' size={30}/>
            </TouchableOpacity>
            <FontAwesome5 color={'#4287f5'} name='video'size={30} style={{marginHorizontal: 4}}/>
            <FontAwesome5 color={'#feff02'} name='laugh' size={30}/>
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
      fontSize: 20
    },
    options: {
      flexDirection: 'row'
    },
    option: {
      borderWidth: 1,
      borderColor: '#ccc',
      borderRadius: 5,
      paddingVertical: 5,
      paddingHorizontal: 5,
      flexDirection: 'row',
      alignItems: 'center'
    },
    bottomMenu: {
      height: 50,
      borderWidth: 1,
      borderColor: '#ccc',
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