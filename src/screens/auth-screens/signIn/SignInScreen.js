import React, { useState, useEffect } from 'react';
import { Form, Input, Item, Label } from 'native-base';
import { Controller, useForm } from 'react-hook-form';
import { Image, StyleSheet, Text, TouchableOpacity, View, Keyboard} from 'react-native';
import * as colors from '../../../constants/colors';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useDispatch, useSelector } from 'react-redux';
import { loginRequest, clearSignInError } from '../../../slices/authSlice';
import Spinner from 'react-native-loading-spinner-overlay';

function SignInScreen({navigation}) {
  const loading = useSelector(state => state.auth.loading);
  const currentUser = useSelector(state => state.auth.currentUser); // dùng khi bootstrapAsync login failed, điền sẵn sđt vào ô nhập
  const signInError =useSelector(state => state.auth.signInError);
  const dispatch = useDispatch();

  const { control, handleSubmit, errors } = useForm();
  const [showCoverImg, setShowCoverImg] = useState(true);

  useEffect(()=>{
    dispatch(clearSignInError());
  }, [navigation]);

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
    setShowCoverImg(false);
  };

  const _keyboardDidHide = () => {
    setShowCoverImg(true);
  };
  
  let errorMsg = null;
  if (errors.phoneNumber) {
    errorMsg = (
      <Text style={styles.error}>
        Vui lòng nhập một số điện thoại hợp lệ.
      </Text>
    );
  } 
  else if (errors.password) {
    errorMsg = (
      <Text style={styles.error}>
        Vui lòng nhập một mật khẩu hợp lệ.
      </Text>
    );
  }

  if (signInError) {
    errorMsg = (
      <Text style={styles.error}>
        {signInError.message}
      </Text>
    )
  }

  const onSubmit = (data) => {
    dispatch(loginRequest({
      phoneNumber: data.phoneNumber,
      password: data.password,
    }));
  }

  return (
    <View style={styles.container}>
      { showCoverImg && <Image source={require('../../../imgs/login-img.png')} style={styles.image} /> }
      <Spinner visible={loading} />
      <View>
        {errorMsg}
        {errorMsg && <Ionicons name="alert-circle" color={colors.redA400} size={24} />}
      </View>
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
                  keyboardType={'phone-pad'}
                />
              </Item>
            )}
            name="phoneNumber"
            rules={{
              required: true,
              // pattern: /^[0]{1}[1-9]{1}[0-9]{8}$/,
            }}
            defaultValue={currentUser ? currentUser.phoneNumber ? currentUser.phoneNumber : '' : ''}
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
                  placeholder="Mật khẩu"
                />
              </Item>
            )}
            name="password"
            rules={{ required: true }}
            defaultValue=""
          />
        </Form>
      </View>
      <TouchableOpacity onPress={handleSubmit(onSubmit)}>
        <View>
          <Text>Đăng nhập</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity>
        <View>
          <Text>Quên mật khẩu?</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={()=>navigation.navigate("CreateAccountScreen")}>
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
  error: {
    color: colors.redA400,
    textAlign: 'center',
  },
});

export default SignInScreen;
