import React from 'react'
import { ScrollView, TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import { Text, StyleSheet, Image, View } from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

function Comment({avatar, name, text, time}) {
  const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      marginBottom: 15,
      paddingRight: 60,
    },
    avatar: {
      width: 50,
      height: 50,
      borderRadius: 25
    },
    content: {
      backgroundColor: '#eee', 
      borderRadius: 20, 
      paddingHorizontal: 10, 
      paddingVertical: 8
    }
  });
  
  return(
    <View style={styles.container}>
      <Image source={avatar} style={styles.avatar}/>
      <View style={{marginLeft: 10}}>
        <View style={styles.content}>
          <Text style={{fontWeight: 'bold', fontSize: 14}}>{name}</Text>
          <Text style={{flexWrap: 'wrap'}}>{text}</Text>
        </View>
        <View style={{flexDirection: 'row'}}>
          <Text style={{color: '#757575'}}>{time}</Text>
          <TouchableOpacity>
            <Text style={{fontWeight: 'bold', marginLeft: 20}}>Thích</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const exampleComments = [
  {
    name:'Nguyễn Tuấn Anh',
    avatar: {uri: 'https://picsum.photos/seed/picsum1/50/50'},
    text: '😂😂😂',
    time: '2 phút trước'
  },
  {
    name:'Nguyễn Ngọc Đức Thắng',
    avatar: {uri: 'https://picsum.photos/seed/picsum2/50/50'},
    text: 'Voluptate eiusmod sunt magna quis ipsum occaecat ea.',
    time: '2 phút trước'
  },
  {
    name:'Huyền Nguyễn',
    avatar: {uri: 'https://picsum.photos/seed/picsum3/50/50'},
    text: 'Ad sunt laboris consectetur reprehenderit aliquip ut consectetur ut cupidatat in proident aute dolor.',
    time: '4 phút trước'
  },
  {
    name:'Trang Nguyen',
    avatar: {uri: 'https://picsum.photos/seed/picsum4/50/50'},
    text: 'Commodo esse ullamco laborum aliquip amet.',
    time: '5 phút trước'
  },
  {
    name:'Nguyễn Tuấn Anh',
    avatar: {uri: 'https://picsum.photos/seed/picsum1/50/50'},
    text: '😂😂😂',
    time: '2 phút trước'
  },
  {
    name:'Nguyễn Ngọc Đức Thắng',
    avatar: {uri: 'https://picsum.photos/seed/picsum2/50/50'},
    text: 'Voluptate eiusmod sunt magna quis ipsum occaecat ea.',
    time: '2 phút trước'
  },
  {
    name:'Huyền Nguyễn',
    avatar: {uri: 'https://picsum.photos/seed/picsum3/50/50'},
    text: 'Ad sunt laboris consectetur reprehenderit aliquip ut consectetur ut cupidatat in proident aute dolor.',
    time: '4 phút trước'
  },
  {
    name:'Trang Nguyen',
    avatar: {uri: 'https://picsum.photos/seed/picsum4/50/50'},
    text: 'Commodo esse ullamco laborum aliquip amet.',
    time: '5 phút trước'
  },
]

export default function CommentScreen() {
  return (
    <View style={{flex: 1}}>
      {/* Comments list */}
      <ScrollView style={styles.container}>
        {exampleComments.map((item, index)=>{
          return(
            <Comment 
              key={index}
              name={item.name} 
              avatar={item.avatar} 
              text={item.text} 
              time={item.time}/>
          );
        })}
      </ScrollView>

      {/* Comment input text */}
      <View style={styles.commentInputTextWrapper}>
        <View style={styles.commentInputText}>
          <TextInput placeholder='Bình luận' multiline style={{flex: 1, paddingHorizontal: 10}}/>
          <TouchableOpacity>
            <FontAwesome5 name='paper-plane' size={20} color={'#2979FF'} solid style={{paddingHorizontal: 20}}/>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: 'white'
  },
  commentInputTextWrapper: {
    backgroundColor: 'white', 
    borderTopColor: '#ccc', 
    borderTopWidth: 1, 
    padding: 5
  },
  commentInputText: {
    backgroundColor: '#eee',
    borderRadius: 25,
    flexDirection: 'row',
    alignItems: 'center'
  }
});