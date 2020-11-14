import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { Entypo } from '@expo/vector-icons';

const JobCard = ({ openCard, timeStart, timeEnd, title, local, category, payment }) => {
    return (
        <View style={styles.container}>
            <View style={styles.dateContainer}>
                <Text style={styles.dateDayText}>15</Text>
                <Text style={styles.dateMonthText}>Fev</Text>
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
                <TouchableOpacity onPress={openCard}>
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
        flex: 1,
        borderRightWidth: 0.5,
        borderRightColor: '#E8E8E8',
        alignItems: 'center',
        justifyContent: 'center',
    },
    dateDayText: {
        fontFamily: 'NunitoSans_800ExtraBold',
        fontSize: 22,
        letterSpacing: 0.8,
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