import React from 'react';
import { Text } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FontAwesome } from '@expo/vector-icons';
import BangLuongThangUser from '../Screen/UserScreen/BangLuongUser';
import User from '../Screen/UserScreen/User';

const Tab = createBottomTabNavigator();

export default function TabNavigation({ route }) {
  const { username } = route.params; // Lấy thông tin username từ route.params

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: 'purple',
        tabBarInactiveTintColor: 'black',
      }}
    >
      <Tab.Screen
        name="User"
        component={User}
        options={{
          tabBarLabel: ({ color }) => (
            <Text style={{ color: color, fontSize: 15, marginTop: -7 }}>
              Thông tin
            </Text>
          ),
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="user" size={24} color={color} />
          ),
        }}
        initialParams={{ username: username }} // Truyền thông tin username cho màn hình User
      />
      <Tab.Screen
        name="bangluongUser"
        component={BangLuongThangUser}
        options={{
          tabBarLabel: ({ color }) => (
            <Text style={{ color: color, fontSize: 15, marginTop: -7 }}>
              Bảng lương
            </Text>
          ),
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="dollar" size={24} color={color} />
          ),
        }}
        initialParams={{ username: username }} // Truyền thông tin username cho màn hình BangLuongThangNavigation
      />
    </Tab.Navigator>
  );
}