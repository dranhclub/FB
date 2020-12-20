import React from 'react';
import { StyleSheet, RefreshControl, View, FlatList } from 'react-native';
import { useState } from 'react';
import Conversation from './Conversation';

export default function MessengerScreen() {
  const listConversation = [
    {
      id: 'demoId',
      partner: {
        id: '1',
        username: 'Huy Hoang',
        avatar: 'https://scontent.fhan5-5.fna.fbcdn.net/v/t1.0-9/109851811_1418394418355331_6565440229683774898_n.jpg?_nc_cat=101&ccb=2&_nc_sid=09cbfe&_nc_ohc=A3j60oATlY0AX96X3YC&_nc_ht=scontent.fhan5-5.fna&oh=31c5a65f3f26f2c736012f5298739aa9&oe=5FF96DDB'
      },
      lastMessage: {
        message: 'Hello',
        created: '',
        unread: '1',
      }
    },
    {
      id: 'demoId',
      partner: {
        id: '2',
        username: 'Van Trang',
        avatar: 'https://scontent.fhan5-5.fna.fbcdn.net/v/t1.0-9/29684097_167155184002956_8798470901333980676_n.jpg?_nc_cat=108&ccb=2&_nc_sid=09cbfe&_nc_ohc=dS2dhEoenkcAX8hd0lL&_nc_ht=scontent.fhan5-5.fna&oh=585ee846955a6638e37ec872b4cd237d&oe=5FFA6F34'
      },
      lastMessage: {
        message: 'Et dolore quis excepteur commodo.',
        created: '',
        unread: '0',
      }
    },
    {
      id: 'demoId',
      partner: {
        id: '3',
        username: 'Gia Bao',
        avatar: 'https://scontent.fhan5-2.fna.fbcdn.net/v/t1.0-1/c0.0.100.100a/p100x100/128429101_2824350221176152_6032933550399305983_n.jpg?_nc_cat=102&ccb=2&_nc_sid=dbb9e7&_nc_ohc=9__dhrIDV_AAX-eaVYJ&_nc_ht=scontent.fhan5-2.fna&tp=27&oh=038eee60a6cc57637f5fcfe93c7f6b59&oe=5FF9F9F2'
      },
      lastMessage: {
        message: 'Laborum qui tempor sint nostrud aliqua amet ad laboris Lorem.',
        created: '',
        unread: '0',
      }
    },
    {
      id: 'demoId',
      partner: {
        id: '4',
        username: 'Van Son',
        avatar: 'https://scontent.fhan5-1.fna.fbcdn.net/v/t1.0-1/p100x100/119228817_1359494650887943_4560893903616135487_n.jpg?_nc_cat=109&ccb=2&_nc_sid=dbb9e7&_nc_ohc=mM43Wba9gA4AX-RQ4iJ&_nc_ht=scontent.fhan5-1.fna&tp=6&oh=b5f330a7ab546711a55ae86e8d5d5907&oe=5FF9C232'
      },
      lastMessage: {
        message: 'Sint do cillum nulla id anim reprehenderit adipisicing aute sit nulla tempor.',
        created: '',
        unread: '1',
      }
    },
    {
      id: 'demoId',
      partner: {
        id: '5',
        username: 'Quang Linh',
        avatar: 'https://scontent.fhan5-3.fna.fbcdn.net/v/t1.0-1/p100x100/82911732_2469226896634060_5759876401809326080_o.jpg?_nc_cat=111&ccb=2&_nc_sid=dbb9e7&_nc_ohc=lZYVeEHF2qcAX8FATqd&_nc_ht=scontent.fhan5-3.fna&tp=6&oh=7dedc57565516831751c9956c48f15fe&oe=5FF983C6'
      },
      lastMessage: {
        message: 'Labore tempor officia cillum fugiat enim elit tempor.',
        created: '',
        unread: '0',
      }
    },
    {
      id: 'demoId',
      partner: {
        id: '6',
        username: 'Huu Giang',
        avatar: 'https://scontent.fhan5-5.fna.fbcdn.net/v/t1.0-1/p100x100/22528147_1956454591292922_2997640443589196452_n.jpg?_nc_cat=108&ccb=2&_nc_sid=dbb9e7&_nc_ohc=Pmby_qHOz5QAX_Dfilc&_nc_ht=scontent.fhan5-5.fna&tp=6&oh=7f60ea5d533bb92de031cb5178a2547f&oe=5FF96FB9'
      },
      lastMessage: {
        message: 'Ea ipsum eu proident anim ad sint.',
        created: '',
        unread: '1',
      }
    },
    {
      id: 'demoId',
      partner: {
        id: '7',
        username: 'Nhung Bui',
        avatar: 'https://scontent.fhan5-2.fna.fbcdn.net/v/t1.0-1/p100x100/127274672_1236309290081921_8831281655205457861_o.jpg?_nc_cat=102&ccb=2&_nc_sid=dbb9e7&_nc_ohc=1aQTgKTtqncAX9WnQVu&_nc_ht=scontent.fhan5-2.fna&tp=6&oh=937c545034d43087cda71e0d7aa2fe3f&oe=5FFA8404'
      },
      lastMessage: {
        message: 'Ad eiusmod nisi enim consectetur nisi dolor duis ad adipisicing elit cupidatat voluptate commodo.',
        created: '',
        unread: '0',
      }
    },
    {
      id: 'demoId',
      partner: {
        id: '8',
        username: 'Uyen Thuy',
        avatar: 'https://scontent.fhan5-2.fna.fbcdn.net/v/t1.0-1/p100x100/127227977_1754123958085629_7758658555616206425_n.jpg?_nc_cat=102&ccb=2&_nc_sid=dbb9e7&_nc_ohc=PeUjqHMLE1wAX-O1V7Q&_nc_ht=scontent.fhan5-2.fna&tp=6&oh=1fbff597a26606978199ac6f83752474&oe=5FF6FA85'
      },
      lastMessage: {
        message: 'Occaecat labore duis do consequat cillum in esse commodo anim.',
        created: '',
        unread: '1',
      }
    },
    {
      id: 'demoId',
      partner: {
        id: '9',
        username: 'Huyen Trang',
        avatar: 'https://scontent.fhan5-6.fna.fbcdn.net/v/t1.0-1/p100x100/122335077_186785139674438_635403370402524028_n.jpg?_nc_cat=105&cb=846ca55b-ee17756f&ccb=2&_nc_sid=dbb9e7&_nc_ohc=Hfft9hhf3wsAX_h7VpH&_nc_ht=scontent.fhan5-6.fna&tp=6&oh=c3e2a685a3925e332a2994da691abcde&oe=5FF96D57'
      },
      lastMessage: {
        message: 'Lorem incididunt quis sit voluptate pariatur quis reprehenderit commodo mollit exercitation.',
        created: '',
        unread: '0',
      }
    }

  ]

  const renderItem = ({ item }) => {
    return (
      <Conversation item={item} />
    );
  };

  const [isRefresh, setIsRefresh] = useState(false);

  const onRefresh = () => {
    setIsRefresh(true);
    setTimeout(() => setIsRefresh(false), 3000);
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={listConversation}
        renderItem={renderItem}
        keyExtractor={item => item.partner.id}
        refreshControl={
          <RefreshControl
            refreshing={isRefresh}
            onRefresh={() => onRefresh()}
          />
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
});