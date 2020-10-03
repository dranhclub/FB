import React from 'react';
import { Text, View, Button } from 'react-native';
import { ScrollView, TextInput } from 'react-native-gesture-handler';


export default function NewsScreen({navigation}) {
  return (
    <ScrollView>
      <Button title='Đăng bài' onPress={()=>navigation.navigate('PostScreen')}/>
    </ScrollView>
  );
}