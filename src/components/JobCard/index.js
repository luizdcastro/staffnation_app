import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { Entypo } from '@expo/vector-icons';

const JobCard = () => {
    return (
        <View style={styles.container}>
            <View style={styles.dateContainer}>
                <Text style={styles.dateDayText}>15</Text>
                <Text style={styles.dateMonthText}>Fev</Text>
                <Text style={styles.smallText}>20:00</Text>
                <Text style={styles.smallText}>às</Text>
                <Text style={styles.smallText}>03:00</Text>
            </View>
            <View style={styles.mainContent}>
                <View>
                    <Text style={styles.title}>James Bar</Text>
                    <Text style={styles.regularText}>Categoria: Segurança</Text>
                    <Text style={[styles.regularText, { paddingBottom: 10 }]}>Valor: R$ 150,00</Text>
                    <Text style={styles.smallText}>Alameda Dr. Carlos de Carvalho, 680</Text>
                    <Text style={styles.smallText}>Centro, Curitiba</Text>
                </View>
            </View>
            <View style={styles.icon}>
                <TouchableOpacity>
                    <Entypo name="dots-three-horizontal" size={25} color="#00A699" />
                </TouchableOpacity>
            </View>


        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        width: '100%',
        height: 120,
        backgroundColor: '#fff',
        borderRadius: 10,
        marginBottom: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.18,
        shadowRadius: 1.00,
        elevation: 1,
    },
    mainContent: {
        flex: 3,
        justifyContent: 'space-between',
        paddingLeft: 15
    },
    title: {
        fontFamily: 'NunitoSans_700Bold',
        fontSize: 18,
        paddingTop: 8,
        paddingBottom: 5,
        color: '#484848',

    },
    dateContainer: {
        flex: 1,
        borderRightWidth: 0.5,
        borderRightColor: '#E8E8E8',
        alignItems: 'center',
        justifyContent: 'center',
    },
    dateDayText: {
        fontFamily: 'NunitoSans_800ExtraBold',
        fontSize: 22,
        letterSpacing: 1,
        color: '#484848',
    },
    dateMonthText: {
        fontFamily: 'NunitoSans_600SemiBold',
        textTransform: 'uppercase',
        fontSize: 15,
        marginBottom: 5,
        color: '#484848'
    },
    smallText: {
        fontSize: 11,
        fontFamily: 'NunitoSans_400Regular',
        color: '#484848'
    },
    regularText: {
        fontSize: 13,
        fontFamily: 'NunitoSans_400Regular',
        color: '#484848'
    },
    icon: {
        paddingTop: 10,
        paddingRight: 15,
    }
})

export default JobCard