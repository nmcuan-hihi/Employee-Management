import { Text, View } from "react-native";
import { DataTable } from "react-native-paper";
import React, { useState, useEffect } from "react";
import ManageAttendance from "../Model/AttendanceSheetManager";

export default function TimeSheet({ maNV, year }) {
  const manageAttendance = new ManageAttendance();
  const [workingDays, setWorkingDays] = useState([]);
  const months = Array.from({ length: 12 }, (_, i) => i + 1); 
  
  useEffect(() => {
    const fetchData = async () => {
      await manageAttendance.getArrAttendanceSheetAPI();
      const days = months.map(month => manageAttendance.countWorkingDays(maNV, month, year));
      setWorkingDays(days);
    };

    fetchData();
  }, [maNV, year]);

  return (
    <View style={{ marginTop: 15, margin: 5, padding: 5, backgroundColor: 'white', borderRadius: 5 }}>
      <DataTable>
        <DataTable.Header>
          {months.map((month, index) => (
            <DataTable.Title key={index}><Text style={{ color: 'black', fontSize: 15, fontWeight: '500' }}>{month}</Text></DataTable.Title>
          ))}
        </DataTable.Header>
        <DataTable.Row>
          {workingDays.map((days, index) => (
            <DataTable.Cell key={index}><Text style={{ color: 'blue', fontSize: 18, fontWeight: '500' }}>{days}</Text></DataTable.Cell>
          ))}
        </DataTable.Row>
      </DataTable>
    </View>
  );
}
