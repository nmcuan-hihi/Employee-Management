import { View, Text, Pressable, StyleSheet, Modal } from 'react-native'
import React, { useState } from 'react'
import moment from 'moment';
import { AntDesign, Feather } from "@expo/vector-icons";
import { TouchableOpacity } from 'react-native-gesture-handler';
import CalendarPicker from 'react-native-calendar-picker';

export default function TestScreen() {
    const [currentDate, setCurrentDate] = useState(moment());
    const [showModal, setShowModal] = useState(false);
    const goToNextDay = () => {
        const nextDate = moment(currentDate).add(1, "days");
        setCurrentDate(nextDate);
    };
    const goToPrevDay = () => {
        const prevDate = moment(currentDate).subtract(1, "days");
        setCurrentDate(prevDate);
    };

    const formatDate = (date) => {
        return date.format("MMMM D, YYYY");
    };

    const handleDateChange = (date) => {
        const str = date.getFullYear() + '/' + (date.getMonth() + 1) + '/' + date.getDate();
        //setSelectedDate(str);
        setShowModal(false)
    };
    return (
        <View style={{ flex: 1, backgroundColor: "white" }}>
            <Pressable>
                <View
                    style={{
                        flexDirection: "row",
                        alignItems: "center",
                        gap: 10,
                        marginLeft: "auto",
                        marginRight: "auto",
                        marginVertical: 20,
                    }}
                >
                    <AntDesign
                        onPress={goToPrevDay}
                        name="left"
                        size={24}
                        color="blue"
                    />
                    <TouchableOpacity
                        onPress={() => {
                            setShowModal(true)
                        }}
                    >
                        <Text>{formatDate(currentDate)}</Text>
                    </TouchableOpacity>
                    <AntDesign
                        onPress={goToNextDay}
                        name="right"
                        size={24}
                        color="blue"
                    />
                </View>

            </Pressable>

            <Modal
    visible={showModal}
    animationType="slide"
    transparent={true}
    onRequestClose={() => setShowModal(false)} // Sửa đổi đây
>
    <View style={styles.modalBackground}>
        <View style={styles.modalContainer}>
            <View style={styles.headerContainer}>
                <Pressable
                    onPress={() => {
                        setShowModal(false)
                    }}
                >
                    <Feather name="x-circle" size={24} color="black" style={styles.icon} />
                </Pressable>
            </View>
            <CalendarPicker
                width={320}
                onDateChange={handleDateChange}
            />
        </View>
    </View>
</Modal>

        </View>

    );
}
const styles = StyleSheet.create({
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
})