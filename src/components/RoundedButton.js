import React from 'react'
import { Text, View, TouchableOpacity } from 'react-native';

export default function RoundedButton({style, content, backgroundColor,color='white', onPress, borderRadius=10}) {
  return (
    <TouchableOpacity containerStyle={style} onPress={onPress}>
      <View style={{height: 40, backgroundColor: backgroundColor, borderRadius: borderRadius, justifyContent: 'center', paddingHorizontal: 15}}>
        <Text style={{color: color, textAlign: 'center', fontSize: 15}}>
          {content}
        </Text>
      </View>
    </TouchableOpacity>
  );
}