import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import manageAttendance from '../../Model/AttendanceSheetManager';

export default function PrintEmployee({ route }) {
  const { employee } = route.params;
  const navigation = useNavigation();
  const currentMonth = new Date().getMonth() + 1; // Lấy tháng hiện tại (getMonth() trả về giá trị từ 0 đến 11)
  const currentYear = new Date().getFullYear(); // Lấy năm hiện tại

  // Lấy ngày công và tổng giờ làm việc từ ManageAttendance
  const workingDays = manageAttendance.countWorkingDays(employee.maNV, currentMonth, currentYear);
  const totalWorkingHours = manageAttendance.calculateTotalWorkingHours(employee.maNV, currentMonth, currentYear);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Thông Tin Nhân Viên</Text>
      <View style={styles.infoContainer}>
        <View style={styles.labelContainer}>
          <Text style={styles.label}>Mã nhân viên:</Text>
        </View>
        <Text style={styles.text}>{employee.maNV}</Text>
      </View>
      <View style={styles.infoContainer}>
        <View style={styles.labelContainer}>
          <Text style={styles.label}>Tên nhân viên:</Text>
        </View>
        <Text style={styles.text}>{employee.tenNV}</Text>
      </View>
      <View style={styles.infoContainer}>
        <View style={styles.labelContainer}>
          <Text style={styles.label}>Chức vụ:</Text>
        </View>
        <Text style={styles.text}>{employee.tenChucVu}</Text>
      </View>
      <View style={styles.infoContainer}>
        <View style={styles.labelContainer}>
          <Text style={styles.label}>Số điện thoại:</Text>
        </View>
        <Text style={styles.text}>{employee.soDT}</Text>
      </View>
      <View style={styles.infoContainer}>
        <View style={styles.labelContainer}>
          <Text style={styles.label}>Lương tháng:</Text>
        </View>
        <Text style={styles.text}>{employee.mucLuong}</Text>
      </View>
      <View style={styles.infoContainer}>
        <View style={styles.labelContainer}>
          <Text style={styles.label}>Ngày công:</Text>
        </View>
        <Text style={styles.text}>{workingDays}</Text>
      </View>
      <View style={styles.infoContainer}>
        <View style={styles.labelContainer}>
          <Text style={styles.label}>Tổng giờ làm việc:</Text>
        </View>
        <Text style={styles.text}>{totalWorkingHours} giờ</Text>
      </View>
      <View style={styles.infoContainer}>
        <View style={styles.labelContainer}>
          <Text style={styles.label}>Tổng lương:</Text>
        </View>
        <Text style={styles.text}>{(employee.mucLuong * workingDays).toFixed(0)} VND</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  imageBox: {
    marginBottom: 20,
  },
  header: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  backgroundImage: {
    width: 400,
    height: 200,
  },
  infoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    flexWrap: 'nowrap', 
  },
  labelContainer: {
    width: 150,
  },
  label: {
    fontWeight: 'bold',
    fontSize: 20,
  },
  text: {
    flex: 1,
    fontSize: 20,
    textAlign: 'right',
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
