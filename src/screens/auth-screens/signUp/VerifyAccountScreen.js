/* eslint-disable prettier/prettier */
import AsyncStorage from '@react-native-community/async-storage';
import { Form, Input, Item, Label } from 'native-base';
import React, { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { ActivityIndicator, Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useDispatch, useSelector } from 'react-redux';
import authApi from '../../../apis/authApi';
import { checkVerifyCodeRequest } from '../../../slices/authSlice';
import * as colors from './../../../constants/colors';

function VerifyAccountScreen({ navigation }) {
  const { control, handleSubmit, errors } = useForm();
  const phoneNumberCreated = useSelector(state => state.auth.phoneNumberCreated);
  const loadingCheckVerifyCodeRequest = useSelector(state => state.auth.loadingCheckVerifyCodeRequest);
  const checkVerifyCodeRequestStatus = useSelector(state => state.auth.checkVerifyCodeRequestStatus);
  const tokenMain = useSelector(state => state.auth.tokenMain);
  const dispatch = useDispatch();

  let errorMsg = null;
  if (errors.verifyCode) {
    errorMsg = (
      <Text style={styles.error}>
        Không được để trống mã xác thực.
      </Text>
    );
  }

  const onSubmit = data => {
    dispatch(checkVerifyCodeRequest({
      phonenumber: phoneNumberCreated,
      code_verify: data.verifyCode,
    }));
  };

  useEffect(() => {
    authApi.getVerifyCode({
      phonenumber: phoneNumberCreated,
    });
  }, []);

  useEffect(() => {
    if (checkVerifyCodeRequestStatus === 'SUCCESS') {
      const storeData = async () => {
        try {
          await AsyncStorage.setItem('tokenPersist', tokenMain);
        } catch (error) {
          console.log('Error at VerifyAccountScreen useEffect:', error.message);
        }
      };
      storeData();
      navigation.navigate('AddYourPhotoScreen');
    }
  });

  return (
    <View style={styles.container}>
      <Text style={styles.topText}>Nhập mã xác thực</Text>
      <View style={styles.viewErrorMsg}>
        {errorMsg}
        {checkVerifyCodeRequestStatus === 'FAILED' && (
          <Text style={styles.error}>
            Mã xác thực không đúng.
          </Text>
        )}
      </View>
      <View style={styles.viewErrorIcon}>
        {errorMsg && <Ionicons name="alert-circle" color={colors.redA400} size={24} />}
        {checkVerifyCodeRequestStatus === 'FAILED' && <Ionicons name="alert-circle" color={colors.redA400} size={24} />}
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
                <Label style={styles.label}>Mã xác thực</Label>
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
            name="verifyCode"
            rules={{
              required: true,
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
      <Modal
        visible={loadingCheckVerifyCodeRequest}
        transparent={true}
      >
        <View style={styles.modal}>
          <View style={styles.modalView}>
            <ActivityIndicator size="small" color={colors.grey700} />
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
});

export default VerifyAccountScreen;
