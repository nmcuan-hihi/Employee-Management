import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { DataTable } from 'react-native-paper';
import ManageAttendance from '../Model/AttendanceSheetManager';
import moment from 'moment';
import { AntDesign } from '@expo/vector-icons';
import { showMessage } from "react-native-flash-message";

const manageAttendance = new ManageAttendance();

export default function TableAttendance({ maNV, month, year }) {
  const daysInMonth = Array.from({ length: 31 }, (_, i) => i + 1);
  const [attendanceData, setAttendanceData] = useState(Array(31).fill({ timein: '-', timeout: '-' }));

  useEffect(() => {
    loadData();
  }, [maNV, month, year]);

  const loadData = async () => {
    await manageAttendance.getArrAttendanceSheetAPI(); 
    const newData = daysInMonth.map(async (day) => {
        const date = moment(`${year}-${month}-${day}`, 'YYYY-MM-DD');
        const dayAttendance = await manageAttendance.getAttendanceData(maNV, date.format('YYYY-MM-DD'));
        return {
            timein: dayAttendance.length > 0 ? dayAttendance[0].timein : '-',
            timeout: dayAttendance.length > 0 ? dayAttendance[0].timeout : '-'
        };
    });
    setAttendanceData(await Promise.all(newData));
};


  const handleDeleteRow = async (day) => {
    const date = moment(`${year}-${month}-${day}`, 'YYYY-MM-DD');
    manageAttendance.deleteAttendance(maNV, date.format('YYYY-MM-DD'));
    const newData = [...attendanceData];
    newData[day - 1] = { timein: '-', timeout: '-' };
    setAttendanceData(newData);
    showMessage({
      message: "Success",
      description: "Delete attendance successfully!",
      type: "success",
    });
  };

  return (
    <View style={{ margin: 5, padding: 5, backgroundColor: 'white', borderRadius: 5 }}>
      <DataTable>
        <DataTable.Header>
          <DataTable.Title><Text style={styles.headertable}>Ngày</Text></DataTable.Title>
          <DataTable.Title><Text style={styles.headertable}>Giờ Vào</Text></DataTable.Title>
          <DataTable.Title><Text style={styles.headertable}>Giờ Ra</Text></DataTable.Title>
          <DataTable.Title style={{ width: 20, alignItems: 'center', justifyContent: 'center' }}>
            <Text style={styles.headertable}>Func</Text>
          </DataTable.Title>
        </DataTable.Header>
        {daysInMonth.map((day, index) => (
          <DataTable.Row key={day}>
            <DataTable.Cell>{day}</DataTable.Cell>
            <DataTable.Cell>{attendanceData[index].timein}</DataTable.Cell>
            <DataTable.Cell>{attendanceData[index].timeout}</DataTable.Cell>
            <DataTable.Cell style={{ width: 20, alignItems: 'center', justifyContent: 'center' }}>
              <TouchableOpacity onPress={() => handleDeleteRow(day)}>
                <AntDesign name="delete" size={15} color="red" />
              </TouchableOpacity>
            </DataTable.Cell>
          </DataTable.Row>
        ))}
      </DataTable>
    </View>
  );
}


const styles = StyleSheet.create({
  headertable: {
    fontSize: 15,
  }
});
