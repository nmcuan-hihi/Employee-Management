import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Image, TouchableOpacity } from 'react-native';
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
                navigation.push('UserNavigation',{ username: username });
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
            <TouchableOpacity style={styles.button} onPress={handleLogin}>
                <Text style={styles.buttonText}>Đăng nhập</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleRegister}>
                <Text style={styles.text}>Chưa có tài khoản? Đăng ký</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    logo: {
        width: 200,
        height: 100,
        marginBottom: 20,
    },
    container: {
        flex: 1,
        backgroundColor: '#f0f0f0', // Set the background color here
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
        height: 50,
        width: '100%',
        borderColor: 'blue',
        borderWidth: 1,
        marginBottom: 20,
        paddingHorizontal: 10,
        borderRadius: 5,
    },
    button: {
        backgroundColor: 'blue',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 18,
    },
    text: {
        fontSize: 16,
        color: 'blue',
        marginTop: 10,
    },
    error: {
        color: 'red',
        marginBottom: 20,
    },
});

export default Login;
