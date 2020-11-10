/**
 * Component giúp hiển thị hình ảnh theo dạng lưới
 */
import React from 'react'
import { Image, View } from 'react-native';

export default function ImagesGridView({ images }) {
  switch (images.length) {
    case 0:
      return null;
    case 1:
      return (
        <View>
          <Image source={images[0]} style={{ width: '100%', aspectRatio: 1 }} />
        </View>
      );
    case 2:
      return (
        <View style={{ flexDirection: 'row' }}>
          <View style={{ width: '50%', paddingRight: 2 }}>
            <Image source={images[0]} style={{ width: '100%', aspectRatio: 0.5 }} />
          </View>
          <View style={{ width: '50%', paddingLeft: 2 }}>
            <Image source={images[1]} style={{ width: '100%', aspectRatio: 0.5 }} />
          </View>
        </View>
      );
    case 3:
      return (
        <View style={{ flexDirection: 'row' }}>
          <View style={{ width: '50%', paddingRight: 2 }}>
            <View style={{ paddingBottom: 2 }}>
              <Image source={images[0]} style={{ width: '100%', aspectRatio: 1 }} />
            </View>
            <View style={{ paddingTop: 2 }}>
              <Image source={images[1]} style={{ width: '100%', aspectRatio: 1 }} />
            </View>
          </View>
          <View style={{ width: '50%', paddingLeft: 2 }}>
            <Image source={images[2]} style={{ width: '100%', aspectRatio: 0.5 }} />
          </View>
        </View>
      );
    case 4:
      return (
        <View>
          <View style={{ flexDirection: 'row', paddingBottom: 2 }}>
            <View style={{ width: '50%', paddingRight: 2 }}>
              <Image source={images[0]} style={{ width: '100%', aspectRatio: 1 }} />
            </View>
            <View style={{ width: '50%', paddingLeft: 2 }}>
              <Image source={images[1]} style={{ width: '100%', aspectRatio: 1 }} />
            </View>
          </View>
          <View style={{ flexDirection: 'row', paddingTop: 2 }}>
            <View style={{ width: '50%', paddingRight: 2 }}>
              <Image source={images[2]} style={{ width: '100%', aspectRatio: 1 }} />
            </View>
            <View style={{ width: '50%', paddingLeft: 2 }}>
              <Image source={images[3]} style={{ width: '100%', aspectRatio: 1 }} />
            </View>
          </View>
        </View>
      );
  }
}
