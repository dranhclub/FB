/* eslint-disable prettier/prettier */
import React, { useLayoutEffect } from 'react';
import { ActivityIndicator, Image, Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useDispatch, useSelector } from 'react-redux';
import { changeInfoAfterSignUpRequest } from '../../../slices/authSlice';
import * as colors from './../../../constants/colors';

function SeeYourPhotoScreen({ navigation, route }) {
  const token = useSelector(state => state.auth.currentUser.token);
  const usernameCreated = useSelector(state => state.auth.usernameCreated);
  const loading = useSelector(state => state.auth.loading);
  const dispatch = useDispatch();

  const onSave = () => {
    dispatch(changeInfoAfterSignUpRequest({
      token: token,
      username: usernameCreated,
      avatar: route.params,
    }));
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          onPress={onSave}
        >
          <View style={styles.stackButton}>
            <Text style={styles.stackText}>
              LƯU
            </Text>
          </View>
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        Đến: <Ionicons name="earth" color={colors.grey700} size={16} /> Công khai
      </Text>
      <Image
        style={styles.image}
        source={route.params}
      />
      <Spinner visible={loading} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    flex: 1,
    padding: 20,
  },
  text: {
    color: colors.grey700,
  },
  image: {
    alignSelf: 'center',
    height: 350,
    marginTop: 10,
    resizeMode: 'cover',
    width: 350,
  },
  stackButton: {
    marginRight: 10,
  },
  stackText: {
    color: colors.grey700,
  },
});

export default SeeYourPhotoScreen;
