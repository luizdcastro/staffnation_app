import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { useNavigation } from "@react-navigation/native";


const Header = ({ title, letfIcon, rightIcon }) => {

    return (
        <View style={styles.container}>
            <View >
                {letfIcon}
            </View>
            <Text style={styles.title}>{title}</Text>
            <View>
                {rightIcon}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        height: 75,
        alignItems: 'center',
        paddingTop: 15,
        width: '100%',
        justifyContent: 'space-between',
        backgroundColor: '#fff',
        borderBottomColor: '#E0E0E0',
        borderBottomWidth: 0.3,
    },
    title: {
        color: 'grey',
        fontFamily: "NunitoSans_700Bold",
        fontSize: 18,
        paddingRight: 20
    }

})

export default Header