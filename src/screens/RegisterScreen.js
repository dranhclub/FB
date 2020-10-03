import { useBackButton } from '@react-navigation/native';
import React, { useEffect, useState } from 'react'
import { Button, StyleSheet, Text, TextInput, View, Dimensions, KeyboardAvoidingView, Keyboard} from 'react-native'
import { TouchableHighlight, TouchableOpacity, TouchableWithoutFeedback } from 'react-native-gesture-handler';
import Image from 'react-native-scalable-image'

export default function RegisterScreen() {
  const [isShowImage, setIsShowImage] = useState(true);

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
    setIsShowImage(false);
  };

  const _keyboardDidHide = () => {
    setIsShowImage(true);
  };

  return(
    <View style={styles.container}>
      {
          isShowImage ? (
            <Image style={styles.registerImg} width={Dimensions.get('window').width} source={require('../imgs/register-img.png')} />
          ) : <></>
      }
      <View>
        <TextInput style={styles.textInput} placeholder='Phone number' />
        <TextInput style={styles.textInput} secureTextEntry={true} placeholder='Password'/>
        <Button title='Register'/>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 10,
    flexDirection: 'column',
    // justifyContent: 'space-between',
    flex: 1
  },
  registerImg: {
    marginLeft: 'auto',
    marginRight: 'auto'
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 3, 
    backgroundColor: 'white'
  },
});