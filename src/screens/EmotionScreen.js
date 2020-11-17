/*
  Màn hình chọn cảm xúc
  VD: 'Đang cảm thấy vui vẻ'
*/
import React, { useState } from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View, TextInput} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

export default function EmotionScreen({navigation}) {
  const DATA = [
    {
      icon: '🙂',
      name: 'hạnh phúc'
    },
    {
      icon: '😇',
      name: 'có phúc'
    },
    {
      icon: '🥰',
      name: 'được yêu'
    },
    {
      icon: '😔',
      name: 'buồn'
    },
    {
      icon: '🥰',
      name: 'đáng yêu'
    },
    {
      icon: '😀',
      name: 'biết ơn'
    },
    {
      icon: '🤩',
      name: 'hào hứng'
    },
    {
      icon: '🥰',
      name: 'đang yêu'
    },
    {
      icon: '🤪',
      name: 'điên'
    },
    {
      icon: '😄',
      name: 'cảm kích'
    },
    {
      icon: '😊',
      name: 'sung sướng'
    },
    {
      icon: '🥳',
      name: 'tuyệt vời'
    },
    {
      icon: '🤪',
      name: 'ngốc nghếch'
    },
    {
      icon: '🥳',
      name: 'vui vẻ'
    },
    {
      icon: '🙂',
      name: 'thú vị'
    },
    {
      icon: '😎',
      name: 'thật phong cách'
    },
    {
      icon: '😴',
      name: 'mệt mỏi'
    },
    {
      icon: '😡',
      name: 'giận dữ'
    },
    {
      icon: '😵',
      name: 'chóng mặt'
    },
    {
      icon: '🙂',
      name: 'khoẻ'
    },
    {
      icon: '😞',
      name: 'nản lòng'
    },
    {
      icon: '😲',
      name: 'ngạc nhiên'
    },
    {
      icon: '😌',
      name: 'tự hào'
    },
    {
      icon: '🤣',
      name: 'chết cười'
    },
  ];

  React.useLayoutEffect(()=>{
    navigation.setOptions({
      headerTitle: props => (<Text style={{fontSize: 18}}>Bạn đang cảm thấy thế nào?</Text>)
    });
  },[navigation]);

  const renderItem = ({item}) => {
    return(
      <TouchableOpacity style={styles.itemWrapper} onPress={()=>{navigation.navigate('PostScreen', {emotion: item})}}>
        <Text style={{fontSize: 25}}>{item.icon}</Text>
        <Text>  {item.name}</Text>
      </TouchableOpacity>
    );
  };

  const SearchBar = () => {
    return(
      <View style={styles.searchBar}>
        <FontAwesome5 name='search' color='#757575' size={20} />
        <TextInput placeholder='Tìm kiếm'/>
      </View>
    );
  }

  return(
    <View style={styles.container}>
      <FlatList 
        data={DATA}
        ListHeaderComponent={SearchBar}
        keyExtractor={item=>item.name}
        renderItem={renderItem}
        numColumns={2}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white'
  },
  searchBar: {
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center'
  },
  itemWrapper: {
    padding: 10, 
    borderWidth: 1, 
    borderColor: '#eee', 
    flex: 1, 
    flexDirection: 'row',
    alignItems: 'center'
  }
});