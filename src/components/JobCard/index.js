import React from 'react'
import { View, TouchableOpacity, Text, Image, Dimensions, StyleSheet } from 'react-native'

const { width, height } = Dimensions.get('window')

const DiscontCard = ({ buttonTitle, onPress, width, title, category, payment, day, month, image }) => {
    return (
        <TouchableOpacity style={[styles.container, { width: width }]} onPress={onPress}>
            <Image style={styles.image} source={{ uri: image }} />
            <View style={styles.mainContent}>
                <Text style={styles.title}>{title}</Text>
                <Text style={styles.bottomText}>Categoria: {category}</Text>
                <Text style={styles.bottomText}>Valor: {payment}</Text>
            </View>
            <View style={{ flex: 1, alignItems: 'center', marginRight: 5 }}>
                <Text style={styles.dateText}>{day}/{month}</Text>
                <View style={styles.button}>
                    <Text style={styles.buttonText}>{buttonTitle}</Text>
                </View>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        width: width - 20,
        height: 80,
        marginTop: 8,
        borderRadius: 5,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 0.5,
        },
        shadowOpacity: 0.09,
        shadowRadius: 0.5,
        elevation: 0.5,
        marginRight: 10
    },
    image: {
        width: 60,
        height: 60,
        borderRadius: 10,
        marginLeft: 10
    },
    mainContent: {
        marginLeft: 10,
        flex: 3,
    },
    title: {
        fontFamily: 'NunitoSans_600SemiBold',
        fontSize: 15
    },
    subtitle: {
        fontFamily: 'NunitoSans_400Regular',
        fontSize: 13
    },
    bottomText: {
        fontFamily: 'NunitoSans_400Regular',
        fontSize: 11
    },
    dateText: {
        fontFamily: 'NunitoSans_700Bold',
        fontSize: 18,
        color: '#484848',
        marginBottom: 3
    },
    button: {
        backgroundColor: '#fafafa',
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 10,
    },
    buttonText: {
        fontFamily: 'NunitoSans_700Bold',
        fontSize: 12,
        color: '#523BE4'
    }
})

export default DiscontCard