import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, StatusBar } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Picker } from '@react-native-picker/picker';
import ArrEmployee from '../../Model/ArrEmployee';
import ManageAttendance from '../../Model/AttendanceSheetManager';

export default function DanhSach() {
    const navigation = useNavigation();
    const route = useRoute();

    const employees = new ArrEmployee();
    const manageAttendance = new ManageAttendance();
    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth();

    const [selectedMonth, setSelectedMonth] = useState(currentMonth + 1); // Tháng mặc định
    const [selectedYear, setSelectedYear] = useState(currentYear); // Năm mặc định
    const [salaryList, setSalaryList] = useState([]);
    

    const yearList = Array.from({ length: currentYear - 2019 }, (value, index) => 2020 + index);

    useEffect(() => {
        const calculateSalary = (totalHours, mucLuong) => {
            // Đặt quy tắc tính lương của công ty
            const luongThang = totalHours * mucLuong / 234;
            return luongThang.toFixed(0);
        };

        const fetchEmployeeData = async (username) => {
            const employee = await employees.getEmployeeByMaNV(username); // Lấy thông tin của nhân viên từ mã nhân viên (username)

            const totalHours = await manageAttendance.calculateTotalWorkingHours(employee.maNV, selectedMonth, selectedYear);
            const salary = calculateSalary(totalHours, employee.mucLuong);

            const newSalaryList = [
                {
                    ...employee,
                    salary,
                    totalHours,
                    selectedMonth,
                },
            ];
            setSalaryList(newSalaryList);
        };

        const { username } = route.params; // Lấy thông tin tài khoản đã đăng nhập từ route.params
        fetchEmployeeData(username);
    }, [selectedMonth, selectedYear, route.params]);



    const renderEmployeeItem = ({ item }) => {
        const lastName = item.tenNV.split(' ').pop();
        const firstLetter = lastName.charAt(0);

        return (

            <View key={item.maNV} style={styles.employeeItem}>
                <View style={styles.container1}>
                    <View style={styles.infoContainer}>
                        <View style={styles.labelContainer}>
                            <Text style={styles.label}>Mã nhân viên:</Text>
                        </View>
                        <Text style={styles.text}>{item.maNV}</Text>
                    </View>
                    <View style={styles.infoContainer}>
                        <View style={styles.labelContainer}>
                            <Text style={styles.label}>Tên nhân viên:</Text>
                        </View>
                        <Text style={styles.text}>{item.tenNV}</Text>
                    </View>
                    <View style={styles.infoContainer}>
                        <View style={styles.labelContainer}>
                            <Text style={styles.label}>Chức vụ:</Text>
                        </View>
                        <Text style={styles.text}>{item.tenChucVu}</Text>
                    </View>
                    <View style={styles.infoContainer}>
                        <View style={styles.labelContainer}>
                            <Text style={styles.label}>Số điện thoại:</Text>
                        </View>
                        <Text style={styles.text}>{item.soDT}</Text>
                    </View>
                    <View style={styles.infoContainer}>
                        <View style={styles.labelContainer}>
                            <Text style={styles.label}>Lương cơ bản:</Text>
                        </View>
                        <Text style={styles.text}>{item.mucLuong.toLocaleString()} vnđ</Text>
                    </View>
                    <View style={styles.infoContainer}>
                        <View style={styles.labelContainer}>
                            <Text style={styles.label}>Số giờ làm:</Text>
                        </View>
                        <Text style={styles.texth}>{item.totalHours.toLocaleString()}<Text style={styles.text}>  giờ</Text></Text>
                    </View>
                    <View style={styles.infoContainer}>
                        <View style={styles.labelContainer}>
                            <Text style={styles.label}>Lương thực nhận:</Text>
                        </View>
                        <Text style={styles.textLuong}>{Math.floor(item.salary).toLocaleString()}  <Text style={styles.text}>vnđ</Text></Text>
                    </View>
                    


                </View>
            </View>
        );
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerText}>Bảng Lương Tháng {selectedMonth} </Text>

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
     
        height: '80%',
        padding: 3,
      
    },
    
    avatar: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: 'blue',
        justifyContent: 'center',
        alignItems: 'center',
    },
    container1: {
        marginTop: 10,
        flex: 0.7,
        backgroundColor: '#33FF66',
        alignItems: 'center',
        borderWidth: 1,
        borderRadius: 10,
        color: '#33FF66',


    },

    infoContainer: {

        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
        flexWrap: 'nowrap', // Ngăn các từ bị xuống dòng
        marginHorizontal: 10,
    },
    labelContainer: {
        width: 120,
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

    texth: {
        flex: 1,
        fontSize: 25,
        textAlign: 'right',
        fontWeight: 'bold'
    },

    textLuong: {
        flex: 1,
        fontSize: 30,
        textAlign: 'right',
        fontWeight: 'bold'
    },

});