import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, View, TouchableOpacity, Text, Image, FlatList, TextInput } from 'react-native';
import RBSheet from 'react-native-raw-bottom-sheet';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

export default function ListFriendScreen({navigation}) {

  const DATA = [
    {
      id: '1',
      name: 'Gia Bao Ngo',
      avatar: {uri: 'https://picsum.photos/seed/giabaongo/200/200'},
      dateOfMakingFriend: 'tháng 8 năm 2014',
      numMutualFriends: 69,
    },
    {
      id: '2',
      name: 'Minh Ánh',
      avatar: {uri: 'https://picsum.photos/seed/minhanh/200/200'},
      dateOfMakingFriend: 'tháng 1 năm 2018',
      numMutualFriends: 0,
    },
    {
      id: '3',
      name: 'Trang Nguyen',
      avatar: {uri: 'https://picsum.photos/seed/trangnguyen/200/200'},
      dateOfMakingFriend: 'tháng 8 năm 2017',
      numMutualFriends: 46,
    },
    {
      id: '4',
      name: 'Duy Quang',
      avatar: {uri: 'https://picsum.photos/seed/duyquang/200/200'},
      dateOfMakingFriend: 'tháng 10 năm 2018',
      numMutualFriends: 71,
    },
    {
      id: '5',
      name: 'Nguyễn Phương Liễu',
      avatar: {uri: 'https://picsum.photos/seed/nguyenphuonglieu/200/200'},
      dateOfMakingFriend: 'tháng 3 năm 2013',
      numMutualFriends: 20,
    },
    {
      id: '6',
      name: 'Huy Thao',
      avatar: {uri: 'https://picsum.photos/seed/huythao/200/200'},
      dateOfMakingFriend: 'tháng 8 năm 2017',
      numMutualFriends: 38,
    },
    {
      id: '7',
      name: 'Kien Nguyen',
      avatar: {uri: 'https://picsum.photos/seed/kiennguyen/200/200'},
      dateOfMakingFriend: 'tháng 9 năm 2017',
      numMutualFriends: 27,
    },
  ]

  const refRBSheet = useRef();
  const [selected, setSelected] = useState(DATA[0]);

  /* Header */
  const Header = () => {
    return(
      <View>
        <View style={styles.title}>
          <Text style={{fontSize: 22, fontWeight: 'bold'}}>368 bạn bè</Text>
          <TouchableOpacity><Text style={{color: '#1565C0', fontSize: 17}}>Sắp xếp</Text></TouchableOpacity>
        </View>
        <View style={styles.searchBar}>
          <FontAwesome5 name='search' color='#757575' size={20} />
          <TextInput placeholder='Tìm kiếm bạn bè'/>
        </View>
      </View>
    );
  }

  const FriendRenderItem = ({item}) => {
    return(
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <TouchableOpacity style={styles.friendItem}>
          <Image style={styles.avatar} source={item.avatar} />
          <View style={styles.name}>
            <Text style={{ fontSize: 16, fontWeight: 'bold' }}>{item.name}</Text>
            {
              item.numMutualFriends > 0 ?
              <Text style={{color: '#616161'}}>{item.numMutualFriends} bạn chung</Text>
              : null
            }
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {
          setSelected(item);
          refRBSheet.current.open();
        }}>
          <FontAwesome5 name='ellipsis-h' color={'#616161'} size={20} />
        </TouchableOpacity>
      </View>
    );
  }

  return(
    <View>
      <FlatList 
        contentContainerStyle={styles.container}
        ListHeaderComponent={Header}
        data={DATA}
        renderItem={FriendRenderItem}
        keyExtractor={item => item.id}
        onRefresh={()=>{}}
        refreshing={false}
      />

      {/* Actions sheet */}
      <RBSheet
        height={280}
        ref={refRBSheet}
        closeOnDragDown={true}
        closeOnPressMask={true}
      >
        <View style={{ paddingHorizontal: 10 }}>
          <View style={{ padding: 10, flexDirection: 'row', borderBottomColor: '#eee', borderBottomWidth: 1 }}>
            <View>
              <Image source={selected.avatar} style={{ width: 50, height: 50, borderRadius: 40 }} />
            </View>
            <View style={{ marginLeft: 10 }}>
              <Text style={{ fontWeight: 'bold', fontSize: 16 }}>{selected.name}</Text>
              <Text style={{ color: '#616161' }}>Là bạn bè từ {selected.dateOfMakingFriend}</Text>
            </View>
          </View>
          <TouchableOpacity>
            <View style={{ padding: 10, flexDirection: 'row', alignItems: 'center' }}>
              <View style={{ backgroundColor: '#ECEFF1', width: 40, height: 40, justifyContent: 'center', alignItems: 'center', borderRadius: 50 }}>
                <FontAwesome5 size={22} name='calendar-times' />
              </View>
              <Text style={{ fontSize: 16, marginLeft: 10 }}>Bỏ theo dõi {selected.name}</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity>
            <View style={{ padding: 10, flexDirection: 'row', alignItems: 'center' }}>
              <View style={{ backgroundColor: '#ECEFF1', width: 40, height: 40, justifyContent: 'center', alignItems: 'center', borderRadius: 50 }}>
                <FontAwesome5 size={22} name='ban' />
              </View>
              <Text style={{ fontSize: 16, marginLeft: 10 }}>Chặn {selected.name}</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity>
            <View style={{ padding: 10, flexDirection: 'row', alignItems: 'center' }}>
              <View style={{ backgroundColor: '#ECEFF1', width: 40, height: 40, justifyContent: 'center', alignItems: 'center', borderRadius: 50 }}>
                <FontAwesome5 size={18} name='user-times' color='#FF1744' />
              </View>
              <Text style={{ fontSize: 16, marginLeft: 10, color: '#FF1744' }}>Huỷ kết bạn với {selected.name}</Text>
            </View>
          </TouchableOpacity>
        </View>
      </RBSheet>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 20
  },
  title: {
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center'
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 100
  },
  friendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
    flex: 1,
  },
  name: {
    flex: 1,
    paddingHorizontal: 10
  },
  searchBar: {
    marginVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 100,
    height: 40,
    backgroundColor: '#ECEFF1',
    alignItems: 'center',
    flexDirection: 'row'
  }
});