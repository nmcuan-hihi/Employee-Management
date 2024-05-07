import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Manager from './app/Screen/Manager';
import { NavigationContainer } from '@react-navigation/native';
import TabNavigation from './app/Navigation/TabNavigation';
import FlashMessage from 'react-native-flash-message';




export default function App() {
  return (
   <View style={styles.container}>
      <NavigationContainer>
        <TabNavigation/>
        <FlashMessage style={{marginTop:35}} position="top" />
      </NavigationContainer>   
     <StatusBar style="auto" />
     </View>
  );
}
const styles = StyleSheet.create({
  container:{
    paddingTop: 35,
    height: '100%',
  }
});
