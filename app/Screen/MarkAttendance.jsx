import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, Modal, FlatList } from 'react-native';
import { Ionicons, Feather } from '@expo/vector-icons';
import CalendarPicker from 'react-native-calendar-picker';
import OnBack from '../Compoment/OnBack';
import { LinearGradient } from 'expo-linear-gradient';
import arrEmployee from '../Model/ArrEmployee';

const { width, height } = Dimensions.get('window');

export default function InfoModal({ hideModal }) {
    const [selectedDate, setSelectedDate] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const employeesData = arrEmployee.getAllEmployees();
    const handleDateChange = (date) => {
        const str = date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear();
        setSelectedDate(str);
        setShowModal(false)
    };

    // Render mỗi mục trong danh sách nhân viên
    const renderItem = ({ item }) => (

        <View style={styles.item}>


            {/* <Pressable style={{ }}>
                <View style={{ marginRight: 10, padding: 7, width: 45, height: 45, borderRadius: 7, backgroundColor: 'white', alignItems: 'center' }}>
                    <Ionicons name="newspaper-outline" size={24} color="black" />
                </View>
                <Text style={{ fontWeight: 600 }}>NO VALUE</Text>
            </Pressable> */}

            <Text style={styles.name}>{item.maNV}</Text>
            <Text style={styles.position}>{item.tenNV}</Text>
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
                <View style={styles.container}>
                    <FlatList
                        data={employeesData}
                        renderItem={renderItem}
                        keyExtractor={(item) => item.maNV} // Sử dụng id hoặc mã nhân viên làm key
                    />
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
        borderRadius: 15,
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

       height: '80%',
        backgroundColor: 'white',
        margin: 10,
        borderRadius: 10,
        padding: 20,
    },
    item: {
        // backgroundColor: '#f9c2ff',
        // padding: 20,
        // marginVertical: 8,
        // marginHorizontal: 16,
        // borderRadius: 10,
        marginBottom: 10,
        backgroundColor: '#be93c5', borderRadius: 6, padding: 10, flexDirection: 'row', alignItems: 'center'
      },
});
