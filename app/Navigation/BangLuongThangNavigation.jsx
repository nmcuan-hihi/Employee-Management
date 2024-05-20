import { createStackNavigator } from '@react-navigation/stack';
import BangLuongThang from '../Screen/BangLuongThangScreen/BangLuongThang';
import ChiTietLuongThang from '../Screen/BangLuongThangScreen/ChiTietLuongThang';



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

        
    </Stack.Navigator>
  )
}
