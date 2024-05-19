import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Picker } from '@react-native-picker/picker';
import { StyleSheet, Text, View, TextInput, Button, Image , KeyboardAvoidingView,SafeAreaView} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useRoute } from '@react-navigation/native'; 
import QuanLiChucVu from '../quanliChucVu';
import quanLi from '../quanli';
import NhanVien from '../nhanvien';

export default function Them() {
  const [maNv, setMaNv] = useState('');
  const [tenNv, setTenNv] = useState('');
  const [soDT, setSoDT] = useState('');
  const [diaChi, setDiaChi] = useState('');
  const [selectedChucVu, setSelectedChucVu] = useState(''); // State to store the selected value in Picker
  const [chucVus, setChucVus] = useState([]); // State to store the list of items in Picker
  const [mucLuong, setMucLuong] = useState('');
  const [nhanViens, setNhanViens] = useState([]);
  const [message, setMessage] = useState('');
  const navigation = useNavigation();
  const qlChucVu = new QuanLiChucVu();

  useEffect(() => {
   // setNhanViens([...quanLi.displayEmployees()]);
   setSelectedChucVu('');
    setChucVus(qlChucVu.displayChucVu());
  }, []);
  
  const handleAddNhanVien = () => {
    console.log(selectedChucVu.tenCv); // Kiểm tra giá trị của selectedChucVu
    console.log(nhanViens);
    const ktMaNv = quanLi.nhanViens.find(employee => employee.maNv === maNv.trim());
    const phoneNumberRegex = /^[0-9]*$/;
    let phoneNumber = soDT.trim();
    if (ktMaNv) {
        alert("Mã nhân viên đã tồn tại");
    } else {
        if ((maNv.trim() === '') || tenNv.trim() === '' || phoneNumber === '') {
            alert("Chưa nhập đủ các trường");
        } else if (!phoneNumberRegex.test(phoneNumber) || (phoneNumber.length !== 10 && phoneNumber.length !== 11)) {
            alert("Nhập lại số điện thoại");
        } else if (phoneNumber.length === 10 || (phoneNumber.length === 11 && phoneNumber.charAt(0) !== '0') || phoneNumber.length > 11) {
            if (phoneNumber.charAt(0) !== '0') {
                phoneNumber = '0' + phoneNumber;
                setSoDT(phoneNumber);
            } else if(phoneNumber.charAt(0) === '0' && phoneNumber.length < 11){
              alert("Nhập thiếu số điện thoại")
            }else{
                setSoDT(phoneNumber);
            }
        } else {
            console.log(new NhanVien(maNv, tenNv, soDT, diaChi, selectedChucVu, mucLuong));
            quanLi.addNhanVien(maNv, tenNv, soDT, diaChi, selectedChucVu, mucLuong);
            setMessage('Nhân viên đã được thêm!');
            setMaNv('');
            setTenNv('');
            setSoDT('');
            setDiaChi('');
            setSelectedChucVu('');
            setMucLuong('');
            navigation.navigate('manager', quanLi.displayEmployees());
        }
    }
};


  const renderChucVuItems = () => {
    return chucVus.map(chucVu => (
      <Picker.Item key={chucVu.tenCv} label={chucVu.tenCv} value={chucVu} />
    ));
  };

  return (
    <KeyboardAvoidingView style={styles.container}>
      <View style={styles.imageBox}>
        <Image style={styles.backgroundImage} source={require('../assets/background.jpg')} />
      </View>
      <View style={styles.textContainer}>
        <Image style={styles.buttonImage1} source={require('../assets/themIcon.jpg')} />
        <Text style={{ color: 'blue', fontWeight: 'bold', fontSize: 25, padding: 5 }}>
          Thêm Nhân Viên
        </Text>
      </View>

      <SafeAreaView style={{ borderWidth: 1, width: '90%', justifyContent: 'center', alignItems: 'center', zIndex: 0 }}>
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
        <View style={styles.input}>
          <Picker
            selectedValue={selectedChucVu}
            onValueChange={(itemValue) => setSelectedChucVu(itemValue)} >
            {renderChucVuItems()}
          </Picker>
        </View>
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
            <Button style={styles.box} title="Thêm" onPress={handleAddNhanVien} />
          </View>
        </View>
      </SafeAreaView>
    </KeyboardAvoidingView>
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
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    width: '50%',
    position: 'relative',
    margin: 5,
  },
  pickerContainer: {
    borderWidth: 1,
    width: '60%',
    justifyContent: 'space-between'
  },
  buttonImage: {
    width: 20,
    height: 20,
  },
  buttonImage1: {
    width: 40,
    height: 40,
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
  textContainer: {
    borderWidth: 1,
    borderColor: 'blue',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    position: 'relative',
    top: 0,
    left: "auto",
    right: '10%',
    margin: 10,
    flexDirection: 'row',
    marginBottom: -10,
    zIndex: 1,
    backgroundColor: 'white'
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
  box: {},
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
