import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity, Image } from 'react-native';
import ArrEmployee from '../../Model/ArrEmployee'; // Import class ArrEmployee
import * as ImagePicker from 'expo-image-picker';

const RegisterScreen = ({ navigation }) => {
  const [maNV, setMaNV] = useState('');
  const [tenNV, setTenNV] = useState('');
  const [soDT, setSoDT] = useState('');
  const [pass, setPass] = useState('');
  const [mqtv, setQTV] = useState('');
  const arrEmployee = new ArrEmployee();
  const [error, setError] = useState('');
  const [employees, setEmployees] = useState([]);
  const [selectedOption, setSelectedOption] = useState('user');
  const [selectedImage, setSelectedImage] = useState('');

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const data = await arrEmployee.getArremployeeAPI();
        setEmployees(data);
      } catch (err) {
        setError('Failed to fetch employees');
      }



    };



    fetchEmployees();
  }, []);

  const chooseImage = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });

      if (!result.cancelled) {
        setSelectedImage(result);
        console.log(result)
      }
    } catch (error) {
      console.log('Lỗi khi chọn ảnh từ thư viện:', error);
    }
  };

  const takePhoto = async () => {
    try {
      let result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });

      if (!result.cancelled) {
        setSelectedImage(result);
      }
    } catch (error) {
      console.log('Lỗi khi chụp ảnh:', error);
    }
  };



  const handleAddEmployee = async () => {
    if (maNV && tenNV && soDT && pass && selectedOption) {
      if (selectedOption === 'admin' && mqtv !== '123') {
        alert('Mã giới thiệu của quản trị viên không hợp lệ!');
        return;
      }

      const success = await arrEmployee.addEmployee(maNV, pass, tenNV, soDT, selectedOption, '', '', 0, selectedImage.assets[0].uri);

      if (success) {
        setMaNV('');
        setTenNV('');
        setSoDT('');
        setPass('');
        setSelectedOption('user');
        setQTV('');
        alert('Đăng ký thành công!');
        navigation.navigate('Login'); // Chuyển đến màn hình đăng nhập sau khi đăng ký thành công
      } else {
        alert('Đăng ký thất bại!');
      }
    } else {
      alert('Vui lòng điền đầy đủ thông tin!');
    }
  };

  const handleLogin1 = () => {
    navigation.navigate('Login');
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <Image source={require('../../../assets/logo.png')} style={styles.logo} />
        <Text style={styles.title}>Đăng ký</Text>

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

        <View style={styles.image}>
          <View>

            <View style={styles.buttonContainer}>
              <Button title="Chọn ảnh" onPress={chooseImage} />
            </View>
            <View style={styles.buttonContainer}>
              <Button title="Chụp ảnh" onPress={takePhoto} />
            </View>
          </View>
          {selectedImage?.assets && selectedImage.assets.length > 0 && (
            <Image source={{ uri: selectedImage.assets[0].uri }} style={styles.selectedImage} />
          )}
        </View>
       


        <View style={styles.radioContainer}>
          <Text style={styles.radioLabel}>Quyền:</Text>
          <TouchableOpacity
            style={[styles.radioButton, selectedOption === 'admin' && styles.radioButtonSelected]}
            onPress={() => setSelectedOption('admin')}
          >
            <Text style={styles.radioText}>Admin</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.radioButton, selectedOption === 'user' && styles.radioButtonSelected]}
            onPress={() => setSelectedOption('user')}
          >
            <Text style={styles.radioText}>User</Text>
          </TouchableOpacity>
        </View>
        {selectedOption === 'admin' && (
          <TextInput
            placeholder="Mã giới thiệu của quản trị viên"
            value={mqtv}
            onChangeText={text => setQTV(text)}
            style={styles.input}
          />
        )}
        <Button title="Đăng ký" onPress={handleAddEmployee} />
        <Text style={styles.text} onPress={handleLogin1}>Đăng nhập</Text>
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
  buttonContainer: {
    width: 100,
    margin: 10,
  },
  image: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  selectedImage: {
    width: 100,
    height: 100,
    marginTop: 10,
    resizeMode: 'cover',
  },
  logo: {
    width: 200,
    height: 100,
    marginBottom: 20,
  },
  text: {
    fontSize: 16,
    color: 'blue',
    marginTop: 20,
  },
  radioContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  radioLabel: {
    marginRight: 10,
    fontSize: 16,
  },
  radioButton: {
    borderWidth: 1,
    borderColor: 'blue',
    paddingVertical: 10,
    paddingHorizontal: 20,
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
    backgroundColor: '#f0f0f0', // Background color adjusted
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  inputContainer: {
    marginBottom: 20,
  },
  input: {
    height: 50, // Increased height
    borderColor: 'blue', // Adjusted border color
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
});


export default RegisterScreen;
