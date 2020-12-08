import React from 'react'
import { View, TouchableOpacity, Text, Image, Dimensions, StyleSheet } from 'react-native'

const { width, height } = Dimensions.get('window')

const JobCardNoContent = ({ onPress, width }) => {
    return (
        <TouchableOpacity style={[styles.container, { width: width }]} onPress={onPress}>
            <Image style={styles.image} source={require('../../assets/images/oops.jpg')} />
            <View style={styles.mainContent}>
                <Text style={styles.title}>Nenhum trabalho encontrado</Text>
                <Text style={styles.bottomText}>Confira o status da sua candidatura</Text>
            </View>
            <View style={{ flex: 1, alignItems: 'center', marginRight: 5 }}>
                <View style={styles.button}>
                    <Text style={styles.buttonText}>Verificar</Text>
                </View>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        width: width - 20,
        height: 80,
        marginTop: 5,
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

export default JobCardNoContent