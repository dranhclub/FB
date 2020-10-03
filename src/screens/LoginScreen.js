import React from 'react'
import { Button, Text, TextInput, View, StyleSheet, TouchableOpacity, Dimensions} from 'react-native'
import Image from 'react-native-scalable-image';
import {AuthContext} from '../../App'

export default function LoginScreen ({navigation}) {
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');

  const { signIn } = React.useContext(AuthContext);

  return(
    <View style={styles.container}>
      <View style={styles.topWrapper}>
        <Image width={Dimensions.get('window').width} source={require('../imgs/login-img.png')} />
        <TextInput style={styles.textInput} placeholder='Phone number' onChangeText={setUsername}/>
        <TextInput style={styles.textInput} secureTextEntry={true} placeholder='Password' onChangeText={setPassword}/>
        <Button title='Login' onPress={() => signIn({ username, password })}/>
      </View>

      <View style={styles.bottomWrapper}>
        <TouchableOpacity onPress={() => { navigation.navigate('RegisterScreen') }}>
            <Text style={styles.textBlue}>Don't have an account?</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flexDirection: 'column',
    justifyContent: 'space-between',
    flex: 1
  },
  loginImg: {
    
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 3, 
    backgroundColor: 'white'
  },
  textBlue: {
    color: '#3b5998'
  },
  topWrapper: {

  },
  bottomWrapper: {

  }
});
