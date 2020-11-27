import React, { useEffect, useState } from 'react';
import { FlatList, Image, StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import RoundedButton from '../../components/RoundedButton';
import friendApi from '../../apis/friendApi';
import { useDispatch, useSelector } from 'react-redux';

export default function ListFriendSuggestionsScreen() {
  const token = useSelector(state => state.auth.currentUser.token);
  
  const [data, setData] = useState([]);

  const loadData = () => {
    friendApi.getListFriendSuggestions({token: token})
      .then(result=>{
        let newData = result.data.map(value=>{
          return {
            id: `${value._id}`,
            name: value.name,
            avatar: { uri: `https://picsum.photos/seed/${value.name}/200/200` },
            numMutualFriend: Math.trunc(0 + 50 * Math.random()),
          };
        });   
        setData(newData);
      })
      .catch(err=>console.log(err));
  }

  const sendInvitation = (id) => {
    const params = {
      token: token,
      userId: id
    };
    friendApi.requestFriend(params)
      .then(result => {
        console.log(result);
      })
      .catch(err => console.log(err));
  }

  useEffect(()=>{
    loadData();
  },[]);

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
          <RoundedButton content='Kết bạn' backgroundColor={'#2979FF'} color='white' onPress={()=>sendInvitation(item.id)}/>
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
      data={data}
      renderItem={renderItem}
      keyExtractor={item => item.id}
      onRefresh={loadData}
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