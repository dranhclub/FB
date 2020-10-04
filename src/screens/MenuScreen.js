import React from 'react';
import { Text, View, Button} from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import AuthContext from '../contexts/AuthContext'

export default function MenuScreen() {

  const {signOut} = React.useContext(AuthContext);

  return (
    <View>
      <Button title={'Sign out'} onPress={()=>signOut()}/>
      <Text>Menu</Text>
    </View>
  );
}