/* eslint-disable prettier/prettier */
import { Thumbnail } from 'native-base';
import React from 'react';
import { ActivityIndicator, Image, Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useDispatch, useSelector } from 'react-redux';
import { loginRequestFromSelectAccountScreen } from '../../slices/authSlice';
import * as colors from './../../constants/colors';

function SelectAccountScreen({ navigation }) {
  const haveDataPersist = useSelector(state => state.auth.haveDataPersist);
  const avatarPersist = useSelector(state => state.auth.avatarPersist);
  const avatarComponent = avatarPersist ? (
    <>
      <Thumbnail
        source={{uri: avatarPersist}}
        style={styles.avatar}
      />
    </>
  ) : (
      <>
        <Thumbnail
          source={require('../../imgs/default-avatar.jpg')}
          style={styles.avatar}
        />
      </>
    );
  const usernamePersist = useSelector(state => state.auth.usernamePersist);
  const phoneNumberPersist = useSelector(state => state.auth.phoneNumberPersist);
  const passwordPersist = useSelector(state => state.auth.passwordPersist);
  const deviceToken = useSelector(state => state.auth.deviceToken);
  const loadingLoginRequestFromSelectAccountScreen = useSelector(state => state.auth.loadingLoginRequestFromSelectAccountScreen);
  const dispatch = useDispatch();

  const onLogin = () => {
    if (passwordPersist) {
      dispatch(loginRequestFromSelectAccountScreen({
        phoneNumber: phoneNumberPersist,
        password: passwordPersist,
        uuid: `${Math.trunc(1000 + 9000 * Math.random())}`,
        deviceToken: deviceToken
      }));
    } else {

    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.top}>
        <Image
          source={require('../../imgs/logoFB.jpg')}
          style={styles.facebookIcon}
        />
        {haveDataPersist && (
          <TouchableOpacity
            onPress={onLogin}
          >
            <View style={styles.signInPersist}>
              {avatarComponent}
              <Text style={styles.username}>
                {usernamePersist}
              </Text>
              <Ionicons name="ellipsis-vertical" color={colors.grey900} size={20} />
            </View>
          </TouchableOpacity>
        )}
        <TouchableOpacity onPress={()=>navigation.navigate("SignInScreen")}>
          <View style={styles.signInOther}>
            <View style={styles.viewIcon}>
              <Ionicons name="add" color={colors.blue800} size={24} />
            </View>
            <Text style={styles.text}>
              Đăng nhập bằng tài khoản khác
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity>
          <View style={styles.signInOther}>
            <View style={styles.viewIcon}>
              <Ionicons name="search-outline" color={colors.blue800} size={24} />
            </View>
            <Text style={styles.text}>
              Tìm tài khoản
            </Text>
          </View>
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        onPress={() => navigation.navigate('CreateAccountScreen')}
      >
        <View style={styles.bottomView}>
          <Text style={styles.bottomText}>TẠO TÀI KHOẢN FACEBOOK MỚI</Text>
        </View>
      </TouchableOpacity>
      <Spinner 
        visible={loadingLoginRequestFromSelectAccountScreen}
      />
      {/* <Modal
        transparent={true}
      >
        <View style={styles.modal}>
          <View style={styles.modalView}>
            <ActivityIndicator size="small" color={colors.grey700} />
          </View>
        </View>
      </Modal> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    flex: 1,
    justifyContent: 'flex-end',
  },
  top: {
    flexGrow: 1,
    backgroundColor: colors.white,
    justifyContent: 'center',
  },
  facebookIcon: {
    alignSelf: 'center',
    height: 50,
    width: 50,
  },
  signInPersist: {
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: 20,
    paddingHorizontal: 32,
    paddingVertical: 4,
  },
  avatar: {

  },
  username: {
    color: colors.grey900,
    flexGrow: 1,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  signInOther: {
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 32,
    paddingVertical: 4,
  },
  text: {
    color: colors.blue800,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  viewIcon: {
    backgroundColor: colors.blue50,
    borderRadius: 6,
    padding: 2,
  },
  bottomView: {
    backgroundColor: colors.blue50,
    borderRadius: 8,
    marginBottom: 36,
    marginHorizontal: 32,
    padding: 8,
  },
  bottomText: {
    color: colors.blue800,
    fontWeight: 'bold',
    textAlign: 'center',
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

export default SelectAccountScreen;
