/* eslint-disable prettier/prettier */
import { Form, Input, Item, Label } from 'native-base';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import * as colors from './../../constants/colors';

function SignInScreen() {
  const { control, handleSubmit, errors } = useForm();

  return (
    <View style={styles.container}>
      <Image
        source={require('../../imgs/login-img.png')}
        style={styles.image}
      />
      <View style={styles.viewForm}>
        <Form>
          <Controller
            control={control}
            render={({ onChange, onBlur, value }) => (
              <Item
                style={styles.item}
              >
                <Input
                  underlineColorAndroid={colors.blueA400}
                  selectionColor={colors.blue800}
                  onChangeText={v => onChange(v)}
                  onBlur={onBlur}
                  value={value}
                  placeholder="Số điện thoại"
                />
              </Item>
            )}
            name="firstName"
            rules={{ required: true }}
            defaultValue=""
          />
          <Controller
            control={control}
            render={({ onChange, onBlur, value }) => (
              <Item
                style={styles.item}
              >
                <Input
                  underlineColorAndroid={colors.blueA400}
                  selectionColor={colors.blue800}
                  onChangeText={v => onChange(v)}
                  onBlur={onBlur}
                  value={value}
                />
              </Item>
            )}
            name="lastName"
            rules={{ required: true }}
            defaultValue=""
          />
        </Form>
      </View>
      <TouchableOpacity>
        <View>
          <Text>Đăng nhập</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity>
        <View>
          <Text>Quên mật khẩu?</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity>
        <View>
          <Text>Tạo tài khoản Facebook mới</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    flex: 1,
  },
  image: {
    height: 200,
    width: '100%',
  },
  viewForm: {
    marginTop: 50,
    padding: 25,
  },
  item: {
    borderBottomWidth: 0,
  },
});

export default SignInScreen;
