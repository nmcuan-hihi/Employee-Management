import React from 'react';
import { View, Text, Pressable } from 'react-native';
import TimeSheet from './TimeSheet';
import { useNavigation } from '@react-navigation/native';

const SheetItem = ({ item, year }) => {
  const navigation = useNavigation();

  const goToTableAttendance = () => {
    navigation.push('tableattendance', { maNV: item });
  };

  return (
    <View style={{ marginVertical: 10 }}>
      <Pressable
        style={{ flexDirection: "row", alignItems: "center", gap: 10 }}
        onPress={goToTableAttendance}
      >
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
      </Pressable>
      {/* Bảng chấm công */}
      <TimeSheet maNV={item?.maNV} year={year}/>
    </View>
  );
};

export default SheetItem;
