/* eslint-disable prettier/prettier */
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import { useDispatch, useSelector } from 'react-redux';
import { signUpRequest, loginRequest } from '../../../slices/authSlice';
import * as colors from './../../../constants/colors';

function LicenseScreen({ navigation }) {
  const phoneNumberCreated = useSelector(state => state.auth.phoneNumberCreated);
  const passwordCreated = useSelector(state => state.auth.passwordCreated);
  const usernameCreated = useSelector(state => state.auth.usernameCreated);
  const birthdayCreated = useSelector(state => state.auth.birthdayCreated);
  const loading = useSelector(state => state.auth.loading);
  const signUpError = useSelector(state => state.auth.signUpError);
  const dispatch = useDispatch();

  async function signUp() {
    await dispatch(signUpRequest({
      phoneNumber: phoneNumberCreated,
      password: passwordCreated,
      name: usernameCreated,
      birthday: birthdayCreated,
    }));
    if (!signUpError) {
      dispatch(loginRequest({
        phoneNumber: phoneNumberCreated,
        password: passwordCreated,
      })).then(()=>{
        navigation.navigate("SignInAlertScreen");
      });
    } else {
      navigation.navigate('PhoneNumberScreen');
    }
  }

  return (
    <View style={styles.container}>
      <View>
        <Text>License</Text>
      </View>
      <View>
        <TouchableOpacity onPress={signUp}
        >
          <View>
            <Text>Đăng ký</Text>
          </View>
        </TouchableOpacity>
      </View>
      <Spinner visible={loading} textContent={'Đang tạo tài khoản'}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    flex: 1,
  },
});

export default LicenseScreen;
