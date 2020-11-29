import { Thumbnail } from 'native-base';
import React, { useEffect } from 'react';
import { Alert, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useDispatch, useSelector } from 'react-redux';
import { loginRequest, removeAccountFromStorage, loadSavedUsersFromStorage } from '../../../slices/authSlice';
import * as colors from '../../../constants/colors';

const defaultAvatar = require('../../../imgs/default-avatar.jpg');

function SelectAccountScreen({ navigation }) {
  const savedUsers = useSelector(state => state.auth.savedUsers);
  const loading = useSelector(state => state.auth.loading);
  const dispatch = useDispatch();

  useEffect(()=>{
    dispatch(loadSavedUsersFromStorage());
    if (savedUsers.length == 0) {
      navigation.navigate("SignInScreen");
    }
  }, [navigation]);

  const onLogin = (choosenAccount) => {
    if (choosenAccount?.password) {
      dispatch(loginRequest({
        phoneNumber: choosenAccount.phoneNumber,
        password: choosenAccount.password,
      }));
    }
  };

  const removeAccount = (account) => {
    dispatch(removeAccountFromStorage(account));
  }

  return (
    <View style={styles.container}>
      <View style={styles.top}>
        <Image
          source={require('../../../imgs/logoFB.jpg')}
          style={styles.facebookIcon}
        />
        <View style={{marginTop: 20}}></View>
        {
          /* Danh sách các tài khoản đã lưu mật khẩu trên thiết bị */
          savedUsers?.map((item, index) => {
            if (index > 3) return null;
            let avatar = item.avatar;
            if (avatar === '-1') {
              avatar = defaultAvatar;
            }
            return (
              <View style={styles.signInPersist} key={index}>
                <TouchableOpacity onPress={() => onLogin(item)} style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Thumbnail source={avatar} style={styles.avatar} />
                  <Text style={styles.username}>
                    {item.name}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => { 
                  Alert.alert(
                    'Xoá tài khoản này?',
                    'Xoá tài khoản này khỏi danh sách',
                    [
                      {
                        text: 'Xoá',
                        onPress: () => {removeAccount(item)}
                      }
                    ], 
                    { 
                      cancelable: true 
                    }
                    )
                }}>
                  <Ionicons name="ellipsis-vertical" color={colors.grey900} size={20} />
                </TouchableOpacity>
              </View>
            );
          })}
        <TouchableOpacity onPress={()=>navigation.navigate("SignInScreen")}>
          <View style={styles.signInOther}>
            <View style={styles.viewIcon}>
              <Ionicons name="add" color={colors.blue800} size={24} />
            </View>
            <Text style={styles.text}>
              Đăng nhập bằng tài khoản khác
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity>
          <View style={styles.signInOther}>
            <View style={styles.viewIcon}>
              <Ionicons name="search-outline" color={colors.blue800} size={24} />
            </View>
            <Text style={styles.text}>
              Tìm tài khoản
            </Text>
          </View>
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        onPress={() => navigation.navigate('CreateAccountScreen')}
      >
        <View style={styles.bottomView}>
          <Text style={styles.bottomText}>TẠO TÀI KHOẢN FACEBOOK MỚI</Text>
        </View>
      </TouchableOpacity>
      <Spinner 
        visible={loading}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    flex: 1,
    justifyContent: 'flex-end',
  },
  top: {
    flexGrow: 1,
    backgroundColor: colors.white,
    justifyContent: 'center',
  },
  facebookIcon: {
    alignSelf: 'center',
    height: 50,
    width: 50,
  },
  signInPersist: {
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: 0,
    paddingHorizontal: 32,
    paddingVertical: 4,
  },
  avatar: {

  },
  username: {
    color: colors.grey900,
    flexGrow: 1,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  signInOther: {
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 32,
    paddingVertical: 4,
  },
  text: {
    color: colors.blue800,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  viewIcon: {
    backgroundColor: colors.blue50,
    borderRadius: 6,
    padding: 2,
  },
  bottomView: {
    backgroundColor: colors.blue50,
    borderRadius: 8,
    marginBottom: 36,
    marginHorizontal: 32,
    padding: 8,
  },
  bottomText: {
    color: colors.blue800,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modal: {
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    flex: 1,
    justifyContent: 'center',
  },
  modalView: {
    backgroundColor: colors.white,
    margin: 30,
    padding: 30,
  },
});

export default SelectAccountScreen;
