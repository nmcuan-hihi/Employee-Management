import React from 'react';
import { View, Text, StyleSheet ,Image} from 'react-native';

export default function PrintEmployee({ route }) {
  const { employee } = route.params;

  return (
    <View style={styles.container}>
        <View style={styles.imageBox}>
        <Image style={styles.backgroundImage} source={require('../../../assets/logo.png')} />
      </View>
      <Text style={styles.header}>Thông Tin Nhân Viên</Text>
      <View style={styles.infoContainer}>
        <View style={styles.labelContainer}>
          <Text style={styles.label}>Mã nhân viên:</Text>
        </View>
        <Text style={styles.text}>{employee.maNV}</Text>
      </View>
      <View style={styles.infoContainer}>
        <View style={styles.labelContainer}>
          <Text style={styles.label}>Tên nhân viên:</Text>
        </View>
        <Text style={styles.text}>{employee.tenNV}</Text>
      </View>
      <View style={styles.infoContainer}>
        <View style={styles.labelContainer}>
          <Text style={styles.label}>Chức vụ:</Text>
        </View>
        <Text style={styles.text}>{employee.tenChucVu}</Text>
      </View>
      <View style={styles.infoContainer}>
        <View style={styles.labelContainer}>
          <Text style={styles.label}>Số điện thoại:</Text>
        </View>
        <Text style={styles.text}>{employee.soDT}</Text>
      </View>
      <View style={styles.infoContainer}>
        <View style={styles.labelContainer}>
          <Text style={styles.label}>Lương ngày:</Text>
        </View>
        <Text style={styles.text}>{employee.mucLuong}</Text>
      </View>
      {/* Hiển thị các thông tin khác của nhân viên nếu cần */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  imageBox:{

  },
  header: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  backgroundImage:{
       width: 400,
       height: 200,

  },
  infoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    flexWrap: 'nowrap', // Ngăn các từ bị xuống dòng
  },
  labelContainer: {
    width: 120,
  },
  label: {
    fontWeight: 'bold',
    fontSize: 20,
  },
  text: {
    flex: 1,
    fontSize: 20,
    textAlign: 'right',
  },
});
