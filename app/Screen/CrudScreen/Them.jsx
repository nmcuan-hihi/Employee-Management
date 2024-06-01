import React, { useEffect, useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, Text, View, TextInput, Button, Image, KeyboardAvoidingView, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Picker } from '@react-native-picker/picker';
import QuanLiChucVu from '../../Model/QuanLyChucVu';
import ArrEmployee from '../../Model/ArrEmployee';
import Employee from '../../Model/Employee';
import { LinearGradient } from 'expo-linear-gradient';

export default function Them() {
    const [maNv, setMaNv] = useState('');
    const [tenNv, setTenNv] = useState('');
    const [soDT, setSoDT] = useState('');
    const [diaChi, setDiaChi] = useState('');
    const [selectedValue, setSelectedValue] = useState('');
    const [mucLuong, setMucLuong] = useState('');
    const [message, setMessage] = useState('');
    const [chucVus, setChucVus] = useState([]);
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
    }, []);
  
    const handleAddNhanVien = async () => {
      const existingEmployee = await arrEmployee.getEmployeeByMaNV(maNv.trim());
      const phoneNumberRegex = /^[0-9]*$/;
      let phoneNumber = soDT.trim();
  
      if (existingEmployee) {
        alert("Mã nhân viên đã tồn tại");
      } else {
        if (maNv.trim() === '' || tenNv.trim() === '' || phoneNumber === '') {
          alert("Chưa nhập đủ các trường");
        } else if (!phoneNumberRegex.test(phoneNumber) || (phoneNumber.length !== 10 && phoneNumber.length !== 11)) {
          alert("Nhập lại số điện thoại");
        } else if (phoneNumber.length === 10 || (phoneNumber.length === 11 && phoneNumber.charAt(0) !== '0') || phoneNumber.length > 11) {
          if (phoneNumber.charAt(0) !== '0') {
            phoneNumber = '0' + phoneNumber;
            setSoDT(phoneNumber);
          } else if (phoneNumber.charAt(0) === '0' && phoneNumber.length < 10) {
            alert("Nhập thiếu số điện thoại");
          } else {
            setSoDT(phoneNumber);
            await arrEmployee.addEmployee(maNv, "123", tenNv, soDT, 'user', diaChi, selectedValue, mucLuong);
  
            setMessage('Nhân viên đã được thêm!');
            setMaNv('');
            setTenNv('');
            setSoDT('');
            setDiaChi('');
            setSelectedValue('');
            setMucLuong('');
            navigation.navigate('CrudDanhSach', { refresh: true });
          }
        }
      }
    };
  
    return (
      <KeyboardAvoidingView style={styles.container}>
        <LinearGradient
          colors={['#7F7FD5', '#ffffff']}
          style={styles.gradientContainer}
        >
          <View style={styles.imageBox}>
            <Image style={styles.backgroundImage} source={require('../../../assets/logo.png')} />
          </View>
          <View style={styles.textContainer}>
            <Ionicons name="person-add" size={34} color="blue" />
            <Text style={styles.headerText}>Thêm Nhân Viên</Text>
          </View>
  
          <SafeAreaView style={styles.formContainer}>
            <TextInput
              style={styles.input}
              placeholder="Mã nhân viên"
              value={maNv}
              onChangeText={text => setMaNv(text)}
            />
            <TextInput
              style={styles.input}
              placeholder="Tên nhân viên"
              value={tenNv}
              onChangeText={text => setTenNv(text)}
            />
            <TextInput
              style={styles.input}
              placeholder="Số điện thoại"
              value={soDT}
              keyboardType='numeric'
              onChangeText={text => setSoDT(text)}
            />
            <TextInput
              style={styles.input}
              placeholder="Địa chỉ"
              value={diaChi}
              onChangeText={text => setDiaChi(text)}
            />
            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={selectedValue}
                onValueChange={(itemValue) => setSelectedValue(itemValue)}
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
              onChangeText={text => setMucLuong(text)}
            />
            <Text style={styles.message}>{message}</Text>
            <View style={styles.buttonContainer}>
              <Button title="Thêm" onPress={handleAddNhanVien} />
            </View>
          </SafeAreaView>
        </LinearGradient>
      </KeyboardAvoidingView>
    );
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    gradientContainer: {
      flex: 1,
      alignItems: 'center',
      paddingTop: 40,
    },
    imageBox: {
      width: '100%',
      alignItems: 'center',
      marginBottom: 20,
    },
    backgroundImage: {
      width: '50%',
      height: '15%',
      resizeMode: 'contain',
    },
    textContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 20,
    },
    headerText: {
      color: 'blue',
      fontWeight: 'bold',
      fontSize: 25,
      paddingLeft: 10,
    },
    formContainer: {
      width: '90%',
      alignItems: 'center',
    },
    input: {
      height: 40,
      width: '100%',
      borderColor: 'gray',
      borderWidth: 1,
      borderRadius: 10,
      marginBottom: 15,
      paddingHorizontal: 10,
      backgroundColor: '#fff',
    },
    pickerContainer: {
      height: 40,
      width: '100%',
      borderColor: 'gray',
      borderWidth: 1,
      borderRadius: 10,
      marginBottom: 15,
      overflow: 'hidden',
      justifyContent: 'center',
    },
    buttonContainer: {
      marginTop: 20,
      width: '50%',
    },
    message: {
      color: 'green',
      marginTop: 10,
    },
  });