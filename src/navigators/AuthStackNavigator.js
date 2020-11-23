/* eslint-disable prettier/prettier */
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import SelectAccountScreen from '../screens/auth-screens/SelectAccountScreen';
import SignInScreen from '../screens/auth-screens/SignInScreen';
import AddYourPhotoScreen from '../screens/auth-screens/signUp/AddYourPhotoScreen';
import BirthdayScreen from '../screens/auth-screens/signUp/BirthdayScreen';
import CreateAccountLoadingScreen from '../screens/auth-screens/signUp/CreateAccountLoadingScreen';
import CreateAccountScreen from '../screens/auth-screens/signUp/CreateAccountScreen';
import LicenseScreen from '../screens/auth-screens/signUp/LicenseScreen';
import NameScreen from '../screens/auth-screens/signUp/NameScreen';
import PasswordScreen from '../screens/auth-screens/signUp/PasswordScreen';
import PhoneNumberScreen from '../screens/auth-screens/signUp/PhoneNumberScreen';
import SeeYourPhotoScreen from '../screens/auth-screens/signUp/SeeYourPhotoScreen';
import SignInAlertScreen from '../screens/auth-screens/signUp/SignInAlertScreen';
import VerifyAccountScreen from '../screens/auth-screens/signUp/VerifyAccountScreen';

const Stack = createStackNavigator();

function AuthStackNavigator() {
  return (
    <Stack.Navigator initialRouteName="SelectAccountScreen">
      <Stack.Screen
        name="SelectAccountScreen"
        component={SelectAccountScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="CreateAccountScreen"
        component={CreateAccountScreen}
        options={{
          title: 'Tạo tài khoản',
        }}
      />
      <Stack.Screen
        name="NameScreen"
        component={NameScreen}
        options={{
          title: 'Tên',
        }}
      />
      <Stack.Screen
        name="BirthdayScreen"
        component={BirthdayScreen}
        options={{
          title: 'Ngày sinh',
        }}
      />
      <Stack.Screen
        name="PhoneNumberScreen"
        component={PhoneNumberScreen}
        options={{
          title: 'Số di động',
        }}
      />
      <Stack.Screen
        name="PasswordScreen"
        component={PasswordScreen}
        options={{
          title: 'Mật khẩu',
        }}
      />
      <Stack.Screen
        name="LicenseScreen"
        component={LicenseScreen}
        options={{
          title: 'Điều khoản & quyền riêng tư',
        }}
      />
      <Stack.Screen
        name="CreateAccountLoadingScreen"
        component={CreateAccountLoadingScreen}
        options={{
          title: 'Tạo tài khoản',
        }}
      />
      <Stack.Screen
        name="SignInAlertScreen"
        component={SignInAlertScreen}
        options={{
          headerLeft: () => null,
          title: 'Đang đăng nhập...',
        }}
      />
      <Stack.Screen
        name="VerifyAccountScreen"
        component={VerifyAccountScreen}
        options={{
          headerLeft: () => null,
          title: 'Xác nhận Tài khoản',
        }}
      />
      <Stack.Screen
        name="AddYourPhotoScreen"
        component={AddYourPhotoScreen}
        options={{
          headerLeft: () => null,
          title: 'Thêm ảnh của bạn',
        }}
      />
      <Stack.Screen
        name="SeeYourPhotoScreen"
        component={SeeYourPhotoScreen}
        options={{
          title: 'Xem trước',
        }}
      />
      <Stack.Screen
        name="SignInScreen"
        component={SignInScreen}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}

export default AuthStackNavigator;
