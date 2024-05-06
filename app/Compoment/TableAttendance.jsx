import React from 'react';
import { View } from 'react-native';
import { DataTable } from 'react-native-paper';
import manageAttendance from '../Model/AttendanceSheetManager';
import moment from 'moment'; // Import thư viện moment
import { router } from 'expo-router';

export default function TableAttendance({ maNV, month, year }) {
  const daysInMonth = Array.from({ length: 31 }, (_, i) => i + 1); // Tạo mảng từ 1 đến 31 để hiển thị các ngày trong tháng
 
  return (
    <View style={{margin: 5, padding: 5, backgroundColor: 'white', borderRadius: 5 }}>
      <DataTable>
        <DataTable.Header>
          <DataTable.Title>Ngày</DataTable.Title>
          <DataTable.Title>Giờ Vào</DataTable.Title>
          <DataTable.Title>Giờ Ra</DataTable.Title>
        </DataTable.Header>
        {daysInMonth.map(day => {
          const date = moment(`${year}-${month}-${day}`, 'YYYY-MM-DD'); // Tạo đối tượng ngày tháng từ year, month và day
          const dayAttendance = manageAttendance.getAttendanceData(maNV, date.format('YYYY-MM-DD')); // Format date 
          return (
            <DataTable.Row key={day}>
              <DataTable.Cell>{day}</DataTable.Cell>
              <DataTable.Cell>{dayAttendance.length > 0 ? dayAttendance[0].timein : '-'}</DataTable.Cell>
              <DataTable.Cell>{dayAttendance.length > 0 ? dayAttendance[0].timeout : '-'}</DataTable.Cell>
            </DataTable.Row>
          );
        })}
      </DataTable>
    </View>
  );
}
