import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import { Ionicons, Entypo } from '@expo/vector-icons';

export default function OnBack({ text }) {
    const nav = useNavigation();
    return (
        <View style={{ paddingTop: 10, paddingLeft: 15 }}>
            <TouchableOpacity style={{ display: 'flex', flexDirection: 'row', gap: 10, alignItems: 'center', marginBottom: 5 }}
                onPress={() => nav.goBack()}
            >
                <Ionicons name="arrow-back-circle-outline" size={35} color="black" />
               {text==null? "": <Text style={{ fontSize: 20 }}>{text}</Text>}
            </TouchableOpacity>
        </View>
    )
}