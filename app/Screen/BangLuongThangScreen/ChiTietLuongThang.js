import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { LinearGradient } from 'expo-linear-gradient';
import ExportExcelDetails from '../../Model/ExportExcelDetails';

export default function ChiTietBangLuong({ route }) {
    const employee = route.params.employee;
    const year = route.params.year;


    const navigation = useNavigation();

    const handleBackPress = () => {
        navigation.goBack();
    };

    return (
        <LinearGradient
            colors={['#7F7FD5', '#ffffff']}
            style={styles.container}
        >
            <TouchableOpacity style={styles.backButton} onPress={handleBackPress}>
                <Icon name="arrow-left" size={30} color="black" />
            </TouchableOpacity>
            <View style={styles.header}>
                <Text style={styles.headerText}>Chi Tiết Lương Tháng: {employee.selectedMonth}</Text>
                {/* Thêm nút Export Excel */}
                <ExportExcelDetails item={employee} month={employee.selectedMonth} year={year} />

            </View>

            <View style={styles.infoContainer}>
                <Image source={{ uri: employee.imageUrl }} style={styles.avatar} />
                <View style={styles.infoRow}>

                    <Text style={styles.label}>Mã nhân viên:</Text>
                    <Text style={styles.text}>{employee.maNV}</Text>
                </View>
                <View style={styles.infoRow}>
                    <Text style={styles.label}>Tên nhân viên:</Text>
                    <Text style={styles.text}>{employee.tenNV}</Text>
                </View>
                <View style={styles.infoRow}>
                    <Text style={styles.label}>Chức vụ:</Text>
                    <Text style={styles.text}>{employee.tenChucVu}</Text>
                </View>
                <View style={styles.infoRow}>
                    <Text style={styles.label}>Số điện thoại:</Text>
                    <Text style={styles.text}>{employee.soDT}</Text>
                </View>
                <View style={styles.infoRow}>
                    <Text style={styles.label}>Lương cơ bản:</Text>
                    <Text style={styles.text}>{employee.mucLuong.toLocaleString()} vnđ</Text>
                </View>
                <View style={styles.infoRow}>
                    <Text style={styles.label}>Số giờ làm:</Text>
                    <Text style={styles.text}>{employee.totalHours.toLocaleString()} giờ</Text>
                </View>
                <View style={styles.infoRow}>
                    <Text style={styles.label}>Lương thực nhận:</Text>
                    <Text style={styles.text}>{Math.floor(employee.salary).toLocaleString()} vnđ</Text>
                </View>
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
    avatar: {
        marginLeft:80,
        marginBottom:50,
        width: 150,
        height: 150,
        backgroundColor: '#f5f5f5', // Đổi màu nền của card thành màu xám nhạt
        borderRadius: 10,
        padding: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
       
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
    backButton: {
        position: 'absolute',
        top: 10,
        left: 10,
    },
});
