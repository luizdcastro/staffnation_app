import React from 'react'
import { View, Text, StatusBar, TouchableOpacity, StyleSheet, Platform } from 'react-native'
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";


const Header = ({ title, letfIcon, rightIcon, letfAction, rightAction }) => {
    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            <View >
                {letfIcon}
            </View>
            <Text style={styles.title}>{title}</Text>
            <View >
                {rightIcon}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        height: 70,
        alignItems: 'center',
        paddingTop: 15,
        width: '100%',
        paddingHorizontal: 15,
        justifyContent: 'space-between',
        backgroundColor: '#fff',
        borderBottomColor: '#E0E0E0',
        borderBottomWidth: 0.3,
    },
    title: {
        color: '#484848',
        fontFamily: "NunitoSans_700Bold",
        fontSize: 18,
        paddingRight: 20
    }

})

export default Header