import React, { useEffect } from 'react';
import { StyleSheet, View, TouchableOpacity, Text, Image, FlatList } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
export default function ListFriendScreen({navigation}) {

  const DATA = [
    {
      id: '1',
      name: 'Gia Bao Ngo',
      avatar: {uri: 'https://picsum.photos/seed/avt1/200/200'},
      numMutualFriends: 69,
    },
    {
      id: '2',
      name: 'Minh Ánh',
      avatar: {uri: 'https://picsum.photos/seed/avt2/200/200'},
      numMutualFriends: 0,
    },
    {
      id: '3',
      name: 'Duy Quang',
      avatar: {uri: 'https://picsum.photos/seed/avt3/200/200'},
      numMutualFriends: 71,
    },
    {
      id: '4',
      name: 'Trang Nguyen',
      avatar: {uri: 'https://picsum.photos/seed/avt4/200/200'},
      numMutualFriends: 46,
    },
  ]

  /* Header */
  const Header = () => {
    return(
      <View style={styles.header}>
        <Text style={{fontSize: 25, fontWeight: 'bold'}}>368 bạn bè</Text>
        <TouchableOpacity><Text style={{color: '#1565C0', fontSize: 17}}>Sắp xếp</Text></TouchableOpacity>
      </View>
    );
  }

  const FriendRenderItem = ({item}) => {
    return(
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <TouchableOpacity style={styles.friendItem}>
          <Image style={styles.avatar} source={item.avatar} />
          <View style={styles.name}>
            <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{item.name}</Text>
            {
              item.numMutualFriends > 0 ?
              <Text style={{color: '#616161'}}>{item.numMutualFriends} bạn chung</Text>
              : null
            }
          </View>
        </TouchableOpacity>
        <TouchableOpacity>
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 20
  },
  header: {
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center'
  },
  avatar: {
    width: 70,
    height: 70,
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
  }
});