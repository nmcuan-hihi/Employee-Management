import { createStackNavigator } from '@react-navigation/stack';
import DanhSach from '../Screen/TinhLuongScreen/DanhSach';
import ChiTietNhanVien from '../Screen/TinhLuongScreen/ChiTietNhanVien';
import PrintEmployee from '../Screen/TinhLuongScreen/PrintEmployee';
import CrudDanhSach from '../Screen/CrudScreen/CurdDanhSach';
import Them from '../Screen/CrudScreen/Them';
import Edit from '../Screen/CrudScreen/Edit';


const Stack = createStackNavigator();

export default function CrudNavigation() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name='CrudDanhSach' component={CrudDanhSach}/>
      <Stack.Screen name='Them' component={Them}/>    
      <Stack.Screen name='Edit' component={Edit}/>
      {/* <Stack.Screen name='attendance' component={MarkAttendance}/>
      
      <Stack.Screen name='test' component={TestScreen}/>
      <Stack.Screen name='tableattendance' component={ViewTableAttendance}/> */}
    </Stack.Navigator>
  )
}
