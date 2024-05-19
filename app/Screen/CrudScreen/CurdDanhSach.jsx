import React, { useEffect, useState } from 'react';
import { Ionicons,FontAwesome5  } from '@expo/vector-icons';
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { StatusBar } from 'expo-status-bar';

import { useNavigation } from '@react-navigation/native';
import chucVus from '../../Model/QuanLyChucVu';
import arrEmployee from '../../Model/ArrEmployee'
export default function CrudDanhSach() {
  const navigation = useNavigation();

 
  const nhanViens = arrEmployee.getAllEmployees();


  const handleDeleteNhanVien = (maNv) => {
    const employee = quanLi.findEmployeeById(maNv);
    if (employee) {
      Alert.alert(
        'Xác nhận xóa',
        `Bạn có chắc chắn muốn xóa nhân viên ${employee.tenNV} không?`,
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
    <View key={item.maNV} style={styles.employeeItem}>
      <Text>{item.maNV}</Text>
      <Text>{item.tenNV}</Text>
      <Text>{item.tenChucVu}</Text>
      <TouchableOpacity 
      onPress={()=>navigation.push('navedit', {ma:item.maNv})}
      >
        <FontAwesome5 name="edit" size={24} color="black" />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => handleDeleteNhanVien(item.maNv)}>
      <Ionicons name="remove-circle-outline" size={24} color="black" />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* <Text>{message}</Text> */}
      <View style={styles.imageBox}>
        <Image style={styles.backgroundImage} source={require('../../../assets/logo.png')} />
      </View>
      <View style={styles.header}>
        <Text style={styles.headerText}>Thông Tin Nhân Viên</Text>
       
      </View>
      <TouchableOpacity
         onPress={() => navigation.navigate('Them')
        }
      >
         <Ionicons name="person-add" size={34} color="blue" />
      </TouchableOpacity>
     
      <View style={styles.flatlistContainer}>
        <FlatList
          style={styles.flatlist}
          data={nhanViens}
          renderItem={renderEmployeeItem}
          keyExtractor={item => item.maNV}
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
    padding: 10,
    margin: 5,
    borderWidth: 1,
    width: '100%',
    borderColor: '#ccc',
    fontSize: 25,
    marginEnd:0,
  },
  buttonImage: {
    width: 20,
    height: 20,
    paddingEnd:3,
  },
});