import React from 'react';
import { FlatList, Image, StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import RoundedButton from '../../components/RoundedButton';

export default function ListFriendSuggestionsScreen() {
  const DATA = [
    {
      id: '1',
      name: 'Duy Drak',
      avatar: { uri: 'https://picsum.photos/seed/duydrak/200/200' },
      numMutualFriend: 0,
    },
    {
      id: '2',
      name: 'Nguyễn Ngọc Sinh',
      avatar: { uri: 'https://picsum.photos/seed/nguyenngocsinh/200/200' },
      numMutualFriend: 9,
    },
    {
      id: '3',
      name: 'Nguyễn Văn Khoa',
      avatar: { uri: 'https://picsum.photos/seed/nguyenvankhoa/200/200' },
      numMutualFriend: 48,
    },
    {
      id: '4',
      name: 'Son Hoang',
      avatar: { uri: 'https://picsum.photos/seed/sonhoang/200/200' },
      numMutualFriend: 4,
    },
    {
      id: '5',
      name: 'Phạm Quang Thanh',
      avatar: { uri: 'https://picsum.photos/seed/phamquangthanh/200/200' },
      numMutualFriend: 15,
    },
    {
      id: '6',
      name: 'Nông Thanh Đạt',
      avatar: { uri: 'https://picsum.photos/seed/nongthanhdat/200/200' },
      numMutualFriend: 14,
    },
  ];

  const Header = () => {
    return (
      <View style={styles.header}>
        <Text style={styles.title}>Những người có thể bạn biết</Text>
      </View>
    );
  }

  const renderItem = ({ item }) => {
    return (
      <View style={{ flexDirection: 'row', paddingVertical: 10 }}>
        <View style={{ paddingHorizontal: 10 }}>
          <Image source={item.avatar} style={{ width: 80, height: 80, borderRadius: 40 }} />
        </View>
        <View style={{flex: 1}}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Text style={{ fontWeight: 'bold' }}>{item.name}</Text>
          </View>
          <View style={{paddingVertical: 3}}>
            {
              item.numMutualFriend > 0 ?
                <Text style={{ color: '#616161' }}>{item.numMutualFriend} bạn chung</Text>
                : null
            }
          </View>
          <RoundedButton content='Kết bạn' backgroundColor={'#2979FF'} color='white'/>
          <View style={{paddingVertical: 3}}></View>
          <RoundedButton content='Gỡ' backgroundColor={'#ECEFF1'} color='black'/>
        </View>
      </View>
    );
  }

  return (
    <FlatList
      contentContainerStyle={styles.container}
      ListHeaderComponent={Header}
      data={DATA}
      renderItem={renderItem}
      keyExtractor={item => item.id}
      onRefresh={()=>{}}
      refreshing={false}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 10,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold'
  },
  edit: {
    color: '#2979FF',
    fontSize: 17
  },
});