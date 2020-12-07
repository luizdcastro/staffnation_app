import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { Entypo } from '@expo/vector-icons';

const JobCard = ({ openCard, timeStart, timeEnd, title, local, category, payment, dateMonth, dateDay }) => {
    return (

        <TouchableOpacity style={styles.container} onPress={openCard}>
            <View style={styles.dateContainer}>
                <Text style={styles.dateDayText}>{dateDay}</Text>
                <Text style={styles.dateMonthText}>{dateMonth}</Text>
                <Text style={[styles.smallText, { textAlign: 'center', lineHeight: 12 }]}>{timeStart}{"\n"} às {"\n"} {timeEnd}</Text>
            </View>
            <View style={styles.mainContent}>
                <View>
                    <Text style={styles.title}>{title}</Text>
                    <Text style={{ fontSize: 13, fontFamily: 'NunitoSans_400Regular', color: '#484848' }}>{local}</Text>
                </View>
                <View>
                    <Text style={styles.regularText}>Categoria: {category}</Text>
                    <Text style={[styles.regularText, { paddingBottom: 10 }]}>Valor: R$ {payment}</Text>
                </View>
            </View>
            <View style={styles.icon}>
                <Entypo name="dots-three-horizontal" size={25} color="#00A699" />
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
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
        flex: 4,
        paddingLeft: 15,
        paddingTop: 8,
        justifyContent: 'space-around'

    },
    title: {
        fontFamily: 'NunitoSans_700Bold',
        fontSize: 18,
        color: '#484848',
        height: 21

    },
    dateContainer: {
        flex: 2,
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
        height: 25

    },
    dateMonthText: {
        fontFamily: 'NunitoSans_700Bold',
        textTransform: 'uppercase',
        fontSize: 16,
        marginBottom: 8,
        color: '#484848',

    },
    smallText: {
        fontSize: 11,
        fontFamily: 'NunitoSans_400Regular',
        color: '#484848'
    },
    regularText: {
        fontSize: 14,
        fontFamily: 'NunitoSans_400Regular',
        color: '#484848'
    },
    icon: {
        paddingRight: 15,
        paddingVertical: 15,
        justifyContent: 'space-between'
    }
})

export default JobCard