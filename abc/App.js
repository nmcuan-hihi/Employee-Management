import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './components/Login';
import RegisterScreen from './components/Dangky';
import EmployeeManagement from './components/Nhanvien';
import ThongTinNhanVien from './components/ThongTinChiTiet'
import arrEmployee from './components/ArrEmployee'

const Stack = createNativeStackNavigator();
arrEmployee.getAllEmployees
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="EmployeeManagement" component={EmployeeManagement} />
        <Stack.Screen name="ThongTinNhanVien" component={ThongTinNhanVien} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
