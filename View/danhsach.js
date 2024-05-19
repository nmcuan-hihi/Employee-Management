import React, { useEffect, useState } from 'react';

import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useNavigation } from '@react-navigation/native';

import quanLi from '../quanli';
import QuanLiChucVu from '../quanliChucVu';

export default function DanhSach() {
  const navigation = useNavigation();

  const [nhanViens, setNhanViens] = useState([]);
  //const [message, setMessage] = useState('');
  const [chucVus, setChucVus] = useState('');
  const qlChucVu = new QuanLiChucVu();



  useEffect(() => {
    //const employees = quanLi.displayEmployees();
    updateEmployeeData()
    setChucVus([...qlChucVu.displayChucVu()])
    //setNhanViens([...quanLi.displayEmployees()])
  }, []);

  const updateEmployeeData = () => {
    const employees = quanLi.displayEmployees();
    setNhanViens(employees);
  };

  const handleDeleteNhanVien = (maNv) => {
    const employee = quanLi.findEmployeeById(maNv);
    if (employee) {
      Alert.alert(
        'Xác nhận xóa',
        `Bạn có chắc chắn muốn xóa nhân viên ${employee.tenNv} không?`,
        [
          {
            text: 'Hủy',
            style: 'cancel',
          },
          {
            text: 'Xóa',
            onPress: () => {
              quanLi.deleteNhanVien(maNv);
              updateEmployeeData();
             // setMessage('Xóa thành công');
            },
          },
        ],
        { cancelable: false }
      );
    } else {
      setMessage(`Không tìm thấy nhân viên có mã ${maNv}`);
    }
  };

  // const handleEditNhanVien = (maNv) => {
  //   // const nv = maNv.toString()
  //   // console.log("=="+nv)
  //   // const nhanVien = quanLi.findEmployeeById()
  //   // if (nhanVien) {
  //   //   navigation.navigate('Edit', { nhanVien: {...nhanVien, tenChucVu: nhanVien.tenChucVu} });
  //   // } else {
  //   //   setMessage(`Không tìm thấy nhân viên có mã ${maNv}`);
  //   //   console.log('k tim thấy')

  //   // }
  //  // navigation.navigate('Edit', { nhanVien: maNv });
  // };
  


  

  const renderEmployeeItem = ({ item }) => (
    <View key={item.maNv} style={styles.employeeItem}>
      <Text>{item.maNv}</Text>
      <Text>{item.tenNv}</Text>
      <Text>{item.tenChucVu}</Text>
      <TouchableOpacity 
      onPress={()=>navigation.push('navedit', {ma:item.maNv})}
      >
        <Image style={styles.buttonImage} source={require('../assets/edit.png')} />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => handleDeleteNhanVien(item.maNv)}>
        <Image style={styles.buttonImage} source={require('../assets/delete.png')} />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* <Text>{message}</Text> */}
      <View style={styles.imageBox}>
        <Image style={styles.backgroundImage} source={require('../assets/background.jpg')} />
      </View>
      <View style={styles.header}>
        <Text style={styles.headerText}>Thông Tin Nhân Viên</Text>
      </View>
      <View style={styles.flatlistContainer}>
        <FlatList
          style={styles.flatlist}
          data={nhanViens}
          renderItem={renderEmployeeItem}
          keyExtractor={item => item.maNv}
        />
        <StatusBar style="auto" />
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
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
    right: '15%'
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
  headerText: {
    color: 'blue',
    fontWeight: 'bold',
    fontSize: 25,
    padding: 5,
  },
  flatlistContainer: {
    borderWidth: 1,
    width: '95%',
    justifyContent: 'center',
    alignItems: 'center',
    height: '60%',
    padding: 3,
  },
  employeeItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 13,
    margin: 5,
    borderWidth: 1,
    width: '100%',
    borderColor: '#ccc',
    fontSize: 25,
  },
  buttonImage: {
    width: 20,
    height: 20,
  },
});