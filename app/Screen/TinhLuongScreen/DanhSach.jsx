import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet,Image,StatusBar } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import arrEmployee from '../../Model/ArrEmployee'


export default function DanhSach() {
  const navigation = useNavigation();  
 const employees = arrEmployee.getAllEmployees();
  useEffect(() => {
    updateEmployeeData();
  }, []);

  
   


  const renderEmployeeItem = ({ item }) => (
    <TouchableOpacity onPress={() => navigation.navigate('navChiTietNV', { employee: item })}>
      <View key={item.maNV} style={styles.employeeItem}>
        <Text>{item.maNV}</Text>
        <Text>{item.tenNV}</Text>
        <Text>{item.tenChucVu}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* <Text>{message}</Text> */}
      <View style={styles.imageBox}>
        <Image style={styles.backgroundImage}  source={require('../../../assets/logo.png')} />
      </View>
      <View style={styles.header}>
        <Text style={styles.headerText}>Thông Tin Nhân Viên</Text>
      </View>
      <View style={styles.flatlistContainer}>
      <FlatList
        style={styles.flatlist}
        data={employees}
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
