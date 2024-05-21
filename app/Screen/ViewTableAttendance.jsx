import React, { useState, useEffect } from 'react';
import { View, Text, Dimensions, ScrollView, Pressable } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { AntDesign } from "@expo/vector-icons";
import OnBack from '../Compoment/OnBack';
import ArrEmployee from '../Model/ArrEmployee';
import TableAttendance from '../Compoment/TableAttendance';
import moment from 'moment';
import { useRoute } from '@react-navigation/native';

const { width, height } = Dimensions.get('window');

export default function ViewTableAttendance() {
    const route = useRoute();
    const maNV = route.params.maNV;
    const [month, setMonth] = useState(moment());
    const [emp, setEmp] = useState(null);
    const arrEmployee = new ArrEmployee();

    useEffect(() => {
        const fetchEmployee = async () => {
            await arrEmployee.getArremployeeAPI();
            const employee = arrEmployee.getEmployeeByMaNV(maNV);
            setEmp(employee);
        };

        fetchEmployee();
    }, [maNV]);

    const nextMonth = () => {
        setMonth(month.clone().add(1, 'month'));
    };

    const prevMonth = () => {
        setMonth(month.clone().subtract(1, 'month'));
    };

    if (!emp) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text>Loading...</Text>
            </View>
        );
    }

    return (
        <LinearGradient colors={["#7F7FD5", "#E9E4F0"]} style={{ flex: 1 }}>
            <View style={{ padding: 20 }}>
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
                    <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
                        <View style={{ width: 50, height: 50, borderRadius: 8, padding: 10, backgroundColor: "#4b6cb7", alignItems: "center", justifyContent: "center" }}>
                            <Text style={{ color: "white", fontSize: 16 }}>{emp.tenNV.split(" ").pop()?.charAt(0)}</Text>
                        </View>
                        <View style={{ flex: 1 }}>
                            <Text style={{ fontSize: 16, fontWeight: "bold" }}>{emp.maNV}</Text>
                            <Text style={{ fontSize: 16, fontWeight: "bold" }}>{emp.tenNV}</Text>
                        </View>
                    </View>
                </View>
                <ScrollView style={{ height: '75%' }}>
                    <TableAttendance maNV={maNV} month={month.month() + 1} year={month.year()} />
                </ScrollView>
            </View>
        </LinearGradient>
    );
}
