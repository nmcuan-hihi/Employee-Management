import { View, Text, StyleSheet, ScrollView, Dimensions, Pressable } from 'react-native'
import React from 'react'
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons,FontAwesome5 } from '@expo/vector-icons';
const { width, height } = Dimensions.get('window');

export default function Manager() {
    return (
        <ScrollView >
            <LinearGradient colors={["#7F7FD5", "#E9E4F0"]} style={{ width, padding: 20}}>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ fontSize: 20, fontWeight: '600', color: 'purple' }}>Employee Management</Text>
                </View>
                <View style={{marginTop: 20, flexDirection: 'row', gap: 20}}>
                    <Pressable style={styles.btnContainer}>
                        <View style={{ width: 50, height: 50, borderRadius: 25, backgroundColor: 'white', alignItems: 'center', justifyContent: 'center' }}>
                            <Ionicons name="people-sharp" size={24} color="black" />

                        </View>
                        <Text style={{ marginTop: 7, fontWeight: 600 }}>Employee List</Text>
                    </Pressable>
                    <Pressable style={styles.btnContainer}>

                        <View style={{ width: 50, height: 50, borderRadius: 25, backgroundColor: 'white', alignItems: 'center', justifyContent: 'center' }}>
                        <FontAwesome5 name="user-check" size={24} color="black" />

                        </View>
                        <Text style={{ marginTop: 7, fontWeight: 600 }}>Mark Attendance</Text>
                    </Pressable>
                </View>
                <View style={{padding: 10, backgroundColor: 'white', marginTop: 20, borderRadius: 7, gap: 10}}>
                    <Pressable style={{ backgroundColor: '#be93c5', borderRadius: 6, padding: 10, flexDirection: 'row', alignItems: 'center'}}>
                        <View style={{marginRight: 10, padding: 7, width: 45, height: 45, borderRadius: 7, backgroundColor: 'white', alignItems: 'center'}}>
                        <Ionicons name="newspaper-outline" size={24} color="black" />
                        </View>
                        <Text style={{fontWeight: 600}}>Attendance Report</Text>
                    </Pressable>
                    <Pressable style={{ backgroundColor: '#be93c5', borderRadius: 6, padding: 10, flexDirection: 'row', alignItems: 'center'}}>
                        <View style={{marginRight: 10, padding: 7, width: 45, height: 45, borderRadius: 7, backgroundColor: 'white', alignItems: 'center'}}>
                        <Ionicons name="newspaper-outline" size={24} color="black" />
                        </View>
                        <Text style={{fontWeight: 600}}>Add Employee</Text>
                    </Pressable>
                    <Pressable style={{ backgroundColor: '#be93c5', borderRadius: 6, padding: 10, flexDirection: 'row', alignItems: 'center'}}>
                        <View style={{marginRight: 10, padding: 7, width: 45, height: 45, borderRadius: 7, backgroundColor: 'white', alignItems: 'center'}}>
                        <Ionicons name="newspaper-outline" size={24} color="black" />
                        </View>
                        <Text style={{fontWeight: 600}}>CURD Employee</Text>
                    </Pressable>
                    <Pressable style={{ backgroundColor: '#be93c5', borderRadius: 6, padding: 10, flexDirection: 'row', alignItems: 'center'}}>
                        <View style={{marginRight: 10, padding: 7, width: 45, height: 45, borderRadius: 7, backgroundColor: 'white', alignItems: 'center'}}>
                        <Ionicons name="newspaper-outline" size={24} color="black" />
                        </View>
                        <Text style={{fontWeight: 600}}>NO VALUE</Text>
                    </Pressable>
                    
                </View>
            </LinearGradient>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    btnContainer:{
        flex: 1, backgroundColor: '#d3cce3', padding: 12, borderRadius: 6, alignItems: 'center', justifyContent: 'center'
    }
})
