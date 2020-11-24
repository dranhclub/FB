/* eslint-disable prettier/prettier */
import React, { useEffect } from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { signUpRequest } from '../../../slices/authSlice';
import * as colors from './../../../constants/colors';

function CreateAccountLoadingScreen({ navigation }) {
  const phoneNumberCreated = useSelector(state => state.auth.phoneNumberCreated);
  const passwordCreated = useSelector(state => state.auth.passwordCreated);
  const loadingSignUpRequest = useSelector(state => state.auth.loadingSignUpRequest);
  const createAccountStatus = useSelector(state => state.auth.createAccountStatus);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(signUpRequest({
      phoneNumber: phoneNumberCreated,
      password: passwordCreated,
      uuid: `${Math.trunc(1000 + 9000 * Math.random())}`,
    }));
  }, []);

  useEffect(() => {
    if (createAccountStatus === 'SUCCESS') {
      setTimeout(() => {
        navigation.navigate('SignInAlertScreen');
      }, 1500);
    } else if (createAccountStatus === 'FAILED') {
      navigation.navigate('PhoneNumberScreen', {error: true});
    }
  });

  if (createAccountStatus === 'SUCCESS') {
    return (
      <View style={styles.container}>
        <Text>Animation...</Text>
      </View>
    );
  }

  if (!loadingSignUpRequest) {
    return <View style={styles.container} />;
  } else {
    return (
      <View style={styles.container}>
        <View style={styles.view}>
          <ActivityIndicator size="small" color={colors.grey700} />
          <Text style={styles.text}>Đang tạo tài khoản...</Text>
        </View>
      </View>
    );
  }
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
});

export default CreateAccountLoadingScreen;
