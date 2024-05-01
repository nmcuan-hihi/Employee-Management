import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import ArrEmployee from './ArrEmployee'; // Import class ArrEmployee

const ThongTinNhanVien = ({ route }) => {
  const [employee, setEmployee] = useState(null);
 const { arrEmployee } = route.params;
  useEffect(() => {
    const { username } = route.params;

    const employeeData = arrEmployee.getEmployeeByMaNV(username); // Lấy thông tin nhân viên bằng tên đăng nhập
    setEmployee(employeeData);
  }, [route.params]);

  if (!employee) {
    return (
      <View style={styles.container}>
        <Text>Đang tải...</Text>
      </View>
    );
  }

return (
  <View style={styles.container}>
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
      <Text style={styles.label}>Quyền:</Text>
      <Text style={styles.text}>{employee.quyen}</Text>
    </View>
  </View>
);

};



const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    width: '30%',
  },
  text: {
    fontSize: 18,
    width: '70%',
  },
});


export default ThongTinNhanVien;
