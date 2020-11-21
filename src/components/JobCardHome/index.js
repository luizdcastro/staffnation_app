import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { Entypo } from '@expo/vector-icons';

const JobsCardHome = ({ openCard, timeStart, timeEnd, title, local, category, payment, dateMonth, dateDay }) => {
    return (
        <View style={styles.container}>

            <View style={styles.mainContent}>
                <TouchableOpacity onPress={openCard}>
                    <View>
                        <Text style={styles.title}>{title}</Text>
                        <Text style={{ fontSize: 13, fontFamily: 'NunitoSans_400Regular', color: '#484848' }}>{local}</Text>
                    </View>
                    <View style={{ marginTop: 6 }}>
                        <Text style={styles.regularText}>{dateDay} de {dateMonth}</Text>
                        <Text style={[styles.regularText, { paddingBottom: 10 }]}>R$ {payment}</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </View >
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        height: 110,
        width: 184,
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
        marginRight: 15
    },
    mainContent: {
        flex: 3,
        paddingLeft: 15,
        paddingTop: 8,
        justifyContent: 'space-around'

    },
    title: {
        fontFamily: 'NunitoSans_600SemiBold',
        fontSize: 17,
        color: '#484848',
        height: 21

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
        paddingRight: 15,
        paddingVertical: 15,
        justifyContent: 'space-between'
    }
})

export default JobsCardHome