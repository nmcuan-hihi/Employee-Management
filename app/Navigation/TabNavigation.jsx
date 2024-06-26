import { View, Text } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FontAwesome } from '@expo/vector-icons';
import Manager from '../Screen/Manager';
import EmployeeManagement from '../Screen/EmployeeManagement';
const Tab = createBottomTabNavigator();
export default function TabNavigation() {
    return (
        <Tab.Navigator screenOptions={{
            headerShown: false,
            tabBarActiveTintColor: 'purple',
            tabBarInactiveTintColor: 'black',
        }}>
            <Tab.Screen name='home' component={Manager}
                options={{
                    tabBarLabel: ({ color }) => (
                        <Text style={{ color: color, fontSize: 15, marginTop: -7 }}>Home</Text>
                    ),
                    tabBarIcon: ({ color, size }) => (
                        <FontAwesome name="home" size={24} color={color} />
                    )
                }}

            />
            <Tab.Screen name='employee' component={EmployeeManagement} 
            options={{
                tabBarLabel: ({ color }) => (
                    <Text style={{ color: color, fontSize: 15, marginTop: -7 }}>List Emp</Text>
                ),
                tabBarIcon: ({ color, size }) => (
                    <FontAwesome name="users" size={24} color={color} />
                )
            }}
            />
            <Tab.Screen name='tab3' component={Manager}
            options={{
                tabBarLabel: ({ color }) => (
                    <Text style={{ color: color, fontSize: 15, marginTop: -7 }}>No value</Text>
                ),
                tabBarIcon: ({ color, size }) => (
                    <FontAwesome name="bookmark" size={24} color={color} />
                )
            }}
            />
        </Tab.Navigator>
    )
}