import React from 'react'
import { StyleSheet, Text, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Comment from '../components/Comment';

// const exampleAvatar = require('../imgs/default-avatar.jpg');

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
  }
});