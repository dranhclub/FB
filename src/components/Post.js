import React from 'react';
import { Text, View, Button, StyleSheet, Image } from 'react-native';
import {TouchableOpacity } from 'react-native-gesture-handler';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import ImagesGridView from './ImagesGridView';

export default function Post({ displayName, time, text, images }) {

  const exampleImages = [
    require('../imgs/example.jpg'),
    require('../imgs/example.jpg'),
    require('../imgs/example.jpg'),
    require('../imgs/example.jpg')
  ];

  return (
    <View style={styles.post}>
      <View style={styles.header}>
        <Image style={styles.avatar} source={require('../imgs/default-avatar.jpg')} />
        <View style={{ marginLeft: 10, flex: 1 }}>
          <Text style={styles.displayName}>{displayName}</Text>
          <Text style={styles.info}>
            {time}  <FontAwesome5 name={'globe-americas'} />
          </Text>
        </View>
        <View>
          <TouchableOpacity onPress={() => alert('...')}>
            <FontAwesome5 name={'ellipsis-h'} size={20} />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.body}>
        <Text>{text}</Text>
        <ImagesGridView images={images} />
        
      </View>

      <View style={styles.actions}>
        <View style={styles.action}>
          <TouchableOpacity >
            <Text>
              <FontAwesome5 name={'thumbs-up'} size={20} /> Thích
              </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.action}>
          <TouchableOpacity>
            <Text>
              <FontAwesome5 name={'comment'} size={20} /> Bình luận
              </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.action}>
          <TouchableOpacity>
            <Text>
              <FontAwesome5 name={'share'} size={20} /> Chia sẻ
              </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  post: {
    backgroundColor: 'white',
    marginBottom: 10,
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
    fontSize: 15
  },
  info: {
    flexDirection: 'row',
    color: '#ccc',
  },
  body: {},
  actions: {
    marginTop: 5,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  action: {
    paddingVertical: 5,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
  }
});