import { View, Text } from 'react-native'
import React from 'react'
import TimeSheet from './TimeSheet';
import manageAttendance from '../Model/AttendanceSheetManager';

const SheetItem = ({ item, year }) => (
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
          {item?.tenNV.split(" ").pop()?.charAt(0)}
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
      <TimeSheet maNV={item?.maNV} year={year} manageAttendance={manageAttendance} />
    </View>
       
  );
  export default SheetItem;