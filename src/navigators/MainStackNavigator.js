import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';

import TabNavigator from './TabNavigator';
import CreatePostScreen from '../screens/posts-screens/CreatePostScreen';
import ChangePasswordScreen from '../screens/auth-screens/ChangePasswordScreen';
import ListFriendScreen from '../screens/friend-screens/ListFriendScreen';
import CommentScreen from '../screens/posts-screens/CommentScreen';
import ReportScreen from '../screens/posts-screens/ReportScreen';
import SearchScreen from '../screens/SearchScreen';
import EditProfileScreen from '../screens/profile-screens/EditProfileScreen';
import FriendScreen from '../screens/friend-screens/FriendScreen';
import ListFriendRequestsScreen from '../screens/friend-screens/ListFriendRequestsScreen';
import ListFriendSuggestionsScreen from '../screens/friend-screens/ListFriendSuggestionsScreen';
import EmotionScreen from '../screens/posts-screens/EmotionScreen';

const Stack = createStackNavigator();

function MainStackNavigator() {
  return (
    <Stack.Navigator initialRouteName="TopTabNavigator">
      <Stack.Screen name="Home" component={TabNavigator} options={{ headerShown: false }} />
      <Stack.Screen name="CreatePostScreen" component={CreatePostScreen} />
      <Stack.Screen name="EmotionScreen" component={EmotionScreen} options={{ title: 'Bạn đang cảm thấy thế nào?' }} />
      <Stack.Screen name="CommentScreen" component={CommentScreen} options={{ title: 'Bình luận' }} />
      <Stack.Screen name="ChangePasswordScreen" component={ChangePasswordScreen} options={{ title: 'Đổi mật khẩu' }} />
      <Stack.Screen name="FriendScreen" component={FriendScreen} options={{ title: 'Bạn bè' }} />
      <Stack.Screen name="ListFriendScreen" component={ListFriendScreen} options={{ title: 'Danh sách bạn bè' }} />
      <Stack.Screen name="ListFriendRequestsScreen" component={ListFriendRequestsScreen} options={{ title: 'Lời mời kết bạn' }} />
      <Stack.Screen name="ListFriendSuggestionsScreen" component={ListFriendSuggestionsScreen} options={{ title: 'Gợi ý kết bạn' }} />
      <Stack.Screen name="ReportScreen" component={ReportScreen} options={{ title: 'Báo cáo' }} />
      <Stack.Screen name="EditProfileScreen" component={EditProfileScreen} options={{ title: 'Chỉnh sửa trang cá nhân' }} />
      <Stack.Screen name="SearchScreen" component={SearchScreen} />
    </Stack.Navigator>
  );
}

export default MainStackNavigator;
