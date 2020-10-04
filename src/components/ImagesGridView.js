import React, { useEffect } from 'react'
import { Image, StyleSheet, Text, View } from 'react-native';

export default function ImagesGridView ({images}) {
  useEffect(()=>{
    // if (images.length == 1) {
    //   styles.container.width = '100%'
    // }
  });
  
  return(
    <View style={styles.container}>
      {images.map((img)=>{
        return(
          <Image source={img} style={styles.image}/>
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