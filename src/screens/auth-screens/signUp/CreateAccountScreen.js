/* eslint-disable prettier/prettier */
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import * as colors from './../../../constants/colors';

function CreateAccountScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={styles.top}>
        <Image
          source={require('../../../imgs/register-img.png')}
          style={styles.topImage}
        />
        <Text style={styles.topTextFirst}>Tham gia Facebook</Text>
        <Text style={styles.topTextSecond}>Chúng tôi sẽ giúp bạn tạo tài khoản mới sau vài bước dễ dàng</Text>
        <View style={styles.topView}>
          <TouchableOpacity
            onPress={() => navigation.navigate('NameScreen')}
          >
            <View style={styles.topButton}>
              <Text style={styles.topButtonText}>Tiếp</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
      <View>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
        >
          <View>
            <Text style={styles.bottomText}>Bạn đã có tài khoản?</Text>
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
  },
  topImage: {
    height: 180,
    marginTop: 36,
    width: 300,
  },
  topTextFirst: {
    color: colors.grey900,
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 32,
  },
  topTextSecond: {
    color: colors.grey700,
    marginTop: 16,
    textAlign: 'center',
  },
  topView: {
    alignSelf: 'stretch',
    marginTop: 50,
  },
  topButton: {
    alignItems: 'center',
    backgroundColor: colors.blueA400,
    borderRadius: 8,
    padding: 12,
  },
  topButtonText: {
    color: colors.white,
  },
  bottomText: {
    color: colors.blue800,
    fontWeight: 'bold',
  },
});

export default CreateAccountScreen;
