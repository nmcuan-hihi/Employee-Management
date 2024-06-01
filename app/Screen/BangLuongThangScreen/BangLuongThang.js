import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, StatusBar } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Picker } from '@react-native-picker/picker';
import ArrEmployee from '../../Model/ArrEmployee';
import ManageAttendance from '../../Model/AttendanceSheetManager';
import { useFocusEffect } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';

export default function DanhSach() {
  const navigation = useNavigation();
  const employees = new ArrEmployee();
  const manageAttendance = new ManageAttendance();
  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth();

  const [selectedMonth, setSelectedMonth] = useState(currentMonth + 1); // Tháng mặc định
  const [selectedYear, setSelectedYear] = useState(currentYear); // Năm mặc định
  const [salaryList, setSalaryList] = useState([]);
  const [sortOption, setSortOption] = useState('name');

  const yearList = Array.from({ length: currentYear - 2019 }, (value, index) => 2020 + index);

  useFocusEffect(
    useCallback(() => {
      const calculateSalary = (totalHours, mucLuong) => {
        // Đặt quy tắc tính lương của công ty 
        const luongThang = totalHours * mucLuong / 234;
        return luongThang.toFixed(0);
      };

      const fetchEmployeeData = async () => {
        const arrEmployee = await employees.getArremployeeAPI();

        const newSalaryList = await Promise.all(arrEmployee.map(async (employee) => {
          const totalHours = await manageAttendance.calculateTotalWorkingHours(employee.maNV, selectedMonth, selectedYear);
          const salary = calculateSalary(totalHours, employee.mucLuong);
          return {
            ...employee,
            salary,
            totalHours,
            selectedMonth,
          };
        }));

        const filteredEmployeeList = newSalaryList.filter((employee) => employee.totalHours > 0);
        // Sắp xếp danh sách theo lựa chọn
        let sortedList = [...filteredEmployeeList];
        if (sortOption === 'name') {
          sortedList.sort((a, b) => {
            const wordsA = a.tenNV.split(' ');
            const wordsB = b.tenNV.split(' ');
            const lastCharA = wordsA[wordsA.length - 1][0].toUpperCase();
            const lastCharB = wordsB[wordsB.length - 1][0].toUpperCase();

            if (lastCharA < lastCharB) {
              return -1;
            }
            if (lastCharA > lastCharB) {
              return 1;
            }
            return 0;
          });
        } else if (sortOption === 'salary') {
          sortedList.sort((a, b) => a.salary - b.salary);
        }
        setSalaryList(sortedList);
      };

      fetchEmployeeData();
    }, [selectedMonth, selectedYear, sortOption])
  );

  const renderEmployeeItem = ({ item }) => {
    const lastName = item.tenNV.split(' ').pop();
    const firstLetter = lastName.charAt(0);

    return (
      <TouchableOpacity
        onPress={() => navigation.navigate('ChiTietLuongThang', { employee: item })}
      >
        <View key={item.maNV} style={styles.employeeItem}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>{firstLetter}</Text>
          </View>
          <Text style={styles.maNV}>{item.maNV}</Text>
          <Text style={styles.tenNV}>{item.tenNV}</Text>
          <Text style={styles.luong}>{Math.floor(item.salary).toLocaleString()} vnđ</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#7F7FD5', '#ffffff']}
        style={styles.gradientContainer}
      >
        <View style={styles.header}>
          <Text style={styles.headerText}>Bảng Lương Tháng {selectedMonth}</Text>
        </View>
        <View style={styles.pickerContainer}>
          <Picker
            style={styles.picker}
            selectedValue={selectedMonth}
            onValueChange={(itemValue) => setSelectedMonth(itemValue)}
          >
            {[...Array(12).keys()].map((month) => (
              <Picker.Item label={`Tháng ${month + 1}`} value={month + 1} key={month} />
            ))}
          </Picker>

          <Picker
            style={styles.picker}
            selectedValue={selectedYear}
            onValueChange={(itemValue) => setSelectedYear(itemValue)}
          >
            {yearList.map((year) => (
              <Picker.Item label={String(year)} value={year} key={year} />
            ))}
          </Picker>

          <Picker
            style={styles.picker}
            selectedValue={sortOption}
            onValueChange={(itemValue) => setSortOption(itemValue)}
          >
            <Picker.Item label="Sắp xếp theo tên" value="name" />
            <Picker.Item label="Sắp xếp theo mức lương" value="salary" />
          </Picker>
        </View>
        <FlatList
          style={styles.flatlist}
          data={salaryList}
          renderItem={renderEmployeeItem}
          keyExtractor={item => item.maNV}
        />
        <StatusBar style="auto" />
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradientContainer: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 40,
  },
  header: {
    marginBottom: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerText: {
    color: 'blue',
    fontWeight: 'bold',
    fontSize: 25,
  },
  pickerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '90%',
    marginBottom: 20,
  },
  picker: {
    flex: 1,
    height: 50,
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
    backgroundColor: '#fff',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#7F7FD5',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  avatarText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  maNV: {
    width: 60,
    textAlign: 'center',
  },
  tenNV: {
    flex: 1,
    textAlign: 'center',
  },
  luong: {
    width: 100,
    textAlign: 'right',
  },
});
