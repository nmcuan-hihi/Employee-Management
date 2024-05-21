import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import FlashMessage from 'react-native-flash-message';
import Login from './app/Screen/LoginSignupScreen/Login';
import RegisterScreen from './app/Screen/LoginSignupScreen/SignUp';
import TabNavigation from './app/Navigation/TabNavigation';
import User from './app/Screen/UserScreen/User';

const Stack = createStackNavigator();

export default function App() {
  return (
    <View style={styles.container}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
          <Stack.Screen name="Register" component={RegisterScreen} options={{ headerShown: false }} />
           {/* man hinh của quản lý */}
          <Stack.Screen name="Manager" component={TabNavigation} options={{ headerShown: false }} />

          {/* màn hình của nhân viên  */}
          <Stack.Screen name="User" component={User} options={{ headerShown: false }} />

        </Stack.Navigator>  
      </NavigationContainer>
      <FlashMessage style={{ marginTop: 35 }} position="top" />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 35,
  },
});
