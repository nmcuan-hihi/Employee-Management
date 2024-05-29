import React, { useEffect, useState,useCallback  } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, StatusBar } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Picker } from '@react-native-picker/picker';
import ArrEmployee from '../../Model/ArrEmployee';
import ManageAttendance from '../../Model/AttendanceSheetManager';
import { useFocusEffect } from '@react-navigation/native';


export default function DanhSach() {

  const navigation = useNavigation();

  const employees = new ArrEmployee();
const manageAttendance = new ManageAttendance();
const currentYear = new Date().getFullYear();
const currentMonth = new Date().getMonth();

  const [selectedMonth, setSelectedMonth] = useState(currentMonth+1); // Tháng mặc định
  const [selectedYear, setSelectedYear] = useState(currentYear); // Năm mặc định
  const [salaryList, setSalaryList] = useState([]);
  const [sortOption, setSortOption] = useState('name');



  const yearList = Array.from({ length: currentYear - 2019 }, (value, index) => 2020 + index);

  useFocusEffect(
    useCallback(() => {

    const calculateSalary = (totalHours, mucLuong) => {
      // Đặt quy tắc tính lương của công ty 
      const luongThang = totalHours * mucLuong / 234;
      return luongThang.toFixed(0) ;
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

  }, [selectedMonth, selectedYear, sortOption]));



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
      <View style={styles.header}>
        <Text style={styles.headerText}>Bảng Lương Tháng {selectedMonth}</Text>

      </View>
      <View style={styles.pickerContainer}>
        <Picker
          style={styles.picker}
          selectedValue={selectedMonth}
          onValueChange={(itemValue) => setSelectedMonth(itemValue)}
        >
          <Picker.Item label="Tháng 1" value={1} />
          <Picker.Item label="Tháng 2" value={2} />
          <Picker.Item label="Tháng 3" value={3} />
          <Picker.Item label="Tháng 4" value={4} />
          <Picker.Item label="Tháng 5" value={5} />
          <Picker.Item label="Tháng 6" value={6} />
          <Picker.Item label="Tháng 7" value={7} />
          <Picker.Item label="Tháng 8" value={8} />
          <Picker.Item label="Tháng 9" value={9} />
          <Picker.Item label="Tháng 10" value={10} />
          <Picker.Item label="Tháng 11" value={11} />
          <Picker.Item label="Tháng 12" value={12} />
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
      <View style={styles.flatlistContainer}>
        <FlatList
          style={styles.flatlist}
          data={salaryList}
          renderItem={renderEmployeeItem}
          keyExtractor={item => item.maNV}
        />
        <StatusBar style="auto" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  header: {
    borderWidth: 1,
    borderColor: 'blue',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
    right: '15%'
  },
  headerText: {
    color: 'blue',
    fontWeight: 'bold',
    fontSize: 25,
    padding: 5,
  },
  pickerContainer: {
    flexDirection: 'row',
  },
  picker: {
    flex: 1,
    width: 10,
  },

  flatlistContainer: {
    borderWidth: 1,
    width: '95%',
    justifyContent: 'center',
    alignItems: 'center',
    height: '90%',
    padding: 3,
    backgroundColor: '#99FF66',
  },
  employeeItem: {

    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    margin: 5,
    borderWidth: 1,
    width: '98%',
    borderColor: '#000',
    fontSize: 25,
    backgroundColor: 'white',
    borderRadius: 10,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'blue',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  maNV: {
    width: 60,
    marginHorizontal: 10,
  },
  tenNV: {
    flex: 1,
  },

});