/*
  Màn hình bạn bè, hiển thị lời mời kết bạn + gợi ý kết bạn
*/
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View } from 'react-native';
import RoundedButton from '../components/RoundedButton';

export default function FriendScreen() {
  const navigation = useNavigation();

  return (
    <View style={{ backgroundColor: 'white', flex: 1, padding: 10 }}>
      <RoundedButton
        backgroundColor='#ECEFF1'
        color={'black'}
        borderRadius={20}
        content={'Gợi ý'}
        onPress={() => navigation.navigate("ListFriendSuggestionsScreen")} />
      <RoundedButton
        style={{marginVertical: 10}}
        backgroundColor='#ECEFF1'
        color={'black'}
        borderRadius={20}
        content={'Lời mời kết bạn'}
        onPress={() => navigation.navigate("ListFriendRequestsScreen")} />
      <RoundedButton
        backgroundColor='#2979FF'
        color={'white'}
        borderRadius={20}
        content={'Tất cả bạn bè'}
        onPress={() => navigation.navigate("ListFriendScreen")} />
    </View>
  );
}
