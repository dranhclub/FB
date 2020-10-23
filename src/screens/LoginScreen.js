import React, { useEffect, useState } from 'react'
import { Button, Text, TextInput, View, StyleSheet, TouchableOpacity,Dimensions, Keyboard} from 'react-native'
import Image from 'react-native-scalable-image';
import Spinner from 'react-native-loading-spinner-overlay';
import {AuthContext, LoginContext} from '../contexts/MyContexts';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

export function WarningComponent({text}) {
  return(
    <View style={styles.warning}>
      <Text style={styles.warningText}>{text}</Text>
      <FontAwesome5 name='exclamation-circle' color='#FF5252' />
    </View>
  );
}

export default function LoginScreen ({navigation}) {
  const [phonenumber, setPhonenumber] = React.useState('');
  const [password, setPassword] = React.useState('');

  const [wrongPhonenumber, setWrongPhonenumber] = useState(false);

  const { signIn } = React.useContext(AuthContext);
  const { error, isLoading } = React.useContext(LoginContext);

  const [isShowImage, setIsShowImage] = useState(true);

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
    var nonDigit = /[^0-9]/g;
    if (text === '' || !nonDigit.test(text)) {
      setWrongPhonenumber(false);
      setPhonenumber(text)
    } else {
      setWrongPhonenumber(true);
    }
  }

  return(
    <View style={styles.container}>
      <Spinner visible={isLoading}/>
      {
        isShowImage ? (
          <Image style={styles.registerImg} width={Dimensions.get('window').width} source={require('../imgs/login-img.png')} />
        ) : <></>
      }
      <View style={styles.subContainer}>
        <View style={styles.topWrapper}>
          <TextInput style={styles.textInput} placeholder='Số điện thoại' onChangeText={onChangePhonenumber} />
          {wrongPhonenumber ? <WarningComponent text='Số điện thoại không hợp lệ'/> : null}
          <TextInput style={styles.textInput} secureTextEntry={true} placeholder='Mật khẩu' onChangeText={setPassword}/>
          <View style={{marginTop: 20}}>
            {
              error === 'INCORRECT' ? <WarningComponent text='Sai tên đăng nhập hoặc mật khẩu'/> :
              error === 'NET_ERR' ? <WarningComponent text='Lỗi kết nối'/> : null
            }
          </View>
          <Button color={'#2979FF'} title='Đăng nhập' onPress={() => { if (!wrongPhonenumber) signIn({ phonenumber, password }) }} />
        </View>
        <View style={{marginBottom: 20}}>
          <View style={{borderBottomWidth: 1, borderColor: '#ccc'}}></View>
          <View style={{marginTop: -10, justifyContent: 'space-around', flexDirection: 'row'}}>
            <Text style={{textAlign: 'center', backgroundColor: 'white', color: '#777'}}>HOẶC</Text>
          </View>
        </View>
        <Button color={'#43A047'} title='Tạo tài khoản mới' onPress={() => navigation.navigate('RegisterScreen')}/>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
    flexGrow: 1
  },
  subContainer: {
    padding: 20,
    flex: 1
  },  
  textInput: {
    borderBottomColor: '#2979FF',
    borderBottomWidth: 2,
    backgroundColor: 'white',
    marginBottom: 10,
    fontFamily: 'sans-serif',
    fontSize: 20,
  },
  textBlue: {
    color: '#3b5998'
  },
  topWrapper: {
    flex: 1,
  },
  bottomWrapper: {

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
