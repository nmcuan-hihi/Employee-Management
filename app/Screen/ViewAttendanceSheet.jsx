import { View, Text, Dimensions, FlatList, Pressable } from 'react-native';
import React, { useEffect, useState } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import OnBack from '../Compoment/OnBack';
import { AntDesign } from "@expo/vector-icons";
import ArrEmployee from '../Model/ArrEmployee';
import SheetItem from '../Compoment/ItemSheet';
import moment from 'moment';

const { width, height } = Dimensions.get('window');

export default function ViewAttendanceSheet() {
    const [year, setYear] = useState(moment().year());
    const [employeesData, setEmployeesData] = useState([]);

    useEffect(() => {
        loadEmployees();
    }, []);
    const loadEmployees = async () => {
        const arrEmployee = new ArrEmployee();
        const data = await arrEmployee.getArremployeeAPI();
        setEmployeesData(data);
    };
    const nextYear = () => {
        setYear(prevYear => prevYear + 1);
    };

    const prevYear = () => {
        setYear(prevYear => prevYear - 1);
    };

    return (
        <LinearGradient colors={["#7F7FD5", "#E9E4F0"]} style={{ flex: 1 }}>
            <View style={{ flex: 1 }}>
                <OnBack />
                <Pressable>
                    <View
                        style={{
                            flexDirection: "row",
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                    >
                        <AntDesign
                            onPress={prevYear}
                            name="left"
                            size={24}
                            color="blue"
                        />
                        <Text style={{ fontSize: 20, marginHorizontal: 10 }}>{year}</Text>
                        <AntDesign
                            onPress={nextYear}
                            name="right"
                            size={24}
                            color="blue"
                        />
                    </View>
                </Pressable>
                <View style={{ flex: 1, paddingHorizontal: 20 }}>
                    <FlatList
                        data={employeesData}
                        renderItem={({ item }) => <SheetItem item={item} year={year} />}
                        keyExtractor={(item) => item.maNV}
                    />
                </View>
            </View>
        </LinearGradient>
    );
}
