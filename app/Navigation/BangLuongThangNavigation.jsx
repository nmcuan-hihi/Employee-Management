import { createStackNavigator } from '@react-navigation/stack';
import BangLuongThang from '../Screen/BangLuongThangScreen/BangLuongThang';
import ChiTietLuongThang from '../Screen/BangLuongThangScreen/ChiTietLuongThang';
import exportToExcel from '../Screen/BangLuongThangScreen/XuatFileExcel';


const Stack = createStackNavigator();

export default function BangLuongThangNavigation() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name='BangLuongThang' component={BangLuongThang}/>
      <Stack.Screen name='ChiTietLuongThang' component={ChiTietLuongThang}/>
      <Stack.Screen name='XuatFileExcel' component={exportToExcel}/>
        
    </Stack.Navigator>
  )
}
