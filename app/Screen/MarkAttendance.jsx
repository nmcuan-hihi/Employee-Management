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

const { width, height } = Dimensions.get('window');

export default function InfoModal({ hideModal }) {
    const [selectedDate, setSelectedDate] = useState(null);
    const nav = useNavigation();
    const [showModal, setShowModal] = useState(false);
    const employeesData = arrEmployee.getAllEmployees();
    const [attendanceData, setAttendanceData] = useState([]);

    useEffect(() => {
        const data = manageAttendance.getAllAttendance();
        setAttendanceData(data);
    }, []);


    const handleDateChange = (date) => {
        const str = date.getFullYear() + '/' + (date.getMonth() + 1) + '/' + date.getDate();
        setSelectedDate(str);
        setShowModal(false)
    };

    // item nhân viên
    const renderItem = ({ item }) => (
        <View style={styles.item}>
            <Text style={styles.name}>{item.maNV}</Text>
            <Text style={styles.position}>{item.tenNV}</Text>
            <Checkbox style={styles.checkbox} value={true} onValueChange={() => { }} color={'blue'} />
        </View>
    );

    return (
        <LinearGradient colors={["#7F7FD5", "#E9E4F0"]} style={{ width, height }}>
            <View>
                <OnBack />
                <View style={styles.dateContainer}>
                    <Text style={styles.dateText}>{selectedDate ? selectedDate.toString() : '01/01/2024'}</Text>
                    <TouchableOpacity style={styles.calendarIconContainer} onPress={() => setShowModal(true)}>
                        <Ionicons name="calendar-sharp" size={30} color="black" />
                    </TouchableOpacity>
                </View>
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
                                width={320} // Kích thước của modal
                                // selectedDayTextColor='red'
                                // setSelectedDate='red'
                                onDateChange={handleDateChange}
                            />
                        </View>
                    </View>
                </Modal>
                <ScrollView style={styles.container}>
                    <View>
                        <FlatList
                            data={employeesData}
                            renderItem={renderItem}
                        // keyExtractor={(item) => item.maNV} // Sử dụng id hoặc mã nhân viên làm key
                        />
                    </View>

                </ScrollView>

                <View style={{ flexDirection: 'row', gap: 10, marginLeft: 10, marginBottom: 10 }}>
                    <Checkbox />
                    <Text style={{ fontWeight: 600 }}>Select All</Text>
                </View>
                <View style={{ flexDirection: 'row', gap: 20, marginHorizontal: 10 }}>
                    <Pressable style={[styles.btnContainer, { flex: 1 }]}
                    >
                        <Text style={{ marginTop: 7, fontWeight: 500, fontSize: 20, color: 'white' }}>Submit</Text>
                    </Pressable>
                    <Pressable style={[styles.btnContainer, { flex: 1 }]}
                        onPress={() => {
                            manageAttendance.addAttendance('NV003', '2024-09-07', '08:30', '17:30');
                            const newData = manageAttendance.getAllAttendance();
                            setAttendanceData(newData);nav.push('sheet')
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
        height: '70%',
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
