import { View, Text } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import DanhSach from './View/danhsach';
import Edit from './View/edit';




const Stack = createStackNavigator();
export default function StackNav() {
  return (
    <Stack.Navigator
    screenOptions={{
        headerShown: false,
    }}
    // screenOptions={({ route }) => ({
    //     headerShown: route.name !== 'home',
    //   })}
    >
        <Stack.Screen name='manager' component={DanhSach}/>
        <Stack.Screen name='navedit' component={Edit}/>     
    </Stack.Navigator>
  )
}