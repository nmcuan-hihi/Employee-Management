import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import moment from 'moment';

const TestScreen = () => {
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [selectedTimeIn, setSelectedTimeIn] = useState(moment().format('HH:mm'));
  const [selectedTimeOut, setSelectedTimeOut] = useState(moment().format('HH:mm'));

  const showTimePickerFor = (type) => {
    setShowTimePicker(true);
    setTypeToPick(type);
  };

  const handleConfirm = (date) => {
    const selectedTime = moment(date).format('HH:mm');
    if (typeToPick === 'In') {
      setSelectedTimeIn(selectedTime);
    } else if (typeToPick === 'Out') {
      setSelectedTimeOut(selectedTime);
    }
    setShowTimePicker(false);
  };

  const [typeToPick, setTypeToPick] = useState(null);

  return (
    <View>
      <View style={styles.timeContainer}>
        <Text>In</Text>
        <TouchableOpacity
          style={{padding:5}}
          onPress={() => showTimePickerFor('In')}
        >
          <Text style={styles.text}>{selectedTimeIn}</Text>
        </TouchableOpacity>
        <Text>, Out</Text>
       
        <TouchableOpacity
          style={{padding:5}}
          onPress={() => showTimePickerFor('Out')}
        >
          <Text style={styles.text}>{selectedTimeOut}</Text>
        </TouchableOpacity>
      </View>

      <DateTimePickerModal
        isVisible={showTimePicker}
        mode="time"
        display="spinner"
        is24Hour={true}
        onConfirm={handleConfirm}
        onCancel={() => setShowTimePicker(false)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  timeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  
  text: {
    fontSize: 16,
    color: 'blue',
  },
});

export default TestScreen;
