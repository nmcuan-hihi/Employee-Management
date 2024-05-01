import { View, Text, Dimensions, ScrollView, FlatList } from 'react-native'
import React from 'react'
import { LinearGradient } from 'expo-linear-gradient'
import OnBack from '../Compoment/OnBack';
const { width, height } = Dimensions.get('window');
import manageAttendance from '../Model/AttendanceSheetManager';
import arrEmployee from '../Model/ArrEmployee';
import { DataTable } from 'react-native-paper';
import TimeSheet from '../Compoment/TimeSheet';

export default function ViewAttendanceSheet() {
    const attendanceData = manageAttendance.getAllAttendance();
    const employeesData = arrEmployee.getAllEmployees();
    const renderItem = ({ item }) => (
        <View style={{ marginVertical: 10 }}>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
            <View
              style={{
                width: 50,
                height: 50,
                borderRadius: 8,
                padding: 10,
                backgroundColor: "#4b6cb7",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text style={{ color: "white", fontSize: 16 }}>
                {item?.tenNV.charAt(0)}
              </Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={{ fontSize: 16, fontWeight: "bold" }}>
                {item?.maNV}
              </Text>
              <Text style={{ fontSize: 16, fontWeight: "bold" }}>
                {item?.tenNV}
              </Text>
                         
            </View>      
          </View>
          {/* bảng chấm công */} 
          <TimeSheet maNV={item?.maNV} year={2024} manageAttendance={manageAttendance} />


        </View>
      );
      const keyExtractor = (item, index) => index.toString(); 
  return (
    <LinearGradient colors={["#7F7FD5", "#E9E4F0"]} style={{ width, height }}>
    <View>
        <OnBack />
        
        <ScrollView style={{padding:20}}>
        <FlatList
        data={employeesData} 
        renderItem={renderItem}
        keyExtractor={keyExtractor}
      />
        </ScrollView>
        
    </View>
    </LinearGradient>

  )
}

// import React from 'react';
// import { View, Text, Dimensions, ScrollView } from 'react-native';
// import { LinearGradient } from 'expo-linear-gradient';
// import OnBack from '../Compoment/OnBack';
// import manageAttendance from '../Model/AttendanceSheetManager'; // Đảm bảo bạn import ManageAttendance từ file tương ứng

// const { width, height } = Dimensions.get('window');

// export default function ViewAttendanceSheet() {
//   const attendanceData = manageAttendance;

//   return (
//     <LinearGradient colors={["#7F7FD5", "#E9E4F0"]} style={{ flex: 1 }}>
//       <OnBack /> {/* Component OnBack của bạn */}
      
//       <View style={{ marginTop: 20, paddingHorizontal: 12 }}>
//         <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 10 }}>
//           Bảng Chấm Công
//         </Text>
//         <ScrollView>
//           {attendanceData.map((item, index) => (
//             <View key={index} style={{ marginBottom: 20 }}>
//               <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
//                 <View
//                   style={{
//                     width: 50,
//                     height: 50,
//                     borderRadius: 8,
//                     padding: 10,
//                     backgroundColor: "#4b6cb7",
//                     alignItems: "center",
//                     justifyContent: "center",
//                   }}
//                 >
//                   <Text style={{ color: "white", fontSize: 16 }}>
//                     {item?.name?.charAt(0)}
//                   </Text>
//                 </View>
//                 <View style={{ flex: 1 }}>
//                   <Text style={{ fontSize: 16, fontWeight: "bold" }}>
//                     {item?.name}
//                   </Text>
//                   <Text style={{ marginTop: 5, color: "gray" }}>
//                     {item?.designation} ({item?.employeeId})
//                   </Text>
//                 </View>
//               </View>

//               <View style={{ marginTop: 15, backgroundColor: "#A1FFCE", borderRadius: 5 }}>
//                 <Text style={{ margin: 10, fontSize: 18 }}>Tháng và Số ngày làm việc</Text>
//                 <View style={{ paddingHorizontal: 10 }}>
//                   <Text style={{ marginBottom: 5, fontSize: 16 }}>Tháng 1: {item?.daysInMonth[0]} ngày</Text>
//                   <Text style={{ marginBottom: 5, fontSize: 16 }}>Tháng 2: {item?.daysInMonth[1]} ngày</Text>
//                   {/* Tiếp tục cho tất cả các tháng */}
//                 </View>
//               </View>
//             </View>
//           ))}
//         </ScrollView>
//       </View>
//     </LinearGradient>
//   );
// }
