/* eslint-disable prettier/prettier */
import { Form, Input, Item, Label } from 'native-base';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useDispatch, useSelector } from 'react-redux';
import { clearSignUpError, savePhoneNumberCreated } from '../../../slices/authSlice';
import * as colors from './../../../constants/colors';

function PhoneNumberScreen({ navigation, route }) {
  const { control, handleSubmit, errors } = useForm();
  const phoneNumberCreated = useSelector(state => state.auth.phoneNumberCreated);
  const signUpError = useSelector(state => state.auth.signUpError);
  const dispatch = useDispatch();

  let errorMsg = null;
  if (errors.phoneNumber) {
    errorMsg = (
      <Text style={styles.error}>
        Vui lòng nhập một số điện thoại hợp lệ hoặc dùng địa chỉ email của bạn.
      </Text>
    );
  }

  const onSubmit = data => {
    dispatch(savePhoneNumberCreated({
      phoneNumberCreated: data.phoneNumber,
    }));
    if (signUpError) {
      dispatch(clearSignUpError());
      navigation.navigate('CreateAccountLoadingScreen');
    } else {
      navigation.navigate('PasswordScreen');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.top}>
        <Text style={styles.topText}>Nhập số di động của bạn</Text>
        <View style={styles.viewErrorMsg}>
          {errorMsg}
          {signUpError && (
            <Text style={styles.error}>
              {signUpError.message}
            </Text>
          )}
        </View>
        <View style={styles.viewErrorIcon}>
          {errorMsg && <Ionicons name="alert-circle" color={colors.redA400} size={24} />}
          {signUpError && <Ionicons name="alert-circle" color={colors.redA400} size={24} />}
        </View>
        <View style={styles.viewForm}>
          <Form style={styles.form}>
            <Controller
              control={control}
              render={({ onChange, onBlur, value }) => (
                <Item
                  floatingLabel
                  style={styles.item}
                >
                  <Label style={styles.label}>Số di động</Label>
                  <Input
                    underlineColorAndroid={colors.blueA400}
                    selectionColor={colors.blue800}
                    keyboardType="phone-pad"
                    autoFocus
                    onChangeText={v => onChange(v)}
                    onBlur={onBlur}
                    value={value}
                  />
                </Item>
              )}
              name="phoneNumber"
              rules={{
                required: true,
                // pattern: /^[0]{1}[1-9]{1}[0-9]{8}$/,
              }}
              defaultValue={phoneNumberCreated}
            />
          </Form>
        </View>
        <View style={styles.viewButton}>
          <TouchableOpacity
            onPress={handleSubmit(onSubmit)}
          >
            <View style={styles.viewButtonView}>
              <Text style={styles.viewButtonText}>Tiếp</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
      <View>
        <TouchableOpacity
          onPress={() => {
            alert('Hệ thống chỉ cho đăng ký bằng số điện thoại!');
          }}
        >
          <View>
            <Text style={styles.bottomText}>Đăng ký bằng địa chỉ email</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: colors.white,
    flex: 1,
    justifyContent: 'flex-end',
    padding: 16,
  },
  top: {
    alignItems: 'center',
    flexGrow: 1,
    marginTop: 48,
  },
  topText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  viewErrorMsg: {
    marginTop: 12,
    paddingLeft: 14,
    paddingRight: 14,
  },
  viewErrorIcon: {
    alignSelf: 'flex-end',
  },
  error: {
    color: colors.redA400,
    textAlign: 'center',
  },
  viewForm: {
    flexDirection: 'row',
  },
  form: {
    flexDirection: 'row',
    flexGrow: 1,
  },
  item: {
    borderBottomWidth: 0,
    flexGrow: 1,
  },
  label: {
    color: colors.blue800,
    fontSize: 12,
  },
  viewButton: {
    alignSelf: 'stretch',
    marginLeft: 8,
    marginRight: 8,
    marginTop: 92,
  },
  viewButtonView: {
    alignItems: 'center',
    backgroundColor: colors.blueA400,
    borderRadius: 8,
    padding: 12,
  },
  viewButtonText: {
    color: colors.white,
  },
  bottomText: {
    color: colors.blueA400,
    fontWeight: 'bold',
  },
});

export default PhoneNumberScreen;
