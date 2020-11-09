/*
  Màn hình báo cáo bài viết
*/ 
import React, { useState } from 'react';
import {View, Text, TouchableOpacity, Button} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

const exampleContents = [
  'Ảnh khoả thân',
  'Bạo lực',
  'Quấy rối',
  'Tự tử/Tự gây thương tích',
  'Tin giả',
  'Spam',
  'Bán hàng trái phép',
  'Ngôn từ gây thù ghét',
  'Khủng bố',
  'Vấn đề khác'
];

export default function ReportScreen() {
  const [selectedContent, setSelectedContent] = useState(1);

  return (
    <View style={{padding: 10, flex: 1}}>
      {/* Top */}
      <View style={{flex: 1}}>
        <View style={{marginBottom: 10}}>
          <FontAwesome5 name={'exclamation-triangle'} color={'#F9A825'} size={24}/>
          <Text style={{fontSize: 16, fontWeight: 'bold'}}>Vui lòng chọn vấn đề để tiếp tục </Text>
          <Text style={{color: '#757575'}}>Bạn có thể báo cáo bài viết sau khi chọn vấn đề </Text>
        </View>
        {/* Report contents */}
        <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
          {exampleContents.map((item, index) => {
            const bgColor = selectedContent == index ? 'blue' : '#ECEFF1';
            const fgColor = selectedContent == index ? 'white' : 'black';
            return (
              <View style={{ marginRight: 7, marginBottom: 7 }} key={index}>
                <TouchableOpacity
                  style={{ backgroundColor: bgColor, padding: 10, borderRadius: 50 }}
                  onPress={()=>{setSelectedContent(index)}}>
                  <Text style={{ color: fgColor }}>{item}</Text>
                </TouchableOpacity>
              </View>
            )
          })}
        </View>
      </View>

      {/* Bottom */}
      <View>
        <View style={{borderBottomWidth: 1, borderBottomColor: '#CFD8DC', marginVertical: 10}}></View>
        <View>
          <Text>Các bước khác mà bạn có thể thực hiện</Text>
          <TouchableOpacity>
            <View style={{flexDirection : 'row', alignItems: 'center'}}>
              <FontAwesome5 name={'user-slash'} size={20}/>
              <View style={{padding: 10}}>
                <Text style={{fontSize: 16}}>Chặn Ly</Text>
                <Text style={{color: '#757575', paddingRight: 10}}>Các bạn sẽ không thể nhìn thấy hoặc liên hệ với nhau</Text>
              </View>
            </View>
          </TouchableOpacity>
          <TouchableOpacity>
            <View style={{flexDirection : 'row', alignItems: 'center'}}>
              <FontAwesome5 name={'calendar-times'} size={25}/>
              <View style={{padding: 10}}>
                <Text style={{fontSize: 16}}>Bỏ theo dõi Ly</Text>
                <Text style={{color: '#757575', paddingRight: 10}}>Dừng xem bài viết nhưng vẫn là bạn bè</Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>

        {/* Next Button */}
        <Button onPress={()=>{alert('Reported')}} title={'Tiếp'}/>
      </View>
    </View>
  );
}