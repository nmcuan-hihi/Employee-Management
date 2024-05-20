import { View, Text, Dimensions, ScrollView, FlatList, Pressable, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
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
import axios from 'axios';


export default function ViewAttendanceSheet() {
    //  const [currentDate, setCurrentDate] = useState(moment());
    const [year, setYear] = useState(moment().year());
    const employeesData = arrEmployee.getAllEmployees();
    const nextYear = () => {
        const nyear = year + 1;
        setYear(nyear);
    };
    const prevYear = () => {
        const prYear = year - 1;
        setYear(prYear);
    };
    
    return (
        <LinearGradient colors={["#7F7FD5", "#E9E4F0"]} style={{ width, height }}>

            <View>
                <OnBack />
                <Pressable>
                    <View
                        style={{
                            flexDirection: "row", alignItems: "center", gap: 10, marginLeft: "auto", marginRight: "auto",
                        }}
                    >
                        <AntDesign
                            onPress={prevYear}
                            name="left"
                            size={24}
                            color="blue"
                        />
                        <Text style={{ fontSize: 20 }}>{year}</Text>
                        <AntDesign
                            onPress={nextYear}
                            name="right"
                            size={24}
                            color="blue"
                        />
                    </View>
                </Pressable>
                <View style={{ padding: 20 }}>
                    <FlatList
                        data={employeesData}
                        //renderItem={sheetItem}    
                        renderItem={({ item }) => <SheetItem item={item} year={year} />}
                    />
                </View>
            </View>
        </LinearGradient>

    )
}
