import React, { useLayoutEffect } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import ImagePicker from 'react-native-image-picker';
import { useDispatch, useSelector } from 'react-redux';
import { changeInfoAfterSignUpRequest } from '../../../slices/authSlice';
import * as colors from './../../../constants/colors';

function AddYourPhotoScreen({ navigation }) {
  const token = useSelector(state => state.auth.currentUser.token);
  const usernameCreated = useSelector(state => state.auth.usernameCreated);
  const loading = useSelector(state => state.auth.loading);
  
  const dispatch = useDispatch();

  const onIgnore = () => {
    dispatch(changeInfoAfterSignUpRequest({
      token: token,
      username: usernameCreated,
    }));
  };

  const selectFromLibrary = () => {
    ImagePicker.launchImageLibrary({
      storageOptions: {
        path: 'images',
      },
      mediaType: 'photo',
    }, response => {
      if (response.didCancel) {

      } else if (response.error) {

      } else {
        const source = { uri: response.uri };
        navigation.navigate('SeeYourPhotoScreen', source);
      }
    });
  };

  const selectFromCamera = () => {
    ImagePicker.launchCamera({
      storageOptions: {
        path: 'images',
      },
      mediaType: 'photo',
    }, response => {
      if (response.didCancel) {

      } else if (response.error) {

      } else {
        const source = { uri: response.uri };
        navigation.navigate('SeeYourPhotoScreen', source);
      }
    });
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          onPress={onIgnore}
        >
          <View style={styles.stackButton}>
            <Text style={styles.stackText}>
              Bỏ qua
            </Text>
          </View>
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  return (
    <View style={styles.container}>
      <View style={styles.top}>
        <Text style={styles.topText}>Hãy thêm ảnh đại diện để bạn bè dễ dàng tìm thấy bạn hơn</Text>
        <Image
          style={styles.image}
          source={require('../../../imgs/addYourPhoto.jpg')}
        />
      </View>
      <View style={styles.bottom}>
        <TouchableOpacity
          onPress={selectFromLibrary}
        >
          <View style={styles.topButton}>
            <Text style={styles.topButtonText}>Chọn từ thư viện</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={selectFromCamera}
        >
          <View style={styles.bottomButton}>
            <Text style={styles.bottomButtonText}>Chụp ảnh</Text>
          </View>
        </TouchableOpacity>
      </View>
      <Spinner 
        visible={loading}
      />
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
    alignItems: 'center',
    flex: 1,
    padding: 25,
  },
  topText: {
    color: colors.grey900,
    fontSize: 22,
    textAlign: 'center',
  },
  image: {
    height: 140,
    marginTop: 50,
    width: 180,
  },
  bottom: {
    borderTopColor: colors.grey500,
    borderTopWidth: 1,
    padding: 20,
  },
  topButton: {
    backgroundColor: colors.blueA400,
    borderRadius: 4,
    padding: 10,
  },
  topButtonText: {
    color: colors.white,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  bottomButton: {
    backgroundColor: colors.blue50,
    borderRadius: 4,
    marginTop: 15,
    padding: 10,
  },
  bottomButtonText: {
    color: colors.blueA400,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  stackButton: {
    marginRight: 10,
  },
  stackText: {
    color: colors.grey700,
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

export default AddYourPhotoScreen;
