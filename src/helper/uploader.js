import {Platform} from 'react-native';
import storage from '@react-native-firebase/storage';

export const uploadImage = async (path, onStateChange) => {
  const { uri } = path;
  const filename = uri.substring(uri.lastIndexOf('/') + 1);
  const uploadUri = Platform.OS === 'ios' ? uri.replace('file://', '') : uri;
  const ref = storage().ref(`images/${filename}`);
  const task = ref.putFile(uploadUri);

  task.on('state_changed', snapshot => {
    onStateChange(snapshot);
  });

  try {
    await task;
  } catch (e) {
    console.error(e);
  }

  return ref.getDownloadURL();
}

export const uploadVideo = async (path, onStateChange) => {
  const { uri } = path;
  const filename = uri.substring(uri.lastIndexOf('/') + 1);
  const uploadUri = Platform.OS === 'ios' ? uri.replace('file://', '') : uri;
  const ref = storage().ref(`videos/${filename}`);
  const task = ref.putFile(uploadUri);

  task.on('state_changed', snapshot => {
    onStateChange(snapshot);
  });

  try {
    await task;
  } catch (e) {
    console.error(e);
  }

  return ref.getDownloadURL();
}