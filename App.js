import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { EmployeeProvider } from './EmployeeContext';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import DanhSach from './View/danhsach';
import Them from './View/them';
import Edit from './View/edit';
import { Image } from 'react-native';
import StackNav from './StackNav';

const Tab = createBottomTabNavigator();

function MyTab() {
  return( 
    <Tab.Navigator screenOptions={{headerShown:false}}>
      <Tab.Screen 
        name="Danh Sách" 
        component={StackNav} 
        options={{
          tabBarIcon: ({ focused }) => (
            <Image
              source={focused ? require('./assets/danhSach.png') : require('./assets/danhSach.png')} 
              style={{ width: 28, height: 28 }} 
            />
          ),
        }}
      />
      <Tab.Screen 
        name="Thêm" 
        component={Them} 
        options={{
          tabBarIcon: ({ focused }) => (
            <Image
              source={focused ? require('./assets/themNav.png') : require('./assets/themNav.png')}
              style={{ width: 28, height: 28 }} 
            />
          ),
        }}
      />
      {/* <Tab.Screen 
        name="Edit" 
        component={StackNav} 
        options={{
          tabBarIcon: ({ focused }) => (
            <Image
              source={focused ? require('./assets/delete.png') : require('./assets/delete.png')}
              style={{ width: 24, height: 24 }} 
            />
          ),
        }}
      /> */}
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <EmployeeProvider>
      <NavigationContainer>
        <MyTab/>
      </NavigationContainer>
    </EmployeeProvider>
  );
}
