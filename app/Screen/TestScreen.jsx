import React, { useState } from 'react';
import { View, Button, Text } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

const TestScreen = () => {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    setSelectedDate(date);
    hideDatePicker();
  };

  return (
    <View>
      <Button title="Show Datde Picker" onPress={showDatePicker} />
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="time" // Chọn mode là "time" cho việc chọn thời gian
        display="inline" // Hiển thị picker ngay trong modal
        is24Hour={true} // Sử dụng định dạng 24 giờ
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />
      {/* Hiển thị ngày/thời gian đã chọn */}
      {selectedDate && (
        <Text>Đã chọn: {selectedDate.toLocaleString()}</Text>
      )}
    </View>
  );
};

export default TestScreen;
