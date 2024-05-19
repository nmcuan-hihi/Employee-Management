import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { Ionicons,FontAwesome5 } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';


export default function User({ navigation }) {
    const nav = useNavigation();
  return (
    <View>
       <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ fontSize: 20, fontWeight: '600', color: 'purple' }}>Employee Information</Text>
                    <TouchableOpacity
                     onPress={() => navigation.goBack()}
                    >
                         <FontAwesome5 name="sign-out-alt" size={24} color="black" />
                    </TouchableOpacity>
                   
                </View>
    </View>
  )
}