import { View, Text } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import Manager from '../Screen/Manager';
import MarkAttendance from '../Screen/MarkAttendance';


const Stack = createStackNavigator();
export default function HomeNavigation() {
  return (
    <Stack.Navigator
    screenOptions={{
        headerShown: false,
    }}
    // screenOptions={({ route }) => ({
    //     headerShown: route.name !== 'home',
    //   })}
    >
        <Stack.Screen name='manager' component={Manager}/>
        <Stack.Screen name='attendance' component={MarkAttendance}/>
        {/* <Stack.Screen name='infodetail' component={InfoDetail}/> */}
    </Stack.Navigator>
  )
}