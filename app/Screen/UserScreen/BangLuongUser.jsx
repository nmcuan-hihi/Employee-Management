import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, StatusBar, TouchableOpacity } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Picker } from '@react-native-picker/picker';
import ArrEmployee from '../../Model/ArrEmployee';
import ManageAttendance from '../../Model/AttendanceSheetManager';
import { LinearGradient } from 'expo-linear-gradient';
import Icon from 'react-native-vector-icons/FontAwesome5';

export default function DanhSach() {
    const navigation = useNavigation();
    const route = useRoute();

    const employees = new ArrEmployee();
    const manageAttendance = new ManageAttendance();
    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth();

    const [selectedMonth, setSelectedMonth] = useState(currentMonth + 1); // Default month
    const [selectedYear, setSelectedYear] = useState(currentYear); // Default year
    const [salaryList, setSalaryList] = useState([]);

    const yearList = Array.from({ length: currentYear - 2019 + 1 }, (value, index) => 2020 + index);

    useEffect(() => {
        const calculateSalary = (totalHours, mucLuong) => {
            // Your salary calculation logic
            const luongThang = totalHours * mucLuong / 234;
            return luongThang.toFixed(0);
        };

        const fetchEmployeeData = async (username) => {
            const employee = await employees.getEmployeeByMaNV(username);
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

        const { username } = route.params;
        fetchEmployeeData(username);
    }, [selectedMonth, selectedYear, route.params]);

    const renderEmployeeItem = ({ item }) => {
        return (
            <View key={item.maNV} style={styles.employeeItem}>
                <View style={styles.infoContainer}>
                    <View style={styles.infoRow}>
                        <Text style={styles.label}>Mã nhân viên:</Text>
                        <Text style={styles.text}>{item.maNV}</Text>
                    </View>
                    <View style={styles.infoRow}>
                        <Text style={styles.label}>Tên nhân viên:</Text>
                        <Text style={styles.text}>{item.tenNV}</Text>
                    </View>
                    <View style={styles.infoRow}>
                        <Text style={styles.label}>Chức vụ:</Text>
                        <Text style={styles.text}>{item.tenChucVu}</Text>
                    </View>
                    <View style={styles.infoRow}>
                        <Text style={styles.label}>Số điện thoại:</Text>
                        <Text style={styles.text}>{item.soDT}</Text>
                    </View>
                    <View style={styles.infoRow}>
                        <Text style={styles.label}>Lương cơ bản:</Text>
                        <Text style={styles.text}>{item.mucLuong.toLocaleString()} vnđ</Text>
                    </View>
                    <View style={styles.infoRow}>
                        <Text style={styles.label}>Số giờ làm:</Text>
                        <Text style={styles.text}>{item.totalHours.toLocaleString()} giờ</Text>
                    </View>
                    <View style={styles.infoRow}>
                        <Text style={styles.label}>Lương thực nhận:</Text>
                        <Text style={styles.text}>{Math.floor(item.salary).toLocaleString()} vnđ</Text>
                    </View>
                </View>
            </View>
        );
    };

    return (
        <LinearGradient colors={['#7F7FD5', '#ffffff']} style={styles.container}>
            <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                <Icon name="arrow-left" size={30} color="black" />
            </TouchableOpacity>
            <View style={styles.header}>
                <Text style={styles.headerText}>Bảng Lương Tháng {selectedMonth}</Text>
            </View>
            <View style={styles.pickerContainer}>
                <Picker
                    style={styles.picker}
                    selectedValue={selectedMonth}
                    onValueChange={(itemValue) => setSelectedMonth(itemValue)}
                >
                    {Array.from({ length: 12 }, (_, i) => {
                        const month = i + 1;
                        return <Picker.Item key={month} label={`Tháng ${month}`} value={month} />;
                    })}
                </Picker>
                <Picker
                    style={styles.picker}
                    selectedValue={selectedYear}
                    onValueChange={(itemValue) => setSelectedYear(itemValue)}
                >
                    {yearList.map((year) => (
                        <Picker.Item key={year} label={String(year)} value={year} />
                    ))}
                </Picker>
            </View>
            <View style={styles.flatlistContainer}>
                <FlatList
                    data={salaryList}
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
        paddingHorizontal: 20,
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
        textAlign: 'center',
    },
    pickerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        marginBottom: 20,
    },
    picker: {
        flex: 1,
    },
    flatlistContainer: {
        flex: 1,
        borderWidth: 1,
        borderColor: '#000',
        borderRadius: 10,
        padding: 10,
        backgroundColor: '#7F7FD5',
    },
    backButton: {
        position: 'absolute',
        top: 10,
        left: 10,
    },
    employeeItem: {
        marginBottom: 20,
    },
    infoContainer: {
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 20,
        borderWidth: 1,
        borderColor: '#ccc',
        width: '100%',
    },
    infoRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 15,
    },
    label: {
        fontWeight: 'bold',
        fontSize: 18,
        color: 'blue',
    },
    text: {
        fontSize: 18,
        color: 'black',
        textAlign: 'right',
    },
});
