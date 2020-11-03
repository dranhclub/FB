import React from 'react'
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { Text, StyleSheet, Image, View } from 'react-native';

function Comment({avatar, name, text, time}) {
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

const exampleAvatars = [
  {uri: 'https://picsum.photos/seed/picsum1/50/50'},
  {uri: 'https://picsum.photos/seed/picsum2/50/50'},
  {uri: 'https://picsum.photos/seed/picsum3/50/50'},
]

export default function CommentScreen() {
  return (
    <ScrollView style={styles.container}>
      <Comment name={'Nguyễn Ngọc Đức Thắng'} avatar={exampleAvatars[0]} text={'Chào cậu'} time={'2 phút trước'}/>
      <Comment name={'Ngô Huy Thao'} avatar={exampleAvatars[1]} text={'Sit commodo cupidatat elit aute dolor veniam esse deserunt esserunt esserunt esserunt esse eiusmod quis ad enim.'} time={'2 phút trước'}/>
      <Comment name={'Nguyễn Văn Tráng'} avatar={exampleAvatars[2]} text={'Chào cậu'} time={'2 phút trước'}/>
      <Comment name={'Nguyễn Ngọc Đức Thắng'} avatar={exampleAvatars[0]} text={'Chào cậu'} time={'2 phút trước'}/>
      <Comment name={'Ngô Huy Thao'} avatar={exampleAvatars[1]} text={'Sit commodo cupidatat elit aute dolor veniam esse deserunt esserunt esserunt esserunt esse eiusmod quis ad enim.'} time={'2 phút trước'}/>
      <Comment name={'Nguyễn Văn Tráng'} avatar={exampleAvatars[2]} text={'Chào cậu'} time={'2 phút trước'}/>
      <Comment name={'Nguyễn Ngọc Đức Thắng'} avatar={exampleAvatars[0]} text={'Chào cậu'} time={'2 phút trước'}/>
      <Comment name={'Ngô Huy Thao'} avatar={exampleAvatars[1]} text={'Sit commodo cupidatat elit aute dolor veniam esse deserunt esserunt esserunt esserunt esse eiusmod quis ad enim.'} time={'2 phút trước'}/>
      <Comment name={'Nguyễn Văn Tráng'} avatar={exampleAvatars[2]} text={'Chào cậu'} time={'2 phút trước'}/>
      <Comment name={'Nguyễn Ngọc Đức Thắng'} avatar={exampleAvatars[0]} text={'Chào cậu'} time={'2 phút trước'}/>
      <Comment name={'Ngô Huy Thao'} avatar={exampleAvatars[1]} text={'Sit commodo cupidatat elit aute dolor veniam esse deserunt esserunt esserunt esserunt esse eiusmod quis ad enim.'} time={'2 phút trước'}/>
      <Comment name={'Nguyễn Văn Tráng'} avatar={exampleAvatars[2]} text={'Chào cậu'} time={'2 phút trước'}/>
      <Comment name={'Nguyễn Ngọc Đức Thắng'} avatar={exampleAvatars[0]} text={'Chào cậu'} time={'2 phút trước'}/>
      <Comment name={'Ngô Huy Thao'} avatar={exampleAvatars[1]} text={'Sit commodo cupidatat elit aute dolor veniam esse deserunt esserunt esserunt esserunt esse eiusmod quis ad enim.'} time={'2 phút trước'}/>
      <Comment name={'Nguyễn Văn Tráng'} avatar={exampleAvatars[2]} text={'Chào cậu'} time={'2 phút trước'}/>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: 'white'
  },
});