import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, Button, TouchableOpacity, FlatList, Image, Alert } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import arrEmployee from '../../Model/ArrEmployee';


export default function Edit() {
    const route = useRoute();
    const param = useRoute().params;
    const [maNV, setMaNv] = useState('');
    const [tenNV, setTenNv] = useState('');
    const [soDT, setSoDT] = useState('');
    const [diaChi, setDiaChi] = useState('');
    const [chucVu, setChucVu] = useState('');
    const [mucLuong, setMucLuong] = useState('');
    const [nhanViens, setNhanViens] = useState([]);
    const [message, setMessage] = useState('');
    const navigation = useNavigation();
   
  
    
    useEffect(() => {
       setUp();
    }, [route.params]);

    const setUp = () => {
        const nvc = arrEmployee.getEmployeeByMaNV(param.ma);
        if (nvc && nvc.tenChucVu) {
            setMaNv(nvc.maNV);
            setTenNv(nvc.tenNV);
            setSoDT(nvc.soDT);
            setDiaChi(nvc.diaChi);
            setChucVu(nvc.tenChucVu);
            setMucLuong(nvc.mucLuong.toString());
        } else {
            console.log("Dữ liệu nhân viên không hợp lệ");
            // Xử lý lỗi tại đây, ví dụ: hiển thị thông báo lỗi cho người dùng
        }
    }
    const handleEditNhanVien = () => {
        // Kiểm tra xem các trường thông tin có đầy đủ không
        if (!maNV || !tenNV || !soDT || !diaChi || !chucVu || !mucLuong) {
            setMessage('Vui lòng điền đầy đủ thông tin');
            return;
        }
            // Tạo object mới chứa thông tin nhân viên đã sửa
            arrEmployee.editEmployee(param.ma, {
                tenNv: tenNV,
                soDT: soDT,
                diaChi: diaChi,
                chucVu: chucVu.tenChucVu,
                mucLuong:parseInt(mucLuong, 10)
            });
            const employees = arrEmployee.getAllEmployees();
            navigation.navigate('CrudDanhSach', { nhanViens: employees });
    };



    return (
        <><View style={styles.container} >
            <View style={styles.imageBox}>
                <Image style={styles.backgroundImage} source={require('../../../assets/logo.png')} />
            </View>
            <View style={{ borderWidth: 1, borderColor: 'blue', justifyContent: 'flex-start', alignItems: 'flex-start', position: 'relative', top: 0, left: "auto", right: '10%', margin: 10 }}>
                <Text style={{ color: 'blue', fontWeight: 'bold', fontSize: 25, padding: 5 }}>
                    Sửa Thông Tin Nhân Viên
                </Text>
            </View>

            <View style={{ borderWidth: 1, width: '90%', justifyContent: 'center', alignItems: 'center' }}>
                <TextInput
                    style={styles.input}
                    placeholder="Mã nhân viên"
                    value={maNV}
                    onChangeText={text => setMaNv(text)} />
                <TextInput
                    style={styles.input}
                    placeholder="Tên nhân viên"
                    value={tenNV}
                    onChangeText={text => setTenNv(text)} />
                <TextInput
                    style={styles.input}
                    placeholder="Số điện thoại"
                    value={soDT}
                    keyboardType='numeric'
                    onChangeText={text => setSoDT(text)} />
                <TextInput
                    style={styles.input}
                    placeholder="Địa chỉ"
                    value={diaChi}
                    onChangeText={text => setDiaChi(text)}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Chức vụ"
                    value={chucVu}
                    onChangeText={text => setChucVu(text)}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Mức lương"
                    value={mucLuong}
                    keyboardType='numeric'
                    onChangeText={text => setMucLuong(text)}
                />

                <Text>{message}</Text>

                <View style={styles.borderBox}>
                    <View style={{ flex: 1, marginRight: 5 }}>
                        <Button style={styles.box} title="Sửa" onPress={() => handleEditNhanVien()} />
                    </View>
                </View>
            </View>

        </View>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    borderBox: {
        flexDirection: 'row', // Giữ nguyên hướng dòng
        justifyContent: 'center', // Căn ngang các phần tử
        alignItems: 'center', // Canh giữa các phần tử theo chiều dọc
        width: '80%',
        margin: 5,
    },
    buttonImage: {
        width: 20,
        height: 20,
    },

    imageBox: {
        borderWidth: 1,
        width: '100%',
        height: '100%',
        padding: 10,
        position: 'absolute',
        top: 0,
        left: 0,
        alignSelf: 'flex-start',
    },

    backgroundImage: {
        padding: 0,
        borderWidth: 0,
        width: '50%',
        height: '15%',
    },
    input: {
        height: 40,
        width: '80%',
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 10,
        paddingHorizontal: 10,
        marginTop: 20,
    },
    box: {

    },
    flatlist: {
        backgroundColor: '',
        width: '80%',
        padding: 10,
        borderRadius: 10,
    },
    item: {
        color: 'white',
        marginBottom: 5,
    },
});
