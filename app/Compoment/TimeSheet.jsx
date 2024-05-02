import { Text, View } from "react-native";
import { DataTable } from "react-native-paper";

export default function TimeSheet({ maNV, year, manageAttendance }) {
  const months = Array.from({ length: 12 }, (_, i) => i + 1); // Tạo mảng từ 1 đến 12 để hiển thị các tháng
  return (
    // <View style={{ marginTop: 15, margin: 5, padding: 5, backgroundColor: '#A1FFCE', borderRadius: 5 }}>
    <View style={{ marginTop: 15, margin: 5, padding: 5, backgroundColor: 'white', borderRadius: 5 }}>
      <DataTable>
        <DataTable.Header>
          {months.map((month, index) => (
            <DataTable.Title key={index}><Text style={{ color: 'black', fontSize: 15, fontWeight: 500 }}>{month}</Text></DataTable.Title>
          ))}
        </DataTable.Header>
        <DataTable.Row>
          {months.map((month, index) => (
            <DataTable.Cell key={index}><Text style={{ color: 'blue', fontSize: 18, fontWeight: 500 }}>{manageAttendance.countWorkingDays(maNV, month, year)}</Text></DataTable.Cell>
          ))}
        </DataTable.Row>
      </DataTable>
    </View>
  );
}
