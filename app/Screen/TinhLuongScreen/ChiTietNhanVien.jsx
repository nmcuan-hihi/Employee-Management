import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';

export default function ChiTietNhanVien({ route }) {
  const { employee } = route.params;
  const navigation = useNavigation();

  const handlePrint = () => {
    navigation.navigate('PrintEmployee', { employee });
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#7F7FD5', '#ffffff']}
        style={styles.gradientContainer}
      >
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
        <TouchableOpacity
          onPress={handlePrint}
          style={[styles.printButton, { backgroundColor: '#FF6A6A', width: 100, height: 50,justifyContent: 'center', alignItems: 'center' }]}
        >
          <Text style={styles.printButtonText}>In</Text>
        </TouchableOpacity>
      </LinearGradient>
    </View>
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
    fontSize: 24,
    fontWeight: 'bold',
    color: 'blue',
    textAlign: 'center',
  },
  infoContainer: {
    borderWidth: 1,
    borderColor: '#ccc',
    width: '90%',
    padding: 20,
    borderRadius: 10,
    backgroundColor: '#fff',
    marginBottom: 20,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
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

