import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Image } from 'react-native';
import ArrEmployee from '../../Model/ArrEmployee';
import { useNavigation } from '@react-navigation/native';

const Login = () => {
    const navigation = useNavigation();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [employees, setEmployees] = useState([]);
    const arrEmployee = new ArrEmployee();

    // Function to fetch latest employees data
    const fetchLatestEmployees = async () => {
        try {              
            const data = await arrEmployee.getArremployeeAPI();
            setEmployees(data);
        } catch (err) {
            setError('Failed to fetch employees');
        } 
    };

    // Fetch latest employees data on component mount
    useEffect(() => {
        fetchLatestEmployees();
    }, []);

    const handleLogin = () => {
        // Fetch latest employees data before login
        fetchLatestEmployees();

        const employee = employees.find(emp => emp.maNV === username);

        if (employee && employee.pass === password) {
            if (employee.quyen === 'admin') {
                navigation.push('Manager');
            } else if (employee.quyen === 'user') {
                navigation.push('User',{ username: username });
            }
        } else {
            setError('Mã nhân viên hoặc mật khẩu không đúng');
            alert('Mã nhân viên hoặc mật khẩu không đúng');
        }
    };

    const handleRegister = () => {
        navigation.navigate('Register');
    };
  

    return (
        <View style={styles.container}>
            <Image source={require('../../../assets/logo.png')} style={styles.logo} />
            <Text style={styles.title}>STT: 9 - Vũ Văn Đức - Nhóm 8</Text>
            <Text style={styles.title}>Đăng nhập</Text>
            {error ? <Text style={styles.error}>{error}</Text> : null}
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
            <Text style={styles.text} onPress={handleRegister}>Chưa có tài khoản? Đăng ký</Text>
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
    error: {
        color: 'red',
        marginBottom: 20,
    },
});

export default Login;
