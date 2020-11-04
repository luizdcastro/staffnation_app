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
                    <Entypo name="dots-three-horizontal" size={25} color="#2397d4" />
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
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.18,
        shadowRadius: 1.00,
        elevation: 1,
        marginBottom: 10
    },
    mainContent: {
        flex: 3,
        justifyContent: 'space-between',
        paddingLeft: 15
    },
    title: {
        fontFamily: 'Montserrat_500Medium',
        fontSize: 17,
        paddingTop: 10,
        paddingBottom: 5

    },
    dateContainer: {
        flex: 1, borderRightWidth: 0.5,
        borderRightColor: '#cfd8dc',
        alignItems: 'center',
        justifyContent: 'center'
    },
    dateDayText: {
        fontFamily: 'Montserrat_700Bold',
        fontSize: 22,
        letterSpacing: 2.5,
        color: 'black'
    },
    dateMonthText: {
        fontFamily: 'Montserrat_500Medium',
        textTransform: 'uppercase',
        marginBottom: 5
    },
    smallText: {
        fontSize: 11,
        fontFamily: 'Montserrat_400Regular',
    },
    regularText: {
        fontSize: 13,
        fontFamily: 'Montserrat_400Regular',
    },
    icon: {
        paddingTop: 10,
        paddingRight: 15,
    }
})

export default JobCard