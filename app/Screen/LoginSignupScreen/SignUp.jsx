import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity,Image } from 'react-native';
import arrEmployee from '../../Model/ArrEmployee' // Import class ArrEmployee
import Employee from '../../Model/Employee';
import { ar } from 'date-fns/locale/ar';

const RegisterScreen = ({ navigation }) => {
  const [maNV, setMaNV] = useState('');
  const [tenNV, setTenNV] = useState('');
  const [soDT, setSoDT] = useState('');
  const [pass, setPass] = useState('');
  const [mqtv, setQTV] = useState('');
  const [selectedOption, setSelectedOption] = useState('user');
  

 arrEmployee.getAllEmployees();


 const handleAddEmployee = () => {
    
  if (maNV && tenNV && soDT && pass && selectedOption) {
    if (selectedOption === 'admin' && mqtv !== '123') { // Kiểm tra nếu quyền là admin và mã giới thiệu không phù hợp
      alert('Mã giới thiệu của quản trị viên không hợp lệ!');
      return;
    }

    arrEmployee.addEmployee(maNV, pass, tenNV, soDT, selectedOption);

    setMaNV('');
    setTenNV('');
    setSoDT('');
    setPass('');
    setSelectedOption('');
    setQTV('');
  }

  };
 const handleLogin1 = () => {
    navigation.navigate('Login')
  };
  return (
    <View style={styles.container}>
    
      <View style={styles.inputContainer}>
      <Image source={require('../../../assets/logo.png')} style={styles.logo} />
      <Text style={styles.title}>STT: 9 -Vũ Văn Đức - Nhóm 8</Text>
       <Text style={styles.title}>Đăng ky</Text>
        <TextInput
          placeholder="Mã NV"
          value={maNV}
          onChangeText={text => setMaNV(text)}
          style={styles.input}
        />
        <TextInput
          placeholder="Mật khẩu"
          value={pass}
          onChangeText={text => setPass(text)}
          style={styles.input}
          secureTextEntry
        />
        <TextInput
          placeholder="Tên NV"
          value={tenNV}
          onChangeText={text => setTenNV(text)}
          style={styles.input}
        />
        <TextInput
          placeholder="Số ĐT"
          value={soDT}
          onChangeText={text => setSoDT(text)}
          style={styles.input}
        />
        <View style={styles.radioContainer}>
          <Text style={styles.radioLabel}>Quyền:</Text>
          <TouchableOpacity
            style={[styles.radioButton, selectedOption === 'admin' && styles.radioButtonSelected]}
            onPress={() => setSelectedOption('admin')}>
            <Text style={styles.radioText}>Admin</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.radioButton, selectedOption === 'user' && styles.radioButtonSelected]}
            onPress={() => setSelectedOption('user')}>
            <Text style={styles.radioText}>User</Text>
          </TouchableOpacity>
          
        </View>
        <TextInput
          placeholder="Mã giới thiệu của quản trị viên"
          value={mqtv}
          onChangeText={text => setQTV(text)}
          style={styles.input}
        />
        <Button title="Đăng ký" onPress={handleAddEmployee} />
         <Text style={styles.text}  onPress={handleLogin1} >Đăng nhập</Text>
        
        
 
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
   title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
   logo: {
    width: 300,
    height: 150,
    marginBottom: 20,
  },
   text: {
    fontSize: 16,
    color: '#333',
    marginLeft: 150,
    marginTop: 50,
  },
  radioContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  radioLabel: {
    marginRight: 10,
  },
  radioButton: {
    borderWidth: 1,
    borderColor: 'gray',
    padding: 10,
    borderRadius: 5,
    marginRight: 10,
  },
  radioButtonSelected: {
    backgroundColor: 'lightblue',
  },
  radioText: {
    fontSize: 16,
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  inputContainer: {
    marginBottom: 10,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
});

export default RegisterScreen;
