import React, { useEffect, useState } from 'react'
import { Button, StyleSheet, Text, TextInput, View, Dimensions, Keyboard} from 'react-native'
import Spinner from 'react-native-loading-spinner-overlay';
import Image from 'react-native-scalable-image'
import { AuthContext, RegisterContext } from '../contexts/MyContexts';
import { WarningComponent } from './LoginScreen';

export default function RegisterScreen() {
  const [isShowImage, setIsShowImage] = useState(true);
  const [phonenumber, setPhonenumber] = useState('');
  const [password, setPassword] = React.useState('');

  const [wrongPhonenumber, setWrongPhonenumber] = useState(false);
  const [invalidPassword, setInvalidPassword] = useState(false);
  const [wrongVerifyPassword, setWrongVerifyPassword] = useState(false);


  const {signUp} = React.useContext(AuthContext);
  const { error, isLoading } = React.useContext(RegisterContext);

  useEffect(() => {
    Keyboard.addListener("keyboardDidShow", _keyboardDidShow);
    Keyboard.addListener("keyboardDidHide", _keyboardDidHide);

    // cleanup function
    return () => {
      Keyboard.removeListener("keyboardDidShow", _keyboardDidShow);
      Keyboard.removeListener("keyboardDidHide", _keyboardDidHide);
    };
  }, []);

  const _keyboardDidShow = () => {
    setIsShowImage(false);
  };

  const _keyboardDidHide = () => {
    setIsShowImage(true);
  };

  const onChangePhonenumber = (text) => {
    if (text == '') setWrongPhonenumber(true);
    var nonDigit = /[^0-9]/g;
    if (text === '' || !nonDigit.test(text)) {
      setWrongPhonenumber(false);
      setPhonenumber(text)
    } else {
      setWrongPhonenumber(true);
    }
  }

  const onChangePassword = (text) => {
    if (text == '') setInvalidPassword(true);
    else setInvalidPassword(false);
  }

  const onChangeVerifyPassword = (text) => {
    setWrongVerifyPassword(text != password);
  }

  return(
    <View style={styles.container}>
      <Spinner visible={isLoading}/>
      {
          isShowImage ? (
            <Image style={styles.registerImg} width={Dimensions.get('window').width} source={require('../imgs/register-img.png')} />
          ) : <></>
      }
      <View style={styles.topWrapper}>
        <TextInput style={styles.textInput} placeholder='Số điện thoại' onChangeText={onChangePhonenumber} />
        {wrongPhonenumber ? <WarningComponent text='Số điện thoại không hợp lệ'/> : null}
        <TextInput style={styles.textInput} secureTextEntry={true} placeholder='Mật khẩu' onChangeText={onChangePassword}/>
        {invalidPassword ? <WarningComponent text='Mật khẩu không được để trống'/> : null}
        <TextInput style={styles.textInput} secureTextEntry={true} placeholder='Nhập lại mật khẩu' onChangeText={onChangeVerifyPassword}/>
        {wrongVerifyPassword ? <WarningComponent text='Mật khẩu không khớp'/> : null}
        <View style={{marginTop: 20}}>
            {
              error === 'USER_EXISTED' ? <WarningComponent text='Số điện thoại đã được đăng ký'/> :
              error === 'NET_ERR' ? <WarningComponent text='Lỗi kết nối'/> : 
              error === 'UNKNOWN' ? <WarningComponent text='Lỗi không xác định' /> : null
            }
        </View>
        <Button color={'#2979FF'} title='Đăng ký' onPress={() => {
          if (!wrongVerifyPassword && !wrongPhonenumber && phonenumber != '') signUp({ phonenumber, password })
        }}/>
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
    flex: 1
  },
  registerImg: {
    marginLeft: 'auto',
    marginRight: 'auto'
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
    marginRight: 10
  }
});