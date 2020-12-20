import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Image, ScrollView, Dimensions } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useRef } from 'react';
import { useNavigation } from '@react-navigation/native';
import RBSheet from "react-native-raw-bottom-sheet";

const { width } = Dimensions.get('window');

export default function Conversation({ item }) {

  const refRBSheet = useRef();
  const navigation = useNavigation();

  return (
    <View>
      <TouchableOpacity onLongPress={() => refRBSheet.current.open()}
        onPress={() => navigation.navigate('ChatScreen', {
          avatar: item.partner.avatar,
          name: item.partner.username,
          partner_id: item.partner.id,
        })}>
        <View style={styles.container}>
          <View style={styles.bigAvatar}>
            <Image
              source={{ uri: item.partner.avatar }}
              style={styles.avatar}
            />
          </View>
          <View style={styles.info}>
            <Text style={styles.name}>{item.partner.username}</Text>
            <Text numberOfLines={1} style={{ fontSize: 15, color: '#000000', fontWeight: item.lastMessage.unread === '1' ? 'bold' : 'normal' }}>{item.lastMessage.message}</Text>
          </View>
          {/* <View style={styles.bigSeen}>
                        <Image 
                            source={{uri: item.partner.avatar}}
                            style={styles.avatarSeen}
                        />
                    </View> */}
        </View>
      </TouchableOpacity>
      <RBSheet
        height={400}
        ref={refRBSheet}
        closeOnDragDown={true}
        closeOnPressMask={true}
        customStyles={{
          wrapper: {
            backgroundColor: "rgba(52, 52, 52, 0.8)"
          },
          draggableIcon: {
            backgroundColor: "#000"
          }
        }}
      >
        <ScrollView style={styles.containerContent}>
          <View style={styles.midContent}>
            <TouchableOpacity style={styles.buttonContent}>
              <Ionicons name={'ios-archive'} size={25} />
              <Text style={styles.textButton}>Lưu trữ</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.midContent}>
            <TouchableOpacity style={styles.buttonContent}>
              <Ionicons name={'trash'} size={25} />
              <Text style={styles.textButton}>Xoá</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.midContent}>
            <TouchableOpacity style={styles.buttonContent}>
              <Ionicons name={'notifications-off'} size={25} />
              <Text style={styles.textButton}>Tắt thông báo</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.midContent}>
            <TouchableOpacity style={styles.buttonContent}>
              <Ionicons name={'chatbubbles'} size={25} />
              <Text style={styles.textButton}>Mở bong bóng chat</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.midContent}>
            <TouchableOpacity style={styles.buttonContent}>
              <Ionicons name={'mail'} size={25} />
              <Text style={styles.textButton}>Đánh dấu là đã đọc</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.midContent}>
            <TouchableOpacity style={styles.buttonContent}>
              <Ionicons name={'ios-cloud-offline'} size={25} />
              <Text style={styles.textButton}>Bỏ qua tin nhắn</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.midContent}>
            <TouchableOpacity style={styles.buttonContent}>
              <Ionicons name={'ios-remove-circle'} size={25} />
              <Text style={styles.textButton}>Chặn</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </RBSheet>
    </View>
  );
};

const styles = StyleSheet.create({

  container: {
    flexDirection: 'row',
    paddingLeft: 10,
    paddingVertical: 5,
    marginTop: 10,
    // marginRight: 10,
  },
  bigAvatar: {
    flex: 2
  },
  avatar: {
    width: width * 15 / 100,
    height: width * 15 / 100,
    borderRadius: width * 10 / 100,
  },
  info: {
    flex: 8,
    flexDirection: 'column',
    paddingRight: 10,
    justifyContent: 'center'
  },
  name: {
    fontWeight: 'bold',
    color: 'black',
    fontSize: 17,
    paddingBottom: 3
  },
  bigSeen: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 2,
  },
  avatarSeen: {
    width: width / 20,
    height: width / 20,
    borderRadius: width / 20,
  },
  item: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 100,
  },
  Modal: {
    backgroundColor: '#fff',
    marginTop: width * 2 / 3,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  containerContent: {

  },
  topContent: {
    alignItems: 'center',
    paddingTop: 5,
  },
  midContent: {
    justifyContent: 'center',
  },
  buttonContent: {
    flexDirection: 'row',
    paddingHorizontal: 30,
    alignItems: 'center',
    paddingVertical: 11,
  },
  textButton: {
    fontSize: 16,
    marginLeft: 20,
  }
});