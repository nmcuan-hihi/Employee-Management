import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Button, Image, StatusBar, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useNavigation } from '@react-navigation/native';
import { useFocusEffect } from '@react-navigation/native';
import ArrEmployee from '../../Model/ArrEmployee';
import ManageAttendance from '../../Model/AttendanceSheetManager';
import { LinearGradient } from 'expo-linear-gradient';

export default function DanhSach() {
  const navigation = useNavigation();
  const [nhanViens, setNhanViens] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

  const arrEmployee = new ArrEmployee();
  const manageAttendance = new ManageAttendance();

  useFocusEffect(
    useCallback(() => {
      fetchEmployees();
    }, [selectedMonth, selectedYear])
  );

  const fetchEmployees = async () => {
    const employees = await arrEmployee.getArremployeeAPI();
    const list = await Promise.all(employees.map(async (emp) => {
      const workingDays = await manageAttendance.calculateTotalWorkingHours(emp.maNV, selectedMonth, selectedYear);
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
          <Button title="Tính Lương" onPress={() => tinhLuong(item)} color="#FF6A6A" />
          <Text style={styles.salaryText}>{item.tongLuong ? item.tongLuong + ' VND' : 'Chưa tính'}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <LinearGradient colors={['#7F7FD5', '#E9E4F0']} style={{ flex: 1 }}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Thông Tin Nhân Viên</Text>
        </View>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={selectedMonth}
            style={{ height: 50, width: 150 }}
            onValueChange={(itemValue) => setSelectedMonth(itemValue)}
          >
            {Array.from({ length: 12 }, (_, i) => (
              <Picker.Item key={i} label={`Tháng ${i + 1}`} value={i + 1} />
            ))}
          </Picker>
          <Picker
            selectedValue={selectedYear}
            style={{ height: 50, width: 150 }}
            onValueChange={(itemValue) => setSelectedYear(itemValue)}
          >
            {Array.from({ length: 10 }, (_, i) => (
              <Picker.Item key={i} label={`${new Date().getFullYear() - i}`} value={new Date().getFullYear() - i} />
            ))}
          </Picker>
        </View>
        <FlatList
          style={styles.flatlist}
          data={nhanViens}
          renderItem={renderEmployeeItem}
          keyExtractor={item => item.maNV}
        />
        <StatusBar style="auto" />
      </View>
    </LinearGradient>
  );  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: StatusBar.currentHeight,
  },
  imageBox: {
    alignItems: 'center',
    marginVertical: 20,
  },
  backgroundImage: {
    width: '40%',
    height: undefined,
    aspectRatio: 1,
    resizeMode: 'contain',
  },
  header: {
    borderWidth: 1,
    borderColor: 'blue',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    marginBottom: 20,
  },
  headerText: {
    color: 'blue',
    fontWeight: 'bold',
    fontSize: 25,
  },
  pickerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginBottom: 20,
  },
  flatlist: {
    width: '90%',
  },
  employeeItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    marginVertical: 5,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    backgroundColor: 'white',
    width: '100%',
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
