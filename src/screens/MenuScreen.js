import React, { useState } from 'react';
import { Button, Image, StyleSheet, Text, View } from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import Spinner from 'react-native-loading-spinner-overlay';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { useDispatch, useSelector } from 'react-redux';
import {logoutRequest} from '../slices/authSlice';

export default function MenuScreen({navigation}) {

  const loading = useSelector(state => state.auth.loading);
  const currentUser = useSelector(state => state.auth.currentUser);

  let avatar = useSelector(state => state.auth.currentUser.avatar);
  if (avatar === '-1') {
    avatar = require('../imgs/default-avatar.jpg');
  }

  const dispatch = useDispatch();
  const signOut = () => {
    dispatch(logoutRequest());
  }
  return(
    <ScrollView>
      <Spinner visible={loading}/>
      <View style={{paddingVertical: 10, paddingHorizontal: 20}}>
        {/* headers */}
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <Text style={{fontSize: 25, fontWeight: 'bold'}}>Menu</Text>
          <TouchableOpacity onPress={() => navigation.navigate("SearchScreen")}>
            <View style={{ backgroundColor: '#ECEFF1', width: 40, height: 40, justifyContent: 'center', alignItems: 'center', borderRadius: 50 }}>
              <FontAwesome5 size={22} name='search' />
            </View>
          </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={()=>{navigation.navigate('ProfileScreen')}}>
          <View style={{flexDirection:'row', marginBottom: 10}}>
            <Image source={avatar} style={{width: 50, height: 50, borderRadius: 25}} />
            <View style={{paddingLeft: 10}}>
              <Text style={{fontSize: 20, fontWeight: 'bold'}}>{currentUser.name}</Text>
              <Text>Xem trang cá nhân của bạn</Text>
            </View>
          </View>
        </TouchableOpacity>

        {/* Menu items */}
        <TouchableOpacity containerStyle={styles.menu} onPress={()=>navigation.navigate('MessengerScreen')}>
          <View style={{flexDirection: 'row', alignItems:'center'}}>
            <FontAwesome5 name={'facebook-messenger'} size={20} color={'#1976D2'}/>
            <Text style={{marginLeft: 10, fontSize: 20, fontWeight: 'bold'}}>Tin nhắn</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity containerStyle={styles.menu} onPress={()=>navigation.navigate('FriendScreen')}>
          <View style={{flexDirection: 'row', alignItems:'center'}}>
            <FontAwesome5 name={'user-friends'} size={20} color={'#1976D2'}/>
            <Text style={{marginLeft: 10, fontSize: 20, fontWeight: 'bold'}}>Bạn bè</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity containerStyle={styles.menu}>
          <View style={{flexDirection: 'row', alignItems:'center'}}>
            <View style={{backgroundColor: '#2196F3', borderRadius: 20, width: 28, height: 28, justifyContent: 'center', alignItems: 'center'}}>
              <FontAwesome5 name={'users'} size={15} color={'#fff'}/>
            </View>
            <Text style={{marginLeft: 10, fontSize: 20, fontWeight: 'bold'}}>Nhóm</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity containerStyle={styles.menu}>
          <View style={{flexDirection: 'row', alignItems:'center'}}>
            <FontAwesome5 name={'bookmark'} size={20} color={'#9C27B0'} solid style={{marginHorizontal: 5}}/>
            <Text style={{marginLeft: 10, fontSize: 20, fontWeight: 'bold'}}>Đã lưu</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity containerStyle={styles.menu}>
          <View style={{flexDirection: 'row', alignItems:'center'}}>
            <FontAwesome5 name={'flag'} size={20} color={'#FF6E40'} solid style={{marginHorizontal: 5}}/>
            <Text style={{marginLeft: 10, fontSize: 20, fontWeight: 'bold'}}>Trang</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity containerStyle={styles.menu}>
          <View style={{flexDirection: 'row', alignItems:'center'}}>
            <FontAwesome5 name={'heart'} size={20} color={'#FF5252'} solid style={{marginHorizontal: 5}}/>
            <Text style={{marginLeft: 10, fontSize: 20, fontWeight: 'bold'}}>Hẹn hò</Text>
          </View>
        </TouchableOpacity>
      </View>
      
      {/* Bottom buttons */}
      <TouchableOpacity>
        <View style={styles.bottomMenus}>
          <FontAwesome5 name='cog' size={30} color={'#B0BEC5'} style={{paddingHorizontal: 3}}/>
          <Text style={{fontSize: 20, marginLeft: 10}}>Cài đặt</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('ChangePasswordScreen')}>
        <View style={styles.bottomMenus}>
          <FontAwesome5 name='key' size={30} color={'#B0BEC5'}/>
          <Text style={{fontSize: 20, marginLeft: 10}}>Đổi mật khẩu</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity  onPress={signOut}>
        <View style={styles.bottomMenus}>
          <FontAwesome5 name='door-open' size={30} color={'#B0BEC5'}/>
          <Text style={{fontSize: 20, marginLeft: 10}}>Đăng xuất</Text>
        </View>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  menu: {
    backgroundColor: 'white',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 20,
    },
    shadowOpacity: 1,
    shadowRadius: 3.84,

    elevation: 5,

    paddingVertical: 20,
    paddingHorizontal: 10,
    borderRadius: 10,
    marginBottom: 10
  },
  bottomMenus: {
    borderWidth: 1,
    borderColor: '#ccc',
    paddingHorizontal: 10,
    paddingVertical: 15,
    backgroundColor: '#ECEFF1',
    flexDirection: 'row',
    alignItems: 'center'
  }
});