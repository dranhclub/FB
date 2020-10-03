import React, { useState } from 'react';
import { Image, StyleSheet, View, Text, SafeAreaView } from "react-native";
import { ScrollView, TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

export default function PostScreen() {
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
              value='lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem loremlorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem loremlorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem '
            >

            </TextInput>

          </ScrollView>
        </SafeAreaView>
      </View>

      <View style={styles.bottomMenu}>
        <View style={{flexDirection: 'row', alignItems:'center'}}>
          <Text style={{flex: 1}}>Thêm vào bài viết của bạn</Text>
          <View style={{flexDirection: 'row'}}>
            <FontAwesome5 color={'green'} name='image' size={30}/>
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
    }
  }
);