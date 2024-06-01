import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';

export default function PrintEmployee({ route }) {
  const { employee } = route.params;
  const navigation = useNavigation();

  return (
    <LinearGradient colors={["#7F7FD5", "#E9E4F0"]} style={styles.container}>
      <View style={styles.headerContainer}>
        <Image style={styles.logo} source={require('../../../assets/logo.png')} />
        <Text style={styles.header}>Thông Tin Nhân Viên</Text>
      </View>
      <View style={styles.infoBox}>
        <View style={styles.infoContainer}>
          <Text style={styles.label}>Mã nhân viên:</Text>
          <Text style={styles.text}>{employee.maNV}</Text>
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.label}>Tên nhân viên:</Text>
          <Text style={styles.text}>{employee.tenNV}</Text>
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.label}>Chức vụ:</Text>
          <Text style={styles.text}>{employee.tenChucVu}</Text>
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.label}>Số điện thoại:</Text>
          <Text style={styles.text}>{employee.soDT}</Text>
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.label}>Lương cơ bản:</Text>
          <Text style={styles.text}>{employee.mucLuong} VND</Text>
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.label}>Tổng giờ làm:</Text>
          <Text style={styles.text}>{employee.gioCong} giờ</Text>
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.label}>Tổng lương:</Text>
          <Text style={styles.text}>{employee.tongLuong} VND</Text>
        </View>
      </View>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Text style={styles.backButtonText}>Trở lại</Text>
      </TouchableOpacity>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  headerContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  logo: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
    borderRadius: 50,
    borderWidth: 2,
    borderColor: '#fff',
  },
  header: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 10,
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 10,
  },
  infoBox: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 10,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 5,
    marginBottom: 20,
  },
  infoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  label: {
    fontWeight: 'bold',
    fontSize: 18,
    color: '#333',
  },
  text: {
    fontSize: 18,
    color: '#555',
    textAlign: 'right',
  },
  backButton: {
    marginTop: 20,
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#4CAF50',
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 5,
  },
  backButtonText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },
});
