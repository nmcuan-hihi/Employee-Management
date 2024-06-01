import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function ChiTietNhanVien({ route }) {
  const { employee } = route.params;
  const navigation = useNavigation();

  const handlePrint = () => {
    navigation.navigate('PrintEmployee', { employee });
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image style={styles.logo} source={require('../../../assets/logo.png')} />
        <Text style={styles.headerText}>Thông Tin Nhân Viên: {employee.tenNV}</Text>
      </View>
      <View style={styles.infoContainer}>
        <View style={styles.infoRow}>
          <Text style={styles.label}>Mã nhân viên:</Text>
          <Text style={styles.text}>{employee.maNV}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.label}>Tên nhân viên:</Text>
          <Text style={styles.text}>{employee.tenNV}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.label}>Chức vụ:</Text>
          <Text style={styles.text}>{employee.tenChucVu}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.label}>Số điện thoại:</Text>
          <Text style={styles.text}>{employee.soDT}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.label}>Lương cơ bản:</Text>
          <Text style={styles.text}>{employee.mucLuong} vnđ</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.label}>Tổng giờ làm:</Text>
          <Text style={styles.text}>{employee.gioCong} giờ</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.label}>Tổng lương:</Text>
          <Text style={styles.text}>{employee.tongLuong} vnđ</Text>
        </View>
      </View>
      <TouchableOpacity onPress={handlePrint} style={styles.printButton}>
        <Text style={styles.printButtonText}>In</Text>
      </TouchableOpacity>
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
    alignItems: 'center',
    marginBottom: 20,
  },
  logo: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
    marginBottom: 10,
  },
  headerText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'blue',
  },
  infoContainer: {
    borderWidth: 1,
    borderColor: '#ccc',
    width: '90%',
    padding: 10,
    borderRadius: 10,
    marginBottom: 20,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  label: {
    fontWeight: 'bold',
    fontSize: 18,
    color: 'blue',
  },
  text: {
    fontSize: 18,
    color: 'black',
  },
  printButton: {
    backgroundColor: 'green',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  printButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
