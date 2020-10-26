/**
 * Component giúp hiển thị hình ảnh theo dạng lưới
 */
import React, { useEffect } from 'react'
import { Image, StyleSheet, Text, View } from 'react-native';

export default function ImagesGridView ({images}) {
  return(
    <View style={styles.container}>
      {images.map((img, index)=>{
        return(
          <Image source={img} style={styles.image} key={index}/>
        )
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    aspectRatio: 1,
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  image: {
    width: '48%',
    height: '48%',
    margin: 3,
  }
});