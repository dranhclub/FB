/* eslint-disable prettier/prettier */
import { Form, Input, Item, Label } from 'native-base';
import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useDispatch, useSelector } from 'react-redux';
import { savePasswordCreated } from '../../../slices/authSlice';
import * as colors from './../../../constants/colors';

function PasswordScreen({ navigation }) {
  const { control, handleSubmit, errors } = useForm();
  const phoneNumberCreated = useSelector(state => state.auth.phoneNumberCreated);
  const dispatch = useDispatch();
  const [error, setError] = useState(false);

  let errorMsg = null;
  if (errors.password) {
    errorMsg = (
      <Text style={styles.error}>
        Mật khẩu của bạn phải có từ 6 đến 10 ký tự,
        không chứa ký tự đặc biệt.
      </Text>
    );
  }

  const onSubmit = data => {
    if (data.password === phoneNumberCreated) {
      setError(true);
    } else {
      dispatch(savePasswordCreated({
        passwordCreated: data.password,
      }));
      navigation.navigate('LicenseScreen');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.topText}>Chọn mật khẩu</Text>
      <View style={styles.viewErrorMsg}>
        {errorMsg}
        {error && <Text style={styles.error}>
          Mật khẩu của bạn phải không trùng với số điện thoại.
        </Text>}
      </View>
      <View style={styles.viewErrorIcon}>
        {errorMsg && <Ionicons name="alert-circle" color={colors.redA400} size={24} />}
        {error && <Ionicons name="alert-circle" color={colors.redA400} size={24} />}
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
                <Label style={styles.label}>Mật khẩu</Label>
                <Input
                  underlineColorAndroid={colors.blueA400}
                  selectionColor={colors.blue800}
                  autoFocus
                  onChangeText={v => onChange(v)}
                  onBlur={onBlur}
                  value={value}
                />
              </Item>
            )}
            name="password"
            rules={{
              required: true,
              pattern: /^\w{6,10}$/,
            }}
            defaultValue=""
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
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: colors.white,
    flex: 1,
    paddingLeft: 16,
    paddingRight: 16,
    paddingTop: 72,
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

export default PasswordScreen;
