import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {AuthContext} from '../contexts/MyContexts'

const exampleAvatar = require('../imgs/default-avatar.jpg');

export default function MenuScreen({navigation}) {
  
  const {signOut} = React.useContext(AuthContext);

  return(
    <ScrollView>
      <View style={{paddingVertical: 10, paddingHorizontal: 20}}>
        {/* headers */}
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <Text style={{fontSize: 25, fontWeight: 'bold'}}>Menu</Text>
          <TouchableOpacity onPress={() => alert("deleted")}>
            <View style={{ backgroundColor: '#ECEFF1', width: 40, height: 40, justifyContent: 'center', alignItems: 'center', borderRadius: 50 }}>
              <FontAwesome5 size={22} name='search' />
            </View>
          </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={()=>{navigation.navigate('ProfileScreen')}}>
          <View style={{flexDirection:'row', marginBottom: 10}}>
            <Image source={exampleAvatar} style={{width: 50, height: 50, borderRadius: 25}} />
            <View style={{paddingLeft: 10}}>
              <Text style={{fontSize: 20, fontWeight: 'bold'}}>Huy Hoàng</Text>
              <Text>Xem trang cá nhân của bạn</Text>
            </View>
          </View>
        </TouchableOpacity>

        {/* Menu items */}
        <TouchableOpacity containerStyle={styles.menu} onPress={()=>navigation.navigate('ListFriendScreen')}>
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
        <Button  style={{backgroundColor: 'gray', color: 'black',alignItems: 'left'}} title='Đổi mật khẩu' onPress={() => navigation.navigate('ChangePasswordScreen')}/>
      
      </TouchableOpacity>
      <TouchableOpacity  onPress={()=>signOut()}>
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