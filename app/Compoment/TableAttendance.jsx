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
  const [attendanceData, setAttendanceData] = useState(Array(31).fill({ id: null, timein: '-', timeout: '-' }));

  useEffect(() => {
    loadData();
    console.log(daysInMonth);
  }, [maNV, month, year]);

  const loadData = async () => {
       //await manageAttendance.getArrAttendanceSheetAPI(); // get danh sách data chấm chông từ api
    // lấy data chám công
      const newData = await Promise.all(daysInMonth.map(async (day) => {
      const date = moment(`${year}-${month}-${day}`, 'YYYY-MM-DD'); // lấy ngày của từng cột
      const dayAttendance = await manageAttendance.getAttendanceData(maNV, date.format('YYYY-MM-DD')); // lấy giwof vào giờ ra của từng n=gày
      return {
        id: dayAttendance.length > 0 ? dayAttendance[0].id : null,
        timein: dayAttendance.length > 0 ? dayAttendance[0].timein : '-',
        timeout: dayAttendance.length > 0 ? dayAttendance[0].timeout : '-'
      };
    }));
    setAttendanceData(newData);
  };

  const handleDeleteRow = async (day) => {
    const viTri = attendanceData[day - 1]; // ngày x thì sẽ lưu ở vị trí x -1 vì mangr bawts đầu từ 0
    if (viTri.id) {
      await manageAttendance.deleteAttendance(viTri.id);
      const newData = [...attendanceData];
      // cập nhật lại hiển thị bangr
      newData[day - 1] = { id: null, timein: '-', timeout: '-' };
      setAttendanceData(newData);
      // showMessage({
      //   message: "Success",
      //   description: "Delete attendance successfully!",
      //   type: "success",
      // });
    } else {
      Alert.alert('Error', 'Attendance record not found.');
    }
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
