import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TextInput, Button, StyleSheet, TouchableOpacity } from 'react-native';

const EmployeeManagement = ({ route }) => {
  const [maNV, setMaNV] = useState('');
  const [tenNV, setTenNV] = useState('');
  const [soDT, setSoDT] = useState('');
  const [pass, setPass] = useState('');
  const [selectedOption, setSelectedOption] = useState('');
  const [employees, setEmployees] = useState([]);
  const { arrEmployee } = route.params;

  useEffect(() => {
    setEmployees(arrEmployee.getAllEmployees());
  }, []);

  const handleAddEmployee = () => {
    if (maNV && tenNV && soDT && pass && selectedOption) {
      arrEmployee.addEmployee(maNV, pass, tenNV, soDT, selectedOption);
      setMaNV('');
      setTenNV('');
      setSoDT('');
      setPass('');
      setSelectedOption('');
      setEmployees(arrEmployee.getAllEmployees());
    }
  };

  const handleDeleteEmployee = (maNV) => {
    arrEmployee.deleteEmployee(maNV); 
    setEmployees(arrEmployee.getAllEmployees());
  };

  const renderEmployeeItem = ({ item }) => (
    <View style={styles.employeeItem}>
      <Text>{item.maNV}</Text>
      <Text>{item.tenNV}</Text>
      <Text>{item.soDT}</Text>
      <Button title="Xóa" onPress={() => handleDeleteEmployee(item.maNV)} color="red" />
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
        <Button title="Thêm nhân viên" onPress={handleAddEmployee} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
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
