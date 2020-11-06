import React from 'react'
import { View, Text, StatusBar, TouchableOpacity, StyleSheet, Platform } from 'react-native'
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";


const Header = ({ title }) => {
    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            <StatusBar barStyle='light-content' backgroundColor='#121212' />
            <TouchableOpacity onPress={() => navigation.navigate('ProfilePage')}>
                <Ionicons name="ios-menu" size={30} color="#fff" />
            </TouchableOpacity>
            <Text style={styles.title}>{title}</Text>
            <Ionicons name="ios-help-circle-outline" size={30} color="#fff" />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        height: Platform.OS === 'ios' ? '12%' : '10%',
        width: '100%',
        paddingTop: 15,
        paddingHorizontal: 15,
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#121212',
    },
    title: {
        color: '#fff',
        fontFamily: "Montserrat_700Bold",
        fontSize: 18
    }

})

export default Header