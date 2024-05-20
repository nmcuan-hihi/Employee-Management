import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet, FlatList, ScrollView } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import axios from 'axios';



const TestScreen = () => {
  const [selectedValue, setSelectedValue] = useState();
  const [arrEmployee, setArrEmployee] = useState([]);
  useEffect(() => {
    getArremployee();
  }, []);

  const getArremployee = async () => {
    try {
      const response = await axios.get('http://10.0.2.2:8080/employee/getAll');
      setArrEmployee(response.data);
      console.log(response.data);
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Failed to fetch class list. Please try again!');
    }
  };
  return (
    <View style={styles.container}>
      {/* <Picker
        selectedValue={selectedValue}
        onValueChange={(itemvalue, index) =>

          setSelectedValue(itemvalue)
        }>
        <Picker.Item label='adsfdsf' value="dsfasdf" />
        <Picker.Item label='sdfgd' value="sdfd" />
      </Picker> */}


      <Picker
        selectedValue={selectedValue}
        onValueChange={(itemvalue, index) =>
          setSelectedValue(itemvalue)
        }>
        {arrEmployee.map((item) => (
          <Picker.Item key={item.maNV} label={item.tenNV} value={item.maNV} />
        ))}
      </Picker>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },

});

export default TestScreen;
