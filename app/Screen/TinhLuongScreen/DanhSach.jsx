import React, { useState, useEffect,useCallback} from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Button, Image, StatusBar, Alert } from 'react-native';
import { useNavigation,useFocusEffect } from '@react-navigation/native';
import ArrEmployee from '../../Model/ArrEmployee';
import ManageAttendance from '../../Model/AttendanceSheetManager';

export default function DanhSach() {
  const navigation = useNavigation();
  const [nhanViens, setNhanViens] = useState([]);
  const currentMonth = new Date().getMonth() + 1; 
  const currentYear = new Date().getFullYear(); 

  const arrEmployee = new ArrEmployee();
  const manageAttendance = new ManageAttendance();
  
  useFocusEffect(
    useCallback(() => {
      fetchEmployees();
    }, [])
  );

  const fetchEmployees = async () => {
    const employees = await arrEmployee.getArremployeeAPI();
    const list = await Promise.all(employees.map(async (emp) => {
      const workingDays = await manageAttendance.calculateTotalWorkingHours(emp.maNV, currentMonth, currentYear);
      return {
        ...emp,
        gioCong: workingDays.toFixed(2),
        mucLuong: emp.mucLuong || 0,
        isSalaryCalculated: false 
      };
    }));
    setNhanViens(list);

    
  };

   const tinhLuong = (employee) => {
    const updatedEmployees = nhanViens.map(emp => {
      if (emp.maNV === employee.maNV) {
        if (emp.isSalaryCalculated) {
          Alert.alert("Thông báo", "Lương đã được tính.");
        } else {
          const mucLuong = parseFloat(emp.mucLuong);
          const gioCong = parseFloat(emp.gioCong);
          if (!isNaN(mucLuong) && !isNaN(gioCong)) {
            const tongLuong = (mucLuong / 234) * gioCong;
            return { ...emp, tongLuong: tongLuong.toFixed(0), isSalaryCalculated: true };
          } else {
            Alert.alert("Thông báo", "Dữ liệu không hợp lệ");
            return emp;
          }
        }
      }
      return emp;
    });

    setNhanViens(updatedEmployees);
  };

 

  const handleEmployeePress = (employee) => {
    console.log('Thông tin nhân viên:', employee);
    navigation.navigate('navChiTietNV', { employee: employee }); 
  };

  const renderEmployeeItem = ({ item }) => (
    <TouchableOpacity onPress={() => handleEmployeePress(item)}>


      <View style={styles.employeeItem}>
        <View style={styles.employeeInfo}>
          <Text style={styles.employeeName}>{item.tenNV}</Text>
          <Text style={styles.employeePosition}>{item.tenChucVu}</Text>
          <Text style={styles.employeeAttendance}>Tổng giờ làm: {item.gioCong}</Text>
        </View>
        <View style={styles.salaryButtonContainer}>
          <Button title="Tính Lương" onPress={() => tinhLuong(item)} color="#4CAF50" />
          <Text style={styles.salaryText}>{item.tongLuong ? item.tongLuong + ' VND' : 'Chưa tính'}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.imageBox}>
        <Image style={styles.backgroundImage} source={require('../../../assets/logo.png')} />
      </View>
      <View style={styles.header}>
        <Text style={styles.headerText}>Thông Tin Nhân Viên</Text>
      </View>
      <FlatList
        style={styles.flatlist}
        data={nhanViens}
        renderItem={renderEmployeeItem}
        keyExtractor={item => item.maNV}
      />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
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
    width: '20%',
    height: '15%',
  },
  header: {
    borderWidth: 1,
    borderColor: 'blue',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
    right: '15%',
  },
  headerText: {
    color: 'blue',
    fontWeight: 'bold',
    fontSize: 25,
    padding: 5,
  },
  flatlist: {
    width: '100%',
  },
  employeeItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 13,
    margin: 5,
    borderWidth: 1,
    width: '100%',
    borderColor: '#ccc',
    fontSize: 16,
  },
  employeeInfo: {
    flex: 1,
  },
  employeeName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  employeePosition: {
    fontSize: 16,
    color: '#555',
  },
  employeeAttendance: {
    fontSize: 14,
    color: '#777',
  },
  salaryButtonContainer: {
    flex: 1,
    alignItems: 'flex-end',
  },
  salaryText: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4CAF50',
  },
});
