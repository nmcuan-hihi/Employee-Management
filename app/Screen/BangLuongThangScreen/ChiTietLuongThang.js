import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome5';
export default function ChiTietBangLuong({ route }) {
    const { employee } = route.params;
    const navigation = useNavigation();

    const handleBackPress = () => {
        navigation.goBack();
    };

    return (

        <View style={styles.container}>
            <TouchableOpacity style={styles.backButton} onPress={handleBackPress}>
                <Icon name="arrow-left" size={30} color="black" />
                
            </TouchableOpacity>
            <View style={styles.header}>
                <Text style={styles.headertext}>Chi Tiết Lương Tháng:  {employee.selectedMonth}</Text>
            </View>

            <View style={styles.container1}>
                <View style={styles.infoContainer}>
                    <View style={styles.labelContainer}>
                        <Text style={styles.label}>Mã nhân viên:</Text>
                    </View>
                    <Text style={styles.text}>{employee.maNV}</Text>
                </View>
                <View style={styles.infoContainer}>
                    <View style={styles.labelContainer}>
                        <Text style={styles.label}>Tên nhân viên:</Text>
                    </View>
                    <Text style={styles.text}>{employee.tenNV}</Text>
                </View>
                <View style={styles.infoContainer}>
                    <View style={styles.labelContainer}>
                        <Text style={styles.label}>Chức vụ:</Text>
                    </View>
                    <Text style={styles.text}>{employee.tenChucVu}</Text>
                </View>
                <View style={styles.infoContainer}>
                    <View style={styles.labelContainer}>
                        <Text style={styles.label}>Số điện thoại:</Text>
                    </View>
                    <Text style={styles.text}>{employee.soDT}</Text>
                </View>
                <View style={styles.infoContainer}>
                    <View style={styles.labelContainer}>
                        <Text style={styles.label}>Lương cơ bản:</Text>
                    </View>
                    <Text style={styles.text}>{employee.mucLuong.toLocaleString()} vnđ</Text>
                </View>
                <View style={styles.infoContainer}>
                    <View style={styles.labelContainer}>
                        <Text style={styles.label}>Số giờ làm:</Text>
                    </View>
                    <Text style={styles.texth}>{employee.totalHours.toLocaleString()}<Text style={styles.text}>  giờ</Text></Text>
                </View>
                <View style={styles.infoContainer}>
                    <View style={styles.labelContainer}>
                        <Text style={styles.label}>Lương thực nhận:</Text>
                    </View>
                    <Text style={styles.textLuong}>{Math.floor(employee.salary).toLocaleString()}  <Text style={styles.text}>vnđ</Text></Text>
                </View>


            </View>


        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFCC',
        paddingHorizontal: 20,
    },

    header: {
        marginTop: 10,
        borderWidth: 1,
        marginLeft: 50,
        borderColor: 'blue',
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 10,
        right: '15%'
    },
    headertext: {
        color: 'blue',
        fontWeight: 'bold',
        fontSize: 25,
        padding: 5,
    },

    container1: {
        marginTop: 10,
        flex: 0.7,
        backgroundColor: '#33FF66',
        alignItems: 'center',
        borderWidth: 1,
        borderRadius: 10,


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

    backButton: {
margin:10,
    },
});
