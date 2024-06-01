import React, { useEffect, useState, useCallback } from 'react';
import { Ionicons, FontAwesome5 } from '@expo/vector-icons';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Alert, Image } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import ArrEmployee from '../../Model/ArrEmployee';

const arrEmployee = new ArrEmployee();

const CrudDanhSach = () => {
  const navigation = useNavigation();
  const [nhanViens, setNhanViens] = useState([]);

  const fetchEmployees = async () => {
    const employees = await arrEmployee.getArremployeeAPI();
    setNhanViens(employees);
  };

  useFocusEffect(
    useCallback(() => {
      fetchEmployees();
    }, [])
  );

  const handleDeleteNhanVien = async (maNV) => {
    Alert.alert(
      'Xác nhận xóa',
      `Bạn có chắc chắn muốn xóa nhân viên có mã ${maNV} không?`,
      [
        {
          text: 'Hủy',
          style: 'cancel',
        },
        {
          text: 'Xóa',
          onPress: async () => {
            const result = await arrEmployee.deleteEmployee(maNV);
            if (result) {
              fetchEmployees();
            } else {
              fetchEmployees();
              Alert.alert('Xóa nhân viên thành công.');
            }
          },
        },
      ],
      { cancelable: false }
    );
  };

  const getInitial = (name) => {
    return name ? name.charAt(0).toUpperCase() : '?';
  };

  const renderEmployeeItem = ({ item }) => (
    <View key={item.maNV} style={styles.employeeItem}>
      <View style={[styles.initialCircle, { backgroundColor: '#8a2be2' }]}>
        <Text style={styles.initialText}>{getInitial(item.tenNV)}</Text>
      </View>
      <View style={{ flexDirection: 'column', flex: 1 }}>
        <Text style={{ marginBottom: 5, fontWeight: 'bold', color: 'black' }}>{item.maNV}</Text>
        <Text style={{ color: 'black' }}>{item.tenNV}</Text>
      </View>
      <TouchableOpacity onPress={() => navigation.push('Edit', { ma: item.maNV })}>
        <FontAwesome5 name="edit" size={24} color="black" />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => handleDeleteNhanVien(item.maNV)}>
        <Ionicons name="remove-circle-outline" size={24} color="black" />
      </TouchableOpacity>
    </View>
  );

  return (
    <LinearGradient colors={['#7F7FD5', '#E9E4F0']} style={{ flex: 1 }}>
      <View style={styles.container}>
        <View style={styles.imageBox}>
          <Image style={styles.backgroundImage} source={require('../../../assets/logo.png')} />
        </View>
        <View style={styles.header}>
          <Text style={styles.headerText}>Thông Tin Nhân Viên</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Them')}>
            <Ionicons name="person-add" size={34} color="blue" />
          </TouchableOpacity>
        </View>
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
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  header: {
    width: '95%',
    borderWidth: 1,
    borderColor: 'blue',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 10,
    flexDirection: 'row',
    padding: 10,
    backgroundColor: 'white',
    borderRadius: 10,
  },
  imageBox: {
    width: '100%',
    alignItems: 'center',
    marginVertical: 20,
  },
  backgroundImage: {
    width: '50%',
    height: '15%',
    resizeMode: 'contain',
  },
  headerText: {
    color: 'blue',
    fontWeight: 'bold',
    fontSize: 25,
  },
  flatlistContainer: {
    width: '95%',
    flex: 1,
    padding: 5,
  },
  employeeItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    marginVertical: 5,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    backgroundColor: 'white',
  },
  initialCircle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  initialText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default CrudDanhSach;
