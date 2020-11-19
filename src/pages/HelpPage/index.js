import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

const HelpPage = () => {
    return (
        <View style={styles.container}>
            <Text>Help Page</Text>
        </View>
    )
}

export const pageOptions = {
    headerTitle: 'Dúvidas e Suporte',
    headerTitleAlign: 'center',
    headerTitleStyle: {
        color: '#484848',
        fontFamily: "NunitoSans_700Bold",
        fontSize: 20,
        textAlign: 'center',

    },
    headerBackTitleVisible: false,
    headerStyle: {
        backgroundColor: '#fafafa',
        height: Platform.OS === 'ios' ? 90 : 70,

    },
    headerTintColor: '#00A699',

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fafafa'
    }
})

export default HelpPage