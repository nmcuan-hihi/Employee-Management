import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import ArrEmployee from '../../Model/ArrEmployee';
import { FontAwesome5 } from '@expo/vector-icons';
import Employee from '../../Model/Employee';

const ThongTinNhanVien = ({ navigation, route }) => {
  const [employee, setEmployee] = useState(null);

  useEffect(() => {
    const fetchEmployee = async () => {
      const { username } = route.params;
      console.log(username); // Log để kiểm tra username
      const arrEmployee = new ArrEmployee();
      const employeeData = await arrEmployee.getEmployeeByMaNV(username);
      
      setEmployee(employeeData);
      console.log(employeeData); // Log để kiểm tra employeeData
    };

    fetchEmployee();
  }, [route.params]);

  useEffect(() => {
    if (employee) {
      console.log(employee); // Log ra employee khi nó thay đổi
    }
  }, [employee]);

  if (!employee) {
    return (
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <Text style={styles.headerText}>Employee Information</Text>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <FontAwesome5 name="sign-out-alt" size={24} color="black" />
          </TouchableOpacity>
        </View>
        <ActivityIndicator size="large" color="purple" />
        <Text style={styles.loadingText}>Đang tải...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.signOutButton}>
        <FontAwesome5 name="sign-out-alt" size={24} color="black" />
      </TouchableOpacity>

      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>Employee Information</Text>
      </View>

      <View style={styles.card}>
        <View style={styles.row}>
          <Text style={styles.label}>Mã NV:</Text>
          <Text style={styles.text}>{employee.maNV}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Tên NV:</Text>
          <Text style={styles.text}>{employee.tenNV}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Số ĐT:</Text>
          <Text style={styles.text}>{employee.soDT}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Địa chỉ:</Text>
          <Text style={styles.text}>{employee.diaChi}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Chức vụ:</Text>
          <Text style={styles.text}>{employee.tenChucVu}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Mức lương:</Text>
          <Text style={styles.text}>{employee.mucLuong}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Quyền:</Text>
          <Text style={styles.text}>{employee.quyen}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff', // Đổi màu nền thành trắng
    flex: 1,
  },
  signOutButton: {
    alignSelf: 'flex-start',
    marginBottom: 10,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  headerText: {
    fontSize: 22,
    fontWeight: '700',
    color: 'purple',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: 'gray',
  },
  card: {
    backgroundColor: '#f5f5f5', // Đổi màu nền của card thành màu xám nhạt
    borderRadius: 10,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  label: {
    fontWeight: 'bold',
    width: 100,
    color: 'purple',
  },
  text: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
});

export default ThongTinNhanVien;
