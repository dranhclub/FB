import React from 'react';
import { Text, TouchableOpacity, View, TextInput, Image, FlatList, Dimensions } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { useRef, useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';

const { width } = Dimensions.get('window');

export default function ChatScreen({ route }) {

  const tokenMain = '1';


  const Item = ({ item }) => item.conversation.sender.id !== tokenMain ? (
    <View style={{ flexDirection: 'row', paddingLeft: 8, paddingRight: width / 4, alignItems: 'center', marginVertical: 5 }}>
      <Image source={{ uri: item.conversation.sender.avatar }} style={{ width: width / 12, height: width / 12, borderRadius: width / 12, alignSelf: 'flex-end' }} />
      <TouchableOpacity style={{ paddingVertical: 5, paddingHorizontal: 15, marginLeft: 5, borderWidth: 0, borderRadius: 25, backgroundColor: '#EEEEEE' }}>
        <Text style={{ fontSize: 18, color: '#000000' }}>{item.conversation.message}</Text>
      </TouchableOpacity>
    </View>
  ) : (
      <View style={{ flexDirection: 'row', paddingRight: 8, paddingLeft: width / 4, alignItems: 'center', marginVertical: 5, justifyContent: 'flex-end' }}>
        <TouchableOpacity style={{ paddingVertical: 5, paddingHorizontal: 15, marginRight: 15, borderWidth: 0, borderRadius: 25, backgroundColor: '#0091EA' }}>
          <Text style={{ fontSize: 18, color: '#FFFFFF' }}>{item.conversation.message}</Text>
        </TouchableOpacity>
      </View>
    );

  // const dispatch = useDispatch();  
  const navigation = useNavigation();
  const { name, avatar } = route.params;
  
  const conversationMess = [
    {
      conversation: {
        message: 'hello',
        message_id: '6',
        unread: '',
        sender: {
          id: '0',
          username: 'Huy Hoang',
          avatar: 'https://scontent.fhan5-2.fna.fbcdn.net/v/t1.0-1/p100x100/127227977_1754123958085629_7758658555616206425_n.jpg?_nc_cat=102&ccb=2&_nc_sid=dbb9e7&_nc_ohc=PeUjqHMLE1wAX-O1V7Q&_nc_ht=scontent.fhan5-2.fna&tp=6&oh=1fbff597a26606978199ac6f83752474&oe=5FF6FA85',
        }
      },
      is_blocked: '1',
    },
    {
      conversation: {
        message: 'hello',
        message_id: '6',
        unread: '',
        sender: {
          id: '1',
          username: 'Huy Hoang',
          avatar: 'https://scontent.fhan5-2.fna.fbcdn.net/v/t1.0-1/p100x100/127227977_1754123958085629_7758658555616206425_n.jpg?_nc_cat=102&ccb=2&_nc_sid=dbb9e7&_nc_ohc=PeUjqHMLE1wAX-O1V7Q&_nc_ht=scontent.fhan5-2.fna&tp=6&oh=1fbff597a26606978199ac6f83752474&oe=5FF6FA85',
        }
      },
      is_blocked: '1',
    },
    {
      conversation: {
        message: 'hello',
        message_id: '8',
        unread: '',
        sender: {
          id: '0',
          username: 'Huy Hoang',
          avatar: 'https://scontent.fhan5-2.fna.fbcdn.net/v/t1.0-1/p100x100/127227977_1754123958085629_7758658555616206425_n.jpg?_nc_cat=102&ccb=2&_nc_sid=dbb9e7&_nc_ohc=PeUjqHMLE1wAX-O1V7Q&_nc_ht=scontent.fhan5-2.fna&tp=6&oh=1fbff597a26606978199ac6f83752474&oe=5FF6FA85',
        }
      },
      is_blocked: '1',
    },
    {
      conversation: {
        message: 'hello',
        message_id: '9',
        unread: '',
        sender: {
          id: '1',
          username: 'Huy Hoang',
          avatar: 'https://scontent.fhan5-2.fna.fbcdn.net/v/t1.0-1/p100x100/127227977_1754123958085629_7758658555616206425_n.jpg?_nc_cat=102&ccb=2&_nc_sid=dbb9e7&_nc_ohc=PeUjqHMLE1wAX-O1V7Q&_nc_ht=scontent.fhan5-2.fna&tp=6&oh=1fbff597a26606978199ac6f83752474&oe=5FF6FA85',
        }
      },
      is_blocked: '1',
    },
    {
      conversation: {
        message: 'hello',
        message_id: '10',
        unread: '',
        sender: {
          id: '0',
          username: 'Huy Hoang',
          avatar: 'https://scontent.fhan5-2.fna.fbcdn.net/v/t1.0-1/p100x100/127227977_1754123958085629_7758658555616206425_n.jpg?_nc_cat=102&ccb=2&_nc_sid=dbb9e7&_nc_ohc=PeUjqHMLE1wAX-O1V7Q&_nc_ht=scontent.fhan5-2.fna&tp=6&oh=1fbff597a26606978199ac6f83752474&oe=5FF6FA85',
        }
      },
      is_blocked: '1',
    },
    {
      conversation: {
        message: 'hello',
        message_id: '11',
        unread: '',
        sender: {
          id: '0',
          username: 'Huy Hoang',
          avatar: 'https://scontent.fhan5-2.fna.fbcdn.net/v/t1.0-1/p100x100/127227977_1754123958085629_7758658555616206425_n.jpg?_nc_cat=102&ccb=2&_nc_sid=dbb9e7&_nc_ohc=PeUjqHMLE1wAX-O1V7Q&_nc_ht=scontent.fhan5-2.fna&tp=6&oh=1fbff597a26606978199ac6f83752474&oe=5FF6FA85',
        }
      },
      is_blocked: '1',
    },
    {
      conversation: {
        message: 'hello',
        message_id: '12',
        unread: '',
        sender: {
          id: '1',
          username: 'Huy Hoang',
          avatar: 'https://scontent.fhan5-2.fna.fbcdn.net/v/t1.0-1/p100x100/127227977_1754123958085629_7758658555616206425_n.jpg?_nc_cat=102&ccb=2&_nc_sid=dbb9e7&_nc_ohc=PeUjqHMLE1wAX-O1V7Q&_nc_ht=scontent.fhan5-2.fna&tp=6&oh=1fbff597a26606978199ac6f83752474&oe=5FF6FA85',
        }
      },
      is_blocked: '1',
    },
    {
      conversation: {
        message: 'hello',
        message_id: '13',
        unread: '',
        sender: {
          id: '0',
          username: 'Huy Hoang',
          avatar: 'https://scontent.fhan5-2.fna.fbcdn.net/v/t1.0-1/p100x100/127227977_1754123958085629_7758658555616206425_n.jpg?_nc_cat=102&ccb=2&_nc_sid=dbb9e7&_nc_ohc=PeUjqHMLE1wAX-O1V7Q&_nc_ht=scontent.fhan5-2.fna&tp=6&oh=1fbff597a26606978199ac6f83752474&oe=5FF6FA85',
        }
      },
      is_blocked: '1',
    },
    {
      conversation: {
        message: 'hello',
        message_id: '14',
        unread: '',
        sender: {
          id: '1',
          username: 'Huy Hoang',
          avatar: 'https://scontent.fhan5-2.fna.fbcdn.net/v/t1.0-1/p100x100/127227977_1754123958085629_7758658555616206425_n.jpg?_nc_cat=102&ccb=2&_nc_sid=dbb9e7&_nc_ohc=PeUjqHMLE1wAX-O1V7Q&_nc_ht=scontent.fhan5-2.fna&tp=6&oh=1fbff597a26606978199ac6f83752474&oe=5FF6FA85',
        }
      },
      is_blocked: '1',
    },
    {
      conversation: {
        message: 'hello',
        message_id: '15',
        unread: '',
        sender: {
          id: '0',
          username: 'Huy Hoang',
          avatar: 'https://scontent.fhan5-2.fna.fbcdn.net/v/t1.0-1/p100x100/127227977_1754123958085629_7758658555616206425_n.jpg?_nc_cat=102&ccb=2&_nc_sid=dbb9e7&_nc_ohc=PeUjqHMLE1wAX-O1V7Q&_nc_ht=scontent.fhan5-2.fna&tp=6&oh=1fbff597a26606978199ac6f83752474&oe=5FF6FA85',
        }
      },
      is_blocked: '1',
    },
    {
      conversation: {
        message: 'hello',
        message_id: '16',
        unread: '',
        sender: {
          id: '0',
          username: 'Huy Hoang',
          avatar: 'https://scontent.fhan5-2.fna.fbcdn.net/v/t1.0-1/p100x100/127227977_1754123958085629_7758658555616206425_n.jpg?_nc_cat=102&ccb=2&_nc_sid=dbb9e7&_nc_ohc=PeUjqHMLE1wAX-O1V7Q&_nc_ht=scontent.fhan5-2.fna&tp=6&oh=1fbff597a26606978199ac6f83752474&oe=5FF6FA85',
        }
      },
      is_blocked: '1',
    },
    {
      conversation: {
        message: 'hello',
        message_id: '17',
        unread: '',
        sender: {
          id: '1',
          username: 'Huy Hoang',
          avatar: 'https://scontent.fhan5-2.fna.fbcdn.net/v/t1.0-1/p100x100/127227977_1754123958085629_7758658555616206425_n.jpg?_nc_cat=102&ccb=2&_nc_sid=dbb9e7&_nc_ohc=PeUjqHMLE1wAX-O1V7Q&_nc_ht=scontent.fhan5-2.fna&tp=6&oh=1fbff597a26606978199ac6f83752474&oe=5FF6FA85',
        }
      },
      is_blocked: '1',
    },
    {
      conversation: {
        message: 'hello',
        message_id: '18',
        unread: '',
        sender: {
          id: '0',
          username: 'Huy Hoang',
          avatar: 'https://scontent.fhan5-2.fna.fbcdn.net/v/t1.0-1/p100x100/127227977_1754123958085629_7758658555616206425_n.jpg?_nc_cat=102&ccb=2&_nc_sid=dbb9e7&_nc_ohc=PeUjqHMLE1wAX-O1V7Q&_nc_ht=scontent.fhan5-2.fna&tp=6&oh=1fbff597a26606978199ac6f83752474&oe=5FF6FA85',
        }
      },
      is_blocked: '1',
    },
    {
      conversation: {
        message: 'hello',
        message_id: '19',
        unread: '',
        sender: {
          id: '0',
          username: 'Huy Hoang',
          avatar: 'https://scontent.fhan5-2.fna.fbcdn.net/v/t1.0-1/p100x100/127227977_1754123958085629_7758658555616206425_n.jpg?_nc_cat=102&ccb=2&_nc_sid=dbb9e7&_nc_ohc=PeUjqHMLE1wAX-O1V7Q&_nc_ht=scontent.fhan5-2.fna&tp=6&oh=1fbff597a26606978199ac6f83752474&oe=5FF6FA85',
        }
      },
      is_blocked: '1',
    },
    {
      conversation: {
        message: 'hellooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooo',
        message_id: '20',
        unread: '',
        sender: {
          id: '0',
          username: 'Huy Hoang',
          avatar: 'https://scontent.fhan5-2.fna.fbcdn.net/v/t1.0-1/p100x100/127227977_1754123958085629_7758658555616206425_n.jpg?_nc_cat=102&ccb=2&_nc_sid=dbb9e7&_nc_ohc=PeUjqHMLE1wAX-O1V7Q&_nc_ht=scontent.fhan5-2.fna&tp=6&oh=1fbff597a26606978199ac6f83752474&oe=5FF6FA85',
        }
      },
      is_blocked: '1',
    },
    {
      conversation: {
        message: 'hellooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooo',
        message_id: '21',
        unread: '',
        sender: {
          id: '1',
          username: 'Huy Hoang',
          avatar: 'https://scontent.fhan5-2.fna.fbcdn.net/v/t1.0-1/p100x100/127227977_1754123958085629_7758658555616206425_n.jpg?_nc_cat=102&ccb=2&_nc_sid=dbb9e7&_nc_ohc=PeUjqHMLE1wAX-O1V7Q&_nc_ht=scontent.fhan5-2.fna&tp=6&oh=1fbff597a26606978199ac6f83752474&oe=5FF6FA85',
        }
      },
      is_blocked: '1',
    },
    {
      conversation: {
        message: 'Aloo anh à, em nhớ a quá.',
        message_id: '1',
        unread: '',
        sender: {
          id: '0',
          username: 'Huy Hoang',
          avatar: 'https://scontent.fhan5-2.fna.fbcdn.net/v/t1.0-1/p100x100/127227977_1754123958085629_7758658555616206425_n.jpg?_nc_cat=102&ccb=2&_nc_sid=dbb9e7&_nc_ohc=PeUjqHMLE1wAX-O1V7Q&_nc_ht=scontent.fhan5-2.fna&tp=6&oh=1fbff597a26606978199ac6f83752474&oe=5FF6FA85',
        }
      },
      is_blocked: '1',
    },
    {
      conversation: {
        message: 'Uhm a cũng nhớ e lắm.',
        message_id: '2',
        unread: '',
        sender: {
          id: '1',
          username: 'Huy Hoang',
          avatar: 'https://scontent.fhan5-2.fna.fbcdn.net/v/t1.0-1/p100x100/127227977_1754123958085629_7758658555616206425_n.jpg?_nc_cat=102&ccb=2&_nc_sid=dbb9e7&_nc_ohc=PeUjqHMLE1wAX-O1V7Q&_nc_ht=scontent.fhan5-2.fna&tp=6&oh=1fbff597a26606978199ac6f83752474&oe=5FF6FA85',
        }
      },
      is_blocked: '1',
    },
    {
      conversation: {
        message: 'Vợ anh đã ngủ chưa?',
        message_id: '3',
        unread: '',
        sender: {
          id: '0',
          username: 'Huy Hoang',
          avatar: 'https://scontent.fhan5-2.fna.fbcdn.net/v/t1.0-1/p100x100/127227977_1754123958085629_7758658555616206425_n.jpg?_nc_cat=102&ccb=2&_nc_sid=dbb9e7&_nc_ohc=PeUjqHMLE1wAX-O1V7Q&_nc_ht=scontent.fhan5-2.fna&tp=6&oh=1fbff597a26606978199ac6f83752474&oe=5FF6FA85',
        }
      },
      is_blocked: '1',
    },
    {
      conversation: {
        message: 'Vợ anh ngủ rồi, mình ra ngoài gặp nhau đi em.',
        message_id: '4',
        unread: '',
        sender: {
          id: '0',
          username: 'Huy Hoang',
          avatar: 'https://scontent.fhan5-2.fna.fbcdn.net/v/t1.0-1/p100x100/127227977_1754123958085629_7758658555616206425_n.jpg?_nc_cat=102&ccb=2&_nc_sid=dbb9e7&_nc_ohc=PeUjqHMLE1wAX-O1V7Q&_nc_ht=scontent.fhan5-2.fna&tp=6&oh=1fbff597a26606978199ac6f83752474&oe=5FF6FA85',
        }
      },
      is_blocked: '1',
    },
    {
      conversation: {
        message: 'Ok anh, vợ em cũng ngủ rồi.',
        message_id: '5',
        unread: '',
        sender: {
          id: '1',
          username: 'Huy Hoang',
          avatar: 'https://scontent.fhan5-2.fna.fbcdn.net/v/t1.0-1/p100x100/127227977_1754123958085629_7758658555616206425_n.jpg?_nc_cat=102&ccb=2&_nc_sid=dbb9e7&_nc_ohc=PeUjqHMLE1wAX-O1V7Q&_nc_ht=scontent.fhan5-2.fna&tp=6&oh=1fbff597a26606978199ac6f83752474&oe=5FF6FA85',
        }
      },
      is_blocked: '1',
    },
    {
      conversation: {
        message: '😉😉😉😉😉',
        message_id: '4',
        unread: '',
        sender: {
          id: '0',
          username: 'Huy Hoang',
          avatar: 'https://scontent.fhan5-2.fna.fbcdn.net/v/t1.0-1/p100x100/127227977_1754123958085629_7758658555616206425_n.jpg?_nc_cat=102&ccb=2&_nc_sid=dbb9e7&_nc_ohc=PeUjqHMLE1wAX-O1V7Q&_nc_ht=scontent.fhan5-2.fna&tp=6&oh=1fbff597a26606978199ac6f83752474&oe=5FF6FA85',
        }
      },
      is_blocked: '1',
    },
  ]

  const flatList = useRef(null);

  useEffect(() => {
    navigation.setOptions({
      headerTitle: () => (
        <View style={{ flexDirection: 'row', flex: 1, alignItems: 'center', justifyContent: 'space-between' }}>
          <View style={{ flexDirection: 'row', flex: 2, alignItems: 'center' }}>
            <Image source={{ uri: avatar }} style={{ width: width / 11, height: width / 11, borderRadius: width / 11 }} />
            <View style={{ paddingLeft: 10 }}>
              <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{name}</Text>
              <Text>Online</Text>
            </View>
          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', flex: 1 }}>
            <TouchableOpacity>
              {/* <Ionicons name={'phone-portrait'} size={27} color={'#0091EA'} /> */}
              <FontAwesome5 name={'phone-alt'} color={'#0091EA'} solid size={27}/>
            </TouchableOpacity>
            <TouchableOpacity >
              <Ionicons name={'videocam'} size={27} color={'#0091EA'} />
            </TouchableOpacity>
            <TouchableOpacity >
              <Ionicons name={'information-circle'} size={27} color={'#0091EA'} />
            </TouchableOpacity>
          </View>
        </View>
      ),
      headerTintColor: '#0091EA'
    });

    // dispatch(getConversationRequest({
    //   token: tokenMain,
    //   partner_id: partner_id,
    //   index: '0',
    //   count: '20'
    // }));
  }, []);

  const [selectedId] = useState(null);
  const renderItem = ({ item }) => {
    return (
      <Item
        item={item}
      />
    );
  };

  return (
    <View style={{ backgroundColor: '#fff', flex: 1 }}>
      <FlatList
        ref={flatList}
        data={conversationMess}
        renderItem={renderItem}
        onContentSizeChange={() => flatList.current.scrollToEnd()}
        keyExtractor={(item) => item.conversation.sender.message_id}
        extraData={selectedId}
        ListFooterComponent={() => (
          <View style={{ height: 50 }}></View>
        )}
        initialNumToRender={5}
      />
      <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1, position: 'absolute', zIndex: 2, backgroundColor: '#fff', bottom: 0, paddingTop: 5, }}>
        <View style={{ flexDirection: 'row', flex: 0.8, justifyContent: 'space-around' }}>
          <TouchableOpacity>
            <Ionicons name={'ios-grid'} size={24} color={'#0091EA'} />
          </TouchableOpacity>
          <TouchableOpacity>
            <Ionicons name={'camera'} size={26} color={'#0091EA'} />
          </TouchableOpacity>
          <TouchableOpacity>
            <Ionicons name={'image'} size={26} color={'#0091EA'} />
          </TouchableOpacity>
          <TouchableOpacity>
            <Ionicons name={'mic'} size={26} color={'#0091EA'} />
          </TouchableOpacity>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', flex: 0.7, borderWidth: 0, backgroundColor: '#EEEEEE', height: 40, borderRadius: 40, paddingHorizontal: 5, marginBottom: 5 }}>
          <TextInput style={{ flex: 1 }}
            placeholder='Aa'
          />
          <TouchableOpacity>
            <Ionicons name={'ios-happy'} size={26} color={'#0091EA'} />
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={{ flex: 0.3, justifyContent: 'center', alignItems: 'center' }}>
          {/* <Ionicons name={'thumbs-up'} size={26} color={'#0091EA'} /> */}
          <FontAwesome5 name={'thumbs-up'} color={'#0091EA'} solid size={27}/>
        </TouchableOpacity>
      </View>
    </View>
  );
}

