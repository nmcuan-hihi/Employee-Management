import React, { useState } from 'react';
import { View, Text, FlatList, TextInput, Button, StyleSheet } from 'react-native';
import ArrEmployee from '../Model/ArrEmployee'; 

const EmployeeManagement = () => {
  const [maNV, setMaNV] = useState('');
  const [tenNV, setTenNV] = useState('');
  const [soDT, setSoDT] = useState('');
  const [pass, setPass] = useState(''); 
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [arrEmployee, setArrEmployee] = useState(new ArrEmployee());
  const employees = arrEmployee.getAllEmployees();

  const handleAddEmployee = () => {
    if (maNV && tenNV && soDT && pass) {
      arrEmployee.addEmployee(maNV, pass, tenNV, soDT);
      setMaNV('');
      setTenNV('');
      setSoDT('');
      setPass('');
    }
  };

  const handleDeleteEmployee = (maNV) => {
    arrEmployee.deleteEmployee(maNV);
  };

  const handleEditEmployee = (employee) => {
    setSelectedEmployee(employee);
    setMaNV(employee.maNV);
    setTenNV(employee.tenNV);
    setSoDT(employee.soDT);
    setPass(employee.pass);
  };

  const handleUpdateEmployee = () => {
    if (selectedEmployee) {
      arrEmployee.deleteEmployee(selectedEmployee.maNV); // Xóa nv cu
      arrEmployee.addEmployee(maNV, pass, tenNV, soDT); // Thêm nv moi
      setSelectedEmployee(null); 
      setMaNV('');
      setTenNV('');
      setSoDT('');
      setPass('');
    }
  };

  const renderEmployeeItem = ({ item }) => (
    <View style={styles.employeeItem}>
      <Text>{item.maNV}</Text>
      <Text>{item.tenNV}</Text>
      <Text>{item.soDT}</Text>
      <Button title="Xóa" onPress={() => handleDeleteEmployee(item.maNV)} color="red" />
      <Button title="Sửa" onPress={() => handleEditEmployee(item)} />
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={employees}
        renderItem={renderEmployeeItem}
        keyExtractor={item => item.maNV}
        style={styles.flatList}
      />
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Mã NV"
          value={maNV}
          onChangeText={text => setMaNV(text)}
          style={styles.input}
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
        <TextInput
          placeholder="Mật khẩu"
          value={pass}
          onChangeText={text => setPass(text)}
          style={styles.input}
          secureTextEntry
        />
      <View>
      <Button title="Update" onPress={handleUpdateEmployee} />
    <Button title="Thêm nhân viên" onPress={handleAddEmployee} />
    </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  flatList: {
    marginBottom: 10,
  },
  employeeItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
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

export default EmployeeManagement;
