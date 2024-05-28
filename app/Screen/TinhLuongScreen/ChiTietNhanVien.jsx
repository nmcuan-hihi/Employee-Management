import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import manageAttendance from '../../Model/AttendanceSheetManager';

export default function ChiTietNhanVien({ route }) {
  const { employee } = route.params;
  const navigation = useNavigation();
  const currentMonth = new Date().getMonth() + 1; // Lấy tháng hiện tại (getMonth() trả về giá trị từ 0 đến 11)
  const currentYear = new Date().getFullYear(); // Lấy năm hiện tại

  // Lấy ngày công và tổng giờ làm việc từ ManageAttendance
  
  const handlePrint = () => {
    navigation.navigate('PrintEmployee', { employee });
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Thông Tin Nhân Viên: {employee.tenNv}</Text>
      </View>
      <View style={styles.flatlistContainer}>
        <View style={styles.info}>
          <Text style={styles.infoText}>Mã nhân viên: {employee.maNV}</Text>
          <Text style={styles.infoText}>Tên nhân viên: {employee.tenNV}</Text>
          <Text style={styles.infoText}>Chức vụ: {employee.tenChucVu}</Text>
          <Text style={styles.infoText}>Số điện thoại: {employee.soDT}</Text>
          <Text style={styles.infoText}>Lương cơ bản: {employee.mucLuong} vnđ</Text>
          <Text style={styles.infoText}>Tổng giờ làm: {employee.gioCong} giờ</Text>
          <Text style={styles.infoText}>Tổng lương: {employee.tongLuong} vnđ</Text>

        </View>
      </View>
      <TouchableOpacity onPress={handlePrint} style={styles.printButton}>
        <Text style={styles.printButtonText}>In</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    borderWidth: 1,
    borderColor: 'blue',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
    right: '10%',
  },
  imageBox: {
    borderWidth: 1,
    width: '100%',
    height: '100%',
    padding: 10,
    position: 'absolute',
    top: 0,
    left: 0,
    alignSelf: 'flex-start',
  },
  backgroundImage: {
    padding: 0,
    borderWidth: 0,
    width: '50%',
    height: '15%',
  },
  headerText: {
    color: 'blue',
    fontWeight: 'bold',
    fontSize: 25,
    padding: 5,
  },
  flatlistContainer: {
    borderWidth: 1,
    width: '95%',
    justifyContent: 'flex-start',
    alignItems: 'center',
    height: '60%',
    padding: 3,
    marginBottom: 20,
  },
  info: {
    alignSelf: 'flex-start',
    padding: 10,
    width: '90%',
  },
  infoText: {
    fontSize: 20,
    color: 'black',
    alignItems: 'flex-start',
  },
  printButton: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    backgroundColor: 'green',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  printButtonText: {
    color: 'white',
    fontSize: 18,
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 10,
    padding: 10,
  },
  backButtonImage: {
    width: 30,
    height: 30,
  },
});
