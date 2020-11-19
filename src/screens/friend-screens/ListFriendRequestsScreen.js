import React from 'react';
import { FlatList, Image, StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import RoundedButton from '../../components/RoundedButton';

export default function ListFriendRequestsScreen() {
  const DATA = [
    {
      id: '1',
      name: 'Đình Đạt',
      avatar: { uri: 'https://picsum.photos/seed/dinhdat/200/200' },
      numMutualFriend: 33,
      time: '3 ngày'
    },
    {
      id: '2',
      name: 'Trương Minh Phúc',
      avatar: { uri: 'https://picsum.photos/seed/truongminhphuc/200/200' },
      numMutualFriend: 0,
      time: '2 tuần'
    },
    {
      id: '3',
      name: 'Sam sam',
      avatar: { uri: 'https://picsum.photos/seed/samsam/200/200' },
      numMutualFriend: 0,
      time: '2 tuần'
    },
    {
      id: '4',
      name: 'Đình Đạt',
      avatar: { uri: 'https://picsum.photos/seed/dinhdat/200/200' },
      numMutualFriend: 33,
      time: '3 ngày'
    },
    {
      id: '5',
      name: 'Trương Minh Phúc',
      avatar: { uri: 'https://picsum.photos/seed/truongminhphuc/200/200' },
      numMutualFriend: 0,
      time: '2 tuần'
    },
    {
      id: '6',
      name: 'Sam sam',
      avatar: { uri: 'https://picsum.photos/seed/samsam/200/200' },
      numMutualFriend: 0,
      time: '2 tuần'
    },
  ];

  const Header = () => {
    return (
      <View style={styles.header}>
        <Text style={styles.title}>Lời mời kết bạn</Text>
        <TouchableOpacity>
          <Text style={styles.edit}>Sắp xếp</Text>
        </TouchableOpacity>
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
            <Text style={{ color: '#BDBDBD' }}>{item.time}</Text>
          </View>
          <View style={{paddingVertical: 3}}>
            {
              item.numMutualFriend > 0 ?
                <Text style={{ color: '#616161' }}>{item.numMutualFriend} bạn chung</Text>
                : null
            }
          </View>
          <RoundedButton content='Chấp nhận' backgroundColor={'#2979FF'} color='white'/>
          <View style={{paddingVertical: 3}}></View>
          <RoundedButton content='Xoá' backgroundColor={'#ECEFF1'} color='black'/>
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
      />
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 10
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