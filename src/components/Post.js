/**
 * Component: Bài viết
 * Bài viết sẽ gồm hình ảnh hoặc video
 * Nếu có ảnh thì không có video và ngược lại
 */
import React, { useState, useRef, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Text, View, Button, StyleSheet, Image, TouchableOpacity } from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import ImagesGridView from './ImagesGridView';
import VideoPlayer from 'react-native-video-player';
import RBSheet from "react-native-raw-bottom-sheet";


export default function Post({ displayName, avatar, time, text, photos, video, numLikes, numComments}) {
  const navigation = useNavigation();
  const [liked, setLiked] = useState(false)

  const refRBSheet = useRef();

  // Hiển thị video hoặc hình ảnh
  function Media() {
    if (photos && photos.length > 0) {
      return (<ImagesGridView images={photos} />)
    } else if (video) {
      return <VideoPlayer video={video}/>
    } else {
      return null;
    }
  }

  /* 
    Hiển thị text mô tả
    Nếu dài quá thì hiển thị nút "xem thêm"
  */
  function Description({text}) {
    const [expanded, setExapanded] = useState(false);
    const MAX_LENGTH = 300;

    useEffect(
      () => {
        if (text.length < MAX_LENGTH) setExapanded(true);
      }, []
    );

    if (expanded) {
      return(
        <Text style={{ paddingVertical: 10 }}>
          {text}
        </Text>
      );
    } else {
      return(
        <View style={{ paddingVertical: 10 }}>
          <Text >
            {text.slice(0, MAX_LENGTH) + "..."}
          </Text>
          <TouchableOpacity onPress={()=>setExapanded(true)}><Text style={{color: '#1565C0'}}>Xem thêm</Text></TouchableOpacity>
        </View>
      );
    }
  }

  const NumberOfLikesAndComments = () => {
    return(
      <View style={styles.responses}>
        {
          numLikes > 0 ? 
          <View style={styles.likes}>
            <View style={{ backgroundColor: '#1E88E5', width: 16, height: 16, borderRadius: 25, alignItems: 'center', justifyContent: 'center' }}>
              <FontAwesome5 name={'thumbs-up'} color={'white'} solid size={8}/>
            </View>
            <Text style={{color: '#616161', marginLeft: 5, fontSize: 12}}>{numLikes}</Text>
          </View>
          : <></>
        }
        {
          numComments > 0 ? 
          <Text style={{ color: '#616161', fontSize: 12 }}>{numComments} bình luận</Text> : 
          <></>
        }
      </View>
    );
  }

  return (
    <View style={styles.post}>
      {/* Header of post: display name, avatar, ... */}
      <View style={styles.header}>
        <Image style={styles.avatar} source={avatar} />
        <View style={{ marginLeft: 10, flex: 1 }}>
          <Text style={styles.displayName}>{displayName}</Text>
          <Text style={styles.info}>
            {time}  <FontAwesome5 name={'globe-americas'} />
          </Text>
        </View>
        <View>
          <TouchableOpacity onPress={()=>refRBSheet.current.open()}>
            <FontAwesome5 name={'ellipsis-h'} size={20} />
          </TouchableOpacity>
        </View>
      </View>

      {/* Post's body */}
      <View style={styles.body}>
        <Description text={text}/>
        <Media />
      </View>

      {/* Number of likes and comments */}
      <NumberOfLikesAndComments />

      {/* Post's action: Like, comment, share */}
      <View style={styles.actions}>
        <View style={styles.action}>
          <TouchableOpacity onPress={() => {
            setLiked(!liked);
          }}>
            {
              liked ? (
                <Text style={{ color: '#448AFF' }}>
                  <FontAwesome5 name={'thumbs-up'} size={20} color={'#448AFF'} solid={true} />  Thích
                </Text>
              ) : (
                  <Text style={{color: 'black'}}>
                    <FontAwesome5 name={'thumbs-up'} size={20} color={'black'}/>  Thích
                  </Text>
                )
            }
          </TouchableOpacity>
        </View>
        <View style={styles.action}>
          <TouchableOpacity onPress={()=>navigation.navigate('CommentScreen')} >
            <Text>
              <FontAwesome5 name={'comment'} size={20} /> Bình luận
              </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.action}>
          <TouchableOpacity>
            <Text>
              <FontAwesome5 name={'share'} size={20} /> Chia sẻ
              </Text>
          </TouchableOpacity>
        </View>
      </View>
      
      {/* Report post */}
      <RBSheet
        height={300}
        ref={refRBSheet}
        closeOnDragDown={true}
        closeOnPressMask={true}
        customStyles={{
          wrapper: {
            backgroundColor: "transparent"
          },
          draggableIcon: {
            backgroundColor: "#000"
          }
        }}
      >
        <TouchableOpacity onPress={()=>alert("saved")}>
          <View style={{padding: 20, flexDirection: 'row', alignItems: 'center'}}>
            <View style={{backgroundColor: '#ECEFF1', width: 40, height: 40, justifyContent: 'center', alignItems: 'center', borderRadius: 50}}>
              <FontAwesome5 size={22} name='bookmark'/>
            </View>
            <Text style={{fontSize: 16, marginLeft: 10}}>Lưu bài viết</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>navigation.navigate('ReportScreen')}>
          <View style={{padding: 20, flexDirection: 'row', alignItems: 'center'}}>
            <View style={{backgroundColor: '#ECEFF1', width: 40, height: 40, justifyContent: 'center', alignItems: 'center', borderRadius: 50}}>
              <FontAwesome5 size={22} name='exclamation'/>
            </View>
            <Text style={{fontSize: 16, marginLeft: 10}}>Báo cáo bài viết</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>alert("copied")}>
          <View style={{padding: 20, flexDirection: 'row', alignItems: 'center'}}>
            <View style={{backgroundColor: '#ECEFF1', width: 40, height: 40, justifyContent: 'center', alignItems: 'center', borderRadius: 50}}>
              <FontAwesome5 size={22} name='link'/>
            </View>
            <Text style={{fontSize: 16, marginLeft: 10}}>Sao chép liên kết</Text>
          </View>
        </TouchableOpacity>
      </RBSheet>
    </View>
  );
}

const styles = StyleSheet.create({
  post: {
    backgroundColor: 'white',
    marginBottom: 10,
    padding: 10
  },
  header: {
    flexDirection: 'row',
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  displayName: {
    fontWeight: 'bold',
    fontSize: 15
  },
  info: {
    flexDirection: 'row',
    color: '#ccc',
  },
  body: {},
  responses: {
    paddingVertical: 10,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  likes: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actions: {
    borderTopWidth: 1,
    borderTopColor: '#eee',
    paddingTop: 5,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  action: {
    paddingVertical: 5,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
  }
});