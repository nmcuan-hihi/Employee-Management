import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, Image } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Picker } from '@react-native-picker/picker';
import ArrEmployee from '../../Model/ArrEmployee';
import QuanLiChucVu from '../../Model/QuanLyChucVu';

export default function Edit() {
    const route = useRoute();
    const { ma } = route.params;
    const [maNV, setMaNv] = useState('');
    const [pass, setPass] = useState('123');
    const [tenNV, setTenNv] = useState('');
    const [soDT, setSoDT] = useState('');
    const [quyen, setQuyen] = useState('');
    const [diaChi, setDiaChi] = useState('');
    const [chucVus, setChucVus] = useState([]);
    const [chucVu, setChucVu] = useState('');
    const [mucLuong, setMucLuong] = useState('');
    const [message, setMessage] = useState('');
    const navigation = useNavigation();
    const arrEmployee = new ArrEmployee();
    const qlChucVu = new QuanLiChucVu();

    useEffect(() => {
        const fetchChucVu = async () => {
            try {
                const data = await qlChucVu.displayChucVuAPI();
                if (Array.isArray(data) && data.length > 0) {
                    setChucVus(data);
                    console.log("Dữ liệu chức vụ:", data);
                } else {
                    console.error('Dữ liệu trả về từ API không hợp lệ:', data);
                }
            } catch (error) {
                console.error('Lỗi khi lấy dữ liệu từ API:', error);
            }
        };

        fetchChucVu();

        const fetchEmployeeData = async () => {
            const nvc = await arrEmployee.getEmployeeByMaNV(ma);
            console.log("Dữ liệu nhân viên:", nvc);
            if (nvc) {
                setMaNv(nvc.maNV);
                setTenNv(nvc.tenNV);
                setPass('123');
                setSoDT(nvc.soDT);
                setQuyen('user');
                setDiaChi(nvc.diaChi);
                setChucVu(nvc.tenChucVu || ''); // Đặt giá trị mặc định cho chucVu
                setMucLuong(nvc.mucLuong ? nvc.mucLuong.toString() : ''); // Đặt giá trị mặc định cho mucLuong
            } else {
                console.error("Dữ liệu nhân viên không hợp lệ");
            }
        };

        fetchEmployeeData();
    }, [ma]);

    const handleEditNhanVien = async () => {
        if (!tenNV || !soDT || !diaChi || !mucLuong || !chucVu) {
            setMessage('Vui lòng điền đầy đủ thông tin');
            return;
        }
    
        const updatedInfo = {
            pass,
            tenNV,
            soDT,
            quyen,
            diaChi,
            mucLuong: parseInt(mucLuong, 10),
            tenChucVu: chucVu  // Đảm bảo gửi tenChucVu
        };
    
        console.log("Thông tin cập nhật:", updatedInfo); // Kiểm tra log thông tin trước khi gửi
    
        try {
            const response = await fetch(`http://10.0.2.2:8080/employee/update/${ma}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedInfo),
            });
    
            if (response.ok) {
                setMessage('Cập nhật nhân viên thành công');
                navigation.navigate('CrudDanhSach', { refresh: true });
            } else {
                setMessage('Đã xảy ra lỗi khi cập nhật nhân viên');
            }
        } catch (error) {
            console.error('Error editing employee:', error);
            setMessage('Đã xảy ra lỗi khi cập nhật nhân viên');
        }
    };
    

    return (
        <View style={styles.container}>
            <View style={styles.imageBox}>
                <Image style={styles.backgroundImage} source={require('../../../assets/logo.png')} />
            </View>
            <View style={styles.header}>
                <Text style={styles.headerText}>Sửa Thông Tin Nhân Viên</Text>
            </View>

            <View style={styles.form}>
                <TextInput
                    style={styles.input}
                    placeholder="Mã nhân viên"
                    value={maNV}
                    editable={false}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Tên nhân viên"
                    value={tenNV}
                    onChangeText={setTenNv}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Số điện thoại"
                    value={soDT}
                    keyboardType='numeric'
                    onChangeText={setSoDT}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Địa chỉ"
                    value={diaChi}
                    onChangeText={setDiaChi}
                />
                <View style={styles.input}>
                    <Picker
                        selectedValue={chucVu}
                        onValueChange={(itemValue) => setChucVu(itemValue)}
                    >
                        {chucVus.map((item) => (
                            <Picker.Item key={item.maCv} label={item.tenCv} value={item.maCv} />
                        ))}
                    </Picker>
                </View>
                <TextInput
                    style={styles.input}
                    placeholder="Mức lương"
                    value={mucLuong}
                    keyboardType='numeric'
                    onChangeText={setMucLuong}
                />

                <Text>{message}</Text>

                <View style={styles.buttonContainer}>
                    <Button title="Sửa" onPress={handleEditNhanVien} />
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    header: {
        borderWidth: 1,
        borderColor: 'blue',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        marginVertical: 10,
        paddingHorizontal: 10,
    },
    headerText: {
        color: 'blue',
        fontWeight: 'bold',
        fontSize: 25,
        padding: 5,
    },
    form: {
        borderWidth: 1,
        width: '90%',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
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
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        width: '80%',
        margin: 5,
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
        width: '50%',
        height: '15%',
    },
});
