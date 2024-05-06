import { View, Text, Dimensions, ScrollView, FlatList, Pressable, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { LinearGradient } from 'expo-linear-gradient'
import OnBack from '../Compoment/OnBack';
import { AntDesign, Feather } from "@expo/vector-icons";
const { width, height } = Dimensions.get('window');
import manageAttendance from '../Model/AttendanceSheetManager';
import arrEmployee from '../Model/ArrEmployee';
import { DataTable } from 'react-native-paper';
import TimeSheet from '../Compoment/TimeSheet';
import moment from 'moment';
import SheetItem from '../Compoment/ItemSheet';
import TableAttendance from '../Compoment/TableAttendance';
import { useRoute } from '@react-navigation/native';


export default function ViewTableAttendance() {
    //  const [currentDate, setCurrentDate] = useState(moment());
    const route = useRoute();
    const maNV = route.params.maNV;
    const [month, setMonth] = useState(moment());
    const emp = arrEmployee.getEmployeeByMaNV(maNV);

    const nextMonth = () => {
        setMonth(month.clone().add(1, 'month'));
    };
    const prevMonth = () => {
        setMonth(month.clone().subtract(1, 'month'));
    };
    return (
        <LinearGradient colors={["#7F7FD5", "#E9E4F0"]} style={{ width, height }}>
            <View style={{padding:20}}>
                <OnBack />
                <Pressable>
                    <View
                        style={{
                            flexDirection: "row", alignItems: "center", gap: 10, marginLeft: "auto", marginRight: "auto",
                        }}
                    >
                        <AntDesign onPress={prevMonth} name="left" size={24} color="blue" />
                        <Text style={{ fontSize: 20 }}>
                            {month.format('MM/YYYY')}
                        </Text>
                        <AntDesign onPress={nextMonth} name="right" size={24} color="blue" />

                    </View>
                </Pressable>
                <View style={{ padding: 10 }}>
                    <View>
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
                                    {emp.tenNV.split(" ").pop()?.charAt(0)}
                                </Text>
                            </View>
                            <View style={{ flex: 1 }}>
                                <Text style={{ fontSize: 16, fontWeight: "bold" }}>
                                    {emp.maNV}
                                </Text>
                                <Text style={{ fontSize: 16, fontWeight: "bold" }}>
                                    {emp.tenNV}
                                </Text>

                            </View>
                        </View>
                       
                    </View>
                </View>
                <ScrollView style={{height: '75%'}}>
                <TableAttendance maNV={maNV} month={month.month() + 1} year={month.year() }/>
                </ScrollView>
            </View>
        </LinearGradient>

    )
}

