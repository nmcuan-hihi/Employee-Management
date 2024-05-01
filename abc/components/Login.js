  import React, { useState } from 'react';
  import { View, Text, TextInput, Button, StyleSheet,Image} from 'react-native';
  import arrEmployee from './ArrEmployee'


  const Login = ({ navigation, route }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { arrEmployee } = route.params || {}; // Sử dụng toán tử OR để mặc định cho trường hợp params không được định nghĩa
    

  const handleLogin = () => {
  const employee = arrEmployee.getEmployeeByMaNV(username);
  if (employee && employee.pass === password) {
    if (employee.quyen === 'admin') {
      navigation.navigate('EmployeeManagement', { arrEmployee });
    } else if (employee.quyen === 'user') {
      navigation.navigate('ThongTinNhanVien', { username, arrEmployee }); // Truyền tên đăng nhập
    }
  } else {
    setError('Mã nhân viên hoặc mật khẩu không đúng');
    alert(error+'')
  }
};


    const handleLogin1 = () => {
      navigation.navigate('Register');
    };

    return (
      <View style={styles.container}>
      <Image source={require('../assets/logo.png')} style={styles.logo} />
        <Text style={styles.title}>Đăng nhập</Text>
        <TextInput
          style={styles.input}
          placeholder="Tên đăng nhập"
          value={username}
          onChangeText={setUsername}
        />
        <TextInput
          style={styles.input}
          placeholder="Mật khẩu"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        <Button title="Đăng nhập" onPress={handleLogin} />
        <Text style={styles.text} onPress={handleLogin1}>Chưa có tài khoản? Đăng ký</Text>
      </View>
    );
  };

  const styles = StyleSheet.create({
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
    container: {
      flex: 1,
      backgroundColor: 'white',
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: 20,
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 20,
    },
    input: {
      height: 40,
      width: '100%',
      borderColor: 'gray',
      borderWidth: 1,
      marginBottom: 20,
      paddingHorizontal: 10,
    },
  });

  export default Login;
