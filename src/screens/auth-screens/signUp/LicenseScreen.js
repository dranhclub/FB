/* eslint-disable prettier/prettier */
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import * as colors from './../../../constants/colors';

function LicenseScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <View>
        <Text>License</Text>
      </View>
      <View>
        <TouchableOpacity
          onPress={() => navigation.navigate('CreateAccountLoadingScreen')}
        >
          <View>
            <Text>Đăng ký</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    flex: 1,
  },
});

export default LicenseScreen;
