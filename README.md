# FB

## Cài đặt môi trường
Cần cài đặt NodeJs, python2 và openJDK8
Ngoài ra cần cài thêm Android studio và máy ảo.

Tham khảo: https://reactnative.dev/docs/environment-setup

Xem hướng dẫn cài đặt theo mục `React Native CLI Quickstart` (không phải `Expo CLI Quickstart`)


## Cách chạy ứng dụng:
1. Clone project về
2. Mở `cmd`, cd tới thư mục project, chạy lệnh `npm install`.

    Đôi khi cài đặt bị lỗi vì không đủ quyền truy cập. Khi đó chạy `PowerShell` với quyền admin thay vì `cmd`

3. Sau đó chạy lệnh `npx react-native run-android` 

    Nếu đã cài android studio và set-up máy ảo rồi, thì chỉ cần chạy lệnh trên, máy ảo và metro server sẽ tự động bật lên và khởi động ứng dụng. Nếu muốn chạy trên thiết bị điện thoại, kết nối điện thoại vào và bật chế độ USB-debugging trên điện thoại lên, sau đó chạy lệnh trên.

## API Server
API server được deploy trên heroku, sử dụng MongoDB Atlas làm Cloud database và Firebase làm Clound Messaging

Heroku git: https://git.heroku.com/hidden-refuge-96933.git  

API URL: https://hidden-refuge-96933.herokuapp.com/  

## Các chức năng đã hoàn thiện
- Đăng ký
- Đăng nhập
- Gửi lời mời kết bạn
  + Bao gồm thông báo (push notification)