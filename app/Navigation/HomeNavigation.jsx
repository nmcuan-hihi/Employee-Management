import { createStackNavigator } from '@react-navigation/stack';
import Manager from '../Screen/Manager';
import MarkAttendance from '../Screen/MarkAttendance';
import ViewAttendanceSheet from '../Screen/ViewAttendanceSheet';
import TestScreen from '../Screen/TestScreen';
import TableAttendance from '../Compoment/TableAttendance';
import ViewTableAttendance from '../Screen/ViewTableAttendance';

const Stack = createStackNavigator();

export default function HomeNavigation() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name='manager' component={Manager}/>
      <Stack.Screen name='attendance' component={MarkAttendance}/>
      <Stack.Screen name='sheet' component={ViewAttendanceSheet}/>
      <Stack.Screen name='test' component={TestScreen}/>
      <Stack.Screen name='tableattendance' component={ViewTableAttendance}/>
    </Stack.Navigator>
  )
}