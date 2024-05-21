import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

export default function PrintEmployee({ route }) {
  const { employee } = route.params;

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
        <Text style={styles.text}>{employee.ngayCong}</Text>
      </View>
      <View style={styles.infoContainer}>
        <View style={styles.labelContainer}>
          <Text style={styles.label}>Tổng lương:</Text>
        </View>
        <Text style={styles.text}>{(employee.mucLuong * employee.ngayCong).toFixed(0)} VND</Text>
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
});
