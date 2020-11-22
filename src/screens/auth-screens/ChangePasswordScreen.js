import React, {useEffect, useState} from 'react';
import {
  Button,
  StyleSheet,
  Text,
  TextInput,
  View,
  Dimensions,
  KeyboardAvoidingView,
  Keyboard,
} from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import {AuthContext, RegisterContext} from '../contexts/MyContexts';
import {WarningComponent} from './LoginScreen';
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';
const API_SERVER_URL = 'https://hidden-refuge-96933.herokuapp.com/';

export default function ChangePasswordScreen({navigation}) {

  const {signOut} = React.useContext(AuthContext);
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = React.useState('');

  const [invalidOldPassword, setInvalidOldPassword] = useState(false);
  const [invalidPassword, setInvalidPassword] = useState(false);
  const [wrongVerifyPassword, setWrongVerifyPassword] = useState(false);

  const {error, isLoading} = React.useContext(RegisterContext);

  const onChangeOldPassword = (text) => {
    if (text !== '') {
      setInvalidOldPassword(false);
      setOldPassword(text);
    } else {
      setInvalidOldPassword(true);
    }
  };

  const onChangePassword = (text) => {
    if (text == '' || text === oldPassword) setInvalidPassword(true);
    else {
      setInvalidPassword(false);
      setNewPassword(text);
    }
  };

  const onChangeVerifyPassword = (text) => {
    setWrongVerifyPassword(text != newPassword);
  };

  const changePassword = async () => {
    // TODO: gọi API change password, nhận và xử lí response
    let token = '';
    try {
      token = await AsyncStorage.getItem('userToken');
    } catch (e) {
      console.log('Restoring token failed');
      console.log(e);
    }
    // Example:
    console.log({
      token,
      password: oldPassword,
      newPassword: newPassword,
    });
    axios
      .post(API_SERVER_URL + 'change_password', {
        token,
        password: oldPassword,
        newPassword: newPassword,
      })
      .then(function (response) {
        console.log(response.data);
        if (response.data.code == 1000) {
          alert(response.data.message);
          navigation.navigate('NewfeedScreen');
        }
        if (response.data.code == 1) {
          alert(response.data.message);
          signOut()
        }
        if (response.data.code == 0) {
          alert(response.data.message);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <View style={styles.container}>
      <Spinner visible={isLoading} />
      <View style={styles.topWrapper}>
        <TextInput
          style={styles.textInput}
          secureTextEntry={true}
          placeholder="Mật khẩu cũ"
          onChangeText={onChangeOldPassword}
        />
        {invalidOldPassword ? (
          <WarningComponent text="Điền mật khẩu cũ không được để trống" />
        ) : null}
        <TextInput
          style={styles.textInput}
          secureTextEntry={true}
          placeholder="Mật khẩu mới"
          onChangeText={onChangePassword}
        />
        {invalidPassword ? (
          newPassword === '' ? (
            <WarningComponent text="Mật khẩu mới không được để trống" />
          ) : (
            <WarningComponent text="Điền mật khẩu cũ phải khác mật khẩu mới" />
          )
        ) : null}
        <TextInput
          style={styles.textInput}
          secureTextEntry={true}
          placeholder="Nhập lại mật khẩu mới"
          onChangeText={onChangeVerifyPassword}
        />
        {wrongVerifyPassword ? (
          <WarningComponent text="Mật khẩu mới không khớp" />
        ) : null}
        <View style={{marginTop: 20}}>
          {error === 'WRONG_PASSWORD' ? (
            <WarningComponent text="Mật khẩu cũ không đúng" />
          ) : error === 'NET_ERR' ? (
            <WarningComponent text="Lỗi kết nối" />
          ) : error === 'UNKNOWN' ? (
            <WarningComponent text="Lỗi không xác định" />
          ) : null}
        </View>
        <Button
          color={'#2979FF'}
          title="Đổi mật khẩu"
          onPress={() => {
            if (
              !wrongVerifyPassword &&
              !invalidOldPassword &&
              oldPassword != ''
            )
              changePassword({
                oldPassword: oldPassword,
                newPassword: newPassword,
              });
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 10,
    flexDirection: 'column',
    // justifyContent: 'space-between',
    flex: 1,
  },
  registerImg: {
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  topWrapper: {
    flex: 1,
  },
  textInput: {
    borderBottomColor: '#2979FF',
    borderBottomWidth: 2,
    backgroundColor: 'white',
    marginBottom: 10,
    fontFamily: 'sans-serif',
    fontSize: 20,
  },
  warning: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
  },
  warningText: {
    textAlign: 'center',
    color: '#FF5252',
    marginRight: 10,
  },
});
