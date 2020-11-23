/* eslint-disable prettier/prettier */
import { Form, Input, Item, Label } from 'native-base';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useDispatch } from 'react-redux';
import { saveUsernameCreated } from '../../../slices/authSlice';
import * as colors from './../../../constants/colors';

function NameScreen({ navigation }) {
  const { control, handleSubmit, errors } = useForm();
  const dispatch = useDispatch();

  let errorMsg = null;
  if (errors.firstName && errors.lastName) {
    errorMsg = <Text style={styles.error}>Vui lòng nhập họ và tên của bạn.</Text>;
  } else if (errors.firstName) {
    errorMsg = <Text style={styles.error}>Vui lòng nhập họ của bạn.</Text>;
  } else if (errors.lastName) {
    errorMsg = <Text style={styles.error}>Vui lòng nhập tên của bạn.</Text>;
  }

  const onSubmit = data => {
    dispatch(saveUsernameCreated({
      usernameCreated: `${data.firstName} ${data.lastName}`,
    }));
    navigation.navigate('BirthdayScreen');
  };

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.text}>Bạn tên gì?</Text>
      </View>
      <View style={styles.viewErrorMsg}>
        {errorMsg}
      </View>
      <View style={styles.viewErrorIcon}>
        {errorMsg && <Ionicons name="alert-circle" color={colors.redA400} size={24} />}
      </View>
      <View style={styles.mid}>
        <Form style={styles.form}>
          <Controller
            control={control}
            render={({ onChange, onBlur, value }) => (
              <Item
                floatingLabel
                style={styles.item}
              >
                <Label style={styles.label}>Họ</Label>
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
            name="firstName"
            rules={{ required: true }}
            defaultValue=""
          />
          <Controller
            control={control}
            render={({ onChange, onBlur, value }) => (
              <Item
                floatingLabel
                style={styles.item}
              >
                <Label style={styles.label}>Tên</Label>
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
      <View style={styles.bottom}>
        <TouchableOpacity
          onPress={handleSubmit(onSubmit)}
        >
          <View style={styles.bottomButton}>
            <Text style={styles.bottomButtonText}>Tiếp</Text>
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
    paddingTop: 84,
  },
  text: {
    color: colors.grey900,
    fontSize: 18,
    fontWeight: 'bold',
  },
  viewErrorMsg: {
    marginTop: 12,
  },
  viewErrorIcon: {
    alignSelf: 'flex-end',
  },
  error: {
    color: colors.redA400,
  },
  mid: {
    flexDirection: 'row',
    marginTop: 12,
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
  bottom: {
    alignSelf: 'stretch',
    marginLeft: 8,
    marginRight: 8,
    marginTop: 92,
  },
  bottomButton: {
    alignItems: 'center',
    backgroundColor: colors.blueA400,
    borderRadius: 8,
    padding: 12,
  },
  bottomButtonText: {
    color: colors.white,
  },
});

export default NameScreen;
