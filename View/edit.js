import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, Button, TouchableOpacity, FlatList, Image , Alert} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import NhanVien from '../nhanvien';
import quanLi from '../quanli';

export default function Edit() {
    const route = useRoute();
    const param = useRoute().params;
    const [maNv, setMaNv] = useState('');
    const [tenNv, setTenNv] = useState('');
    const [soDT, setSoDT] = useState('');
    const [diaChi, setDiaChi] = useState('');
    const [chucVu, setChucVu] = useState('');
    const [mucLuong, setMucLuong] = useState('');
    const [nhanViens, setNhanViens] = useState([]);
    const [message, setMessage] = useState('');
    const navigation = useNavigation();
   
    useEffect(() => {
     // console.log(param.ma)
        // get nhan vien byid

        setUp();
    }, [route.params]);

    const setUp = () => {
        // const nvc = quanLi.findEmployeeById(param.ma);
        // console.log(nvc.tenChucVu.tenCv)
        // // hienr thị ra text fil
        // // quanLi.editNhanVien(param.ma, new NhanVien(param.ma, "sda", "090435811188", "x", 'đầ', '32143'));
        // // const nvm = quanLi.findEmployeeById(param.ma);
        // //  console.log(nvm.diaChi)
        // setMaNv(nvc.maNv);
        // setTenNv(nvc.tenNv);
        // setSoDT(nvc.soDT);
        // setDiaChi(nvc.diaChi);
        // setChucVu(nvc.tenChucVu.tenCv);
        // setMucLuong(nvc.mucLuong);
        const nvc = quanLi.findEmployeeById(param.ma);
    if (nvc && nvc.tenChucVu) {
        setMaNv(nvc.maNv);
        setTenNv(nvc.tenNv);
        setSoDT(nvc.soDT);
        setDiaChi(nvc.diaChi);
        setChucVu(nvc.tenChucVu);
        setMucLuong(nvc.mucLuong);
    } else {
        console.log("Dữ liệu nhân viên không hợp lệ");
        // Xử lý lỗi tại đây, ví dụ: hiển thị thông báo lỗi cho người dùng
    }
    }
    const handleEditNhanVien = () => {
        // Kiểm tra xem các trường thông tin có đầy đủ không
        if (!maNv || !tenNv || !soDT || !diaChi || !chucVu || !mucLuong) {
            setMessage('Vui lòng điền đầy đủ thông tin');
            return;
        }
        // Tạo object mới chứa thông tin nhân viên đã sửa
        quanLi.editNhanVien(param.ma, {
            tenNv: tenNv,
            soDT: soDT,
            diaChi: diaChi,
            chucVu: chucVu.tenCv,
            mucLuong: mucLuong
          });
    
        // Gọi hàm chỉnh sửa nhân viên từ đối tượng quản lí
       // quanLi.editNhanVien(maNv, editedEmployee);
        // Cập nhật danh sách nhân viên trong state và hiển thị thông báo
        const updatedEmployees = quanLi.displayEmployees();
        setNhanViens(updatedEmployees);
        setMessage('Thông tin nhân viên đã được cập nhật!');
    
        // Điều hướng quay lại màn hình DanhSach và truyền danh sách nhân viên đã cập nhật
        navigation.navigate('manager', { nhanViens: updatedEmployees });
    };
    
    // const handleDeleteNhanVien = (maNv) => {
    //     const employee = quanLi.findEmployeeById(maNv);
    //     if (employee) {
    //       Alert.alert(
    //         'Xác nhận xóa',
    //         `Bạn có chắc chắn muốn xóa nhân viên ${employee.tenNv} không?`,
    //         [
    //           {
    //             text: 'Hủy',
    //             style: 'cancel',
    //           },
    //           {
    //             text: 'Xóa',
    //             onPress: () => {
    //               quanLi.deleteNhanVien(maNv);
    //               setMessage('Xóa thành công');
    //               const updatedEmployees = quanLi.displayEmployees();
    //               //setNhanViens(updatedEmployees)
    //               navigation.navigate('manager', { nhanViens: setNhanViens(updatedEmployees) });
    //             },
    //           },
    //         ],
    //         { cancelable: false }
    //       );
    //     } else {
    //       setMessage(`Không tìm thấy nhân viên có mã ${maNv}`);
    //     }
    //   };

   
    return (
        <><View style={styles.container} >
            <View style={styles.imageBox}>
                <Image style={styles.backgroundImage} source={require('../assets/background.jpg')} />
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
                    value={maNv}
                    onChangeText={text => setMaNv(text)} />
                <TextInput
                    style={styles.input}
                    placeholder="Tên nhân viên"
                    value={tenNv}
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
                    onChangeText={text => setMucLuong(text)}
                    />

                <Text>{message}</Text>

                <View style={styles.borderBox}>
                    <View style={{ flex: 1, marginRight: 5 }}>
                        <Button style={styles.box} title="Sửa" onPress={() => handleEditNhanVien()} />
                    </View>
                    {/* <View style={{ flex: 1, marginLeft: 5 }}>
                        <Button style={styles.box} title="Xóa" onPress={() => handleDeleteNhanVien(maNv)} />
                    </View> */}
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
