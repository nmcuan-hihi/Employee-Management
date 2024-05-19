import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, FlatList, ScrollView } from 'react-native';
import { Picker} from '@react-native-picker/picker';



const TestScreen = () => {
  const [selectedValue, setSelectedValue] = useState();
  return (
    <View style={styles.container}>
     

    <Picker
    selectedValue={selectedValue}
    onValueChange={(itemvalue, index) =>

      setSelectedValue(itemvalue)
    }>
      <Picker.Item label='adsfdsf' value="dsfasdf" />
      <Picker.Item label='sdfgd' value="sdfd" />
    </Picker>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
 
});

export default TestScreen;
