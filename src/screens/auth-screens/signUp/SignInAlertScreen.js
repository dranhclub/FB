/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { loginRequestFromSignInAlertScreen, saveTokenDataFromSignInAlertScreen } from '../../../slices/authSlice';
import * as colors from './../../../constants/colors';

function SignInAlertScreen({ navigation }) {
  const phoneNumberCreated = useSelector(state => state.auth.phoneNumberCreated);
  const passwordCreated = useSelector(state => state.auth.passwordCreated);
  const loadingLoginRequestFromSignInAlertScreen = useSelector(state => state.auth.loadingLoginRequestFromSignInAlertScreen);
  const usernameCreated = useSelector(state => state.auth.usernameCreated);
  const tokenMain = useSelector(state => state.auth.tokenMain);
  const dispatch = useDispatch();
  const [alertShown, setAlertShown] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    dispatch(loginRequestFromSignInAlertScreen({
      phonenumber: phoneNumberCreated,
      password: passwordCreated,
    }));
  }, []);

  useEffect(() => {
    if (!loadingLoginRequestFromSignInAlertScreen && !alertShown) {
      setAlertShown(true);
      Alert.alert(
        'Lần sau, đăng nhập bằng một lần nhấn',
        'Bạn đã đăng nhập Facebook. Hãy lưu mật khẩu và bạn luôn có thể đăng nhập trên điện thoại này bằng cách nhấn vào tài khoản.',
        [
          {
            text: 'LÚC KHÁC',
            onPress: () => {
              dispatch(saveTokenDataFromSignInAlertScreen({
                savePassword: false,
                token: tokenMain,
                username: usernameCreated,
                phoneNumber: phoneNumberCreated,
              }));
              console.log('dont save pw');
              setTimeout(() => {
                setModalVisible(true);
              }, 1500);
            },
          },
          {
            text: 'LƯU MẬT KHẨU',
            onPress: () => {
              dispatch(saveTokenDataFromSignInAlertScreen({
                savePassword: true,
                token: tokenMain,
                username: usernameCreated,
                phoneNumber: phoneNumberCreated,
                password: passwordCreated,
              }));
              console.log('save pw');
              setTimeout(() => {
                setModalVisible(true);
              }, 1500);
            },
          },
        ],
        { cancelable: false }
      );
    }
  });

  return (
    <View style={styles.container}>
      <View style={styles.view}>
        <ActivityIndicator size="small" color={colors.grey700} />
        <Text style={styles.text}>Đang đăng nhập...</Text>
      </View>
      <Modal
        visible={modalVisible}
        transparent={true}
      >
        <View style={styles.modal}>
          <View style={styles.modalView}>
            <Text style={styles.header}>Nhớ sđt và mật khẩu của bạn</Text>
            <Text style={styles.message}>Bạn cần nhập thông tin này mỗi khi đăng nhập trên một thiết bị mới</Text>
            <Text style={styles.email}>Số điện thoại</Text>
            <View style={styles.inputView}>
              <Text style={styles.input}>{phoneNumberCreated}</Text>
            </View>
            <Text style={styles.password}>Mật khẩu</Text>
            <View style={styles.inputView}>
              <Text style={styles.input}>{passwordCreated}</Text>
            </View>
            <TouchableOpacity
              onPress={() => {
                setModalVisible(false);
                setTimeout(() => {
                  navigation.navigate('VerifyAccountScreen');
                }, 1500);
              }}
            >
              <View style={styles.button}>
                <Text style={styles.buttonText}>OK</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: colors.white,
    flex: 1,
  },
  view: {
    marginTop: 230,
  },
  text: {
    color: colors.grey700,
    fontSize: 18,
    fontWeight: 'bold',
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
  header: {
    color: colors.grey900,
    fontSize: 18,
  },
  message: {
    color: colors.grey700,
    fontSize: 16,
    marginTop: 15,
  },
  email: {
    color: colors.grey500,
    marginTop: 15,
  },
  inputView: {
    backgroundColor: colors.blueGrey50,
    marginTop: 2,
    paddingHorizontal: 6,
    paddingVertical: 8,
  },
  input: {
    color: colors.grey900,
  },
  password: {
    color: colors.grey500,
    marginTop: 10,
  },
  button: {
    backgroundColor: colors.blueA400,
    borderRadius: 4,
    marginTop: 25,
    padding: 10,
  },
  buttonText: {
    color: colors.white,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default SignInAlertScreen;
