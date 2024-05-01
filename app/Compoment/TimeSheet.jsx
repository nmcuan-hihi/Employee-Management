import React from 'react';
import { View } from 'react-native';
import { DataTable } from 'react-native-paper';
// import manageAttendance from '../Model/AttendanceSheetManager';

export default function TimeSheet({ maNV, year,manageAttendance }) {
  const months = Array.from({ length: 12 }, (_, i) => i + 1); // Tạo mảng từ 1 đến 12 để hiển thị các tháng

 

  return (
    <View style={{ marginTop: 15, margin: 5, padding: 5, backgroundColor: '#A1FFCE', borderRadius: 5 }}>
      <DataTable>
        <DataTable.Header>
          {months.map((month) => (
            <DataTable.Title >{month}</DataTable.Title>
          ))}
        </DataTable.Header>
        <DataTable.Row>
          {months.map((month) => (
            <DataTable.Cell >{manageAttendance.countWorkingDays(maNV,month, year)}</DataTable.Cell>
          ))}
        </DataTable.Row>
      </DataTable>
    </View>
  );
}
