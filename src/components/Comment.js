import React from 'react'
import { Text, StyleSheet, Image, View } from 'react-native';
import { TouchableHighlight, TouchableOpacity } from 'react-native-gesture-handler';

export default function Comment({avatar, name, text, time}) {
  return(
    <View style={styles.container}>
      <Image source={avatar} style={styles.avatar}/>
      <View style={{marginLeft: 10}}>
        <View style={{backgroundColor: '#eee', borderRadius: 20, padding: 10}}>
          <Text style={{fontWeight: 'bold', fontSize: 16}}>{name}</Text>
          <Text style={{flexWrap: 'wrap'}}>{text}</Text>
        </View>
        <View style={{flexDirection: 'row'}}>
          <Text>{time}</Text>
          <TouchableOpacity onPress={()=>alert('Đã thích :D')}>
            <Text style={{fontWeight: 'bold', marginLeft: 20}}>Thích</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginBottom: 15,
    paddingRight: 60
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25
  }
});