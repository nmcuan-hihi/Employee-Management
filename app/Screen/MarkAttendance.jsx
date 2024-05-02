import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, Modal, FlatList, Pressable, ScrollView } from 'react-native';
import { Ionicons, Feather, FontAwesome5 } from '@expo/vector-icons';
import CalendarPicker from 'react-native-calendar-picker';
import OnBack from '../Compoment/OnBack';
import { LinearGradient } from 'expo-linear-gradient';
import arrEmployee from '../Model/ArrEmployee';
import { Checkbox } from 'expo-checkbox';
import { useNavigation } from '@react-navigation/native';
import manageAttendance from '../Model/AttendanceSheetManager';
import AttendanceSheet from '../Model/AttendanceSheet';
import moment from 'moment';

const { width, height } = Dimensions.get('window');

export default function InfoModal({ hideModal }) {
    const nav = useNavigation();
    const [selectedDate, setSelectedDate] = useState(moment().format('YYYY-DD-MM'));
    const [showModal, setShowModal] = useState(false);
    const employeesData = arrEmployee.getAllEmployees();
    const [selectAllChecked, setSelectAllChecked] = useState(true); // select tất cả
    const [employeeCheckStates, setEmployeeCheckStates] = useState([]); // mảng select của các nhân viên
    const [attendanceData, setAttendanceData] = useState([]); // mảng chấm công

    useEffect(() => {
        const data = manageAttendance.getAllAttendance();
        setAttendanceData(data);
    }, []);
   
    // select ngày
    const handleDateChange = (date) => {
        // const str = date.getFullYear() + '/' + (date.getMonth() + 1) + '/' + date.getDate();
        setSelectedDate(moment(date).format('YYYY-DD-MM'));
        setShowModal(false)
    };
    const selectAll = () => {
        setSelectAllChecked(!selectAllChecked); // đảo ngược check all
        setEmployeeCheckStates(Array(employeesData.length).fill(!selectAllChecked)); // danh sách nhân viên check theo check all
    };

    // cham coong nhân viên
    const markAttendances = () => {
        //  vòng lặp để lấy các nhân viên được check
        employeeCheckStates.forEach((isChecked, index) => {
            if (isChecked) {
                const maNV = employeesData[index].maNV; 
                console.log(new AttendanceSheet(maNV, selectedDate, '08:30', '17:30'));
                // thêm nhân viên chấm công
                manageAttendance.addAttendance(maNV, selectedDate, '08:30', '17:30')
                const newData = manageAttendance.getAllAttendance();
                setAttendanceData(newData);
                
         
            }
        });


    }
    // item nhân viên
    const renderItem = ({ item, index }) => (
        <View style={styles.item}>
            <Text style={styles.name}>{item.maNV}</Text>
            <Text style={styles.position}>{item.tenNV}</Text>
            <Checkbox style={styles.checkbox}
                value={employeeCheckStates[index]} // value của item đc lưu trong mảng 
                onValueChange={(newValue) => {
                    const updatedCheckStates = [...employeeCheckStates];
                    updatedCheckStates[index] = newValue;
                    setEmployeeCheckStates(updatedCheckStates);

                }}
                color={'blue'} />
        </View>
    );

    return (
        <LinearGradient colors={["#7F7FD5", "#E9E4F0"]} style={{ width, height }}>
            <View>
                <OnBack />
                {/* view select ngày */}
                <View style={styles.dateContainer}>
                    <Text style={styles.dateText}>{selectedDate}</Text>
                    <TouchableOpacity style={styles.calendarIconContainer} onPress={() => setShowModal(true)}>
                        <Ionicons name="calendar-sharp" size={30} color="blue" />
                    </TouchableOpacity>
                </View>
                {/* modal calendar pick ngày */}
                <Modal
                    visible={showModal}
                    animationType="slide"
                    transparent={true}
                    onRequestClose={() => setShowModal(false)}
                >
                    <View style={styles.modalBackground}>
                        <View style={styles.modalContainer}>
                            <View style={styles.headerContainer}>
                                <TouchableOpacity onPress={() => setShowModal(false)}>
                                    <Feather name="x-circle" size={24} color="black" style={styles.icon} />
                                </TouchableOpacity>
                            </View>
                            <CalendarPicker
                                width={320}
                                onDateChange={handleDateChange}
                            />
                        </View>
                    </View>
                </Modal>

                {/* list nhân viên */}
                <View style={styles.container}>
                    <FlatList
                        data={employeesData}
                        renderItem={renderItem}
                        keyExtractor={(item) => item.maNV}
                    />

                    {/* chức năng */}
                </View>

                <View style={{ flexDirection: 'row', gap: 10, marginLeft: 10, marginBottom: 10 }}>
                    <Checkbox value={selectAllChecked}
                        onValueChange={selectAll}
                    />
                    <Text style={{ fontWeight: 600 }}>Select All</Text>
                </View>
                <View style={{ flexDirection: 'row', gap: 20, marginHorizontal: 10 }}>
                    <Pressable style={[styles.btnContainer, { flex: 1 }]}
                    onPress={markAttendances}
                    >
                        <Text style={{ marginTop: 7, fontWeight: 500, fontSize: 20, color: 'white' }}>Submit</Text>
                    </Pressable>
                    <Pressable style={[styles.btnContainer, { flex: 1 }]}
                        onPress={() => {
                            // manageAttendance.addAttendance(new AttendanceSheet("NV003", '2024-02-05', '08:30', '17:30'))
                            // const newData = manageAttendance.getAllAttendance();
                            // setAttendanceData(newData);
                            nav.push('sheet')
                        }}
                    >
                        <Text style={{ marginTop: 7, fontWeight: 500, fontSize: 20, color: 'white' }}>Check</Text>
                    </Pressable>
                </View>
            </View>



        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    dateContainer: {
        paddingHorizontal: 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
        borderRadius: 10,
        alignSelf: 'center',
    },
    dateText: {
        fontSize: 20,
        color: 'blue'
    },
    calendarIconContainer: {
        marginLeft: 10,
        padding: 5,
        borderRadius: 8,
        backgroundColor: '#e0e0e0',
    },
    modalBackground: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContainer: {
        width: '80%', // Kích thước của modal 
        backgroundColor: 'white',
        borderRadius: 15,
        padding: 20,
    },
    headerContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginBottom: 20,
    },
    icon: {
        marginRight: 10,
    },
    name: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    position: {
        marginLeft: 10,
        fontSize: 16,
        color: 'black',
    },
    container: {
        height: '72%',
        backgroundColor: 'white',
        margin: 10,
        borderRadius: 10,
        padding: 20,
    },
    btnContainer: {
        backgroundColor: '#7F7FD5', padding: 12, borderRadius: 6, alignItems: 'center', justifyContent: 'center',

    },
    item: {
        marginBottom: 10,
        backgroundColor: '#E9E4F0',
        borderRadius: 6,
        padding: 10,
        flexDirection: 'row',
        alignItems: 'center',
    },
    checkbox: {
        marginLeft: 'auto', // đẩy vè bên phải
    },
});
