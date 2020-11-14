import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

const JobDetails = ({
    title,
    category,
    positions,
    timeStart,
    timeEnd,
    payment,
    uniform,
    addressStreet,
    addressNumber,
    addressNeighborhood,
    addressCity,
    addressState
}) => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>{title}</Text>
            <View style={{ flexDirection: 'row', marginVertical: 20 }}>
                <View style={[styles.tag, { marginRight: 15 }]}>
                    <Text style={styles.tagText}>{category}</Text>
                </View>
                <View style={styles.tag}>
                    <Text style={styles.tagText}>{positions} {positions <= 1 ? "vaga" : "vagas"}</Text>
                </View>
            </View>
            <View style={styles.dataContent}>
                <View style={styles.labelContainer}>
                    <Text style={styles.label}>Data e horário</Text>
                </View>
                <Text style={styles.text}>15 de Fevereiro</Text>
                <Text style={styles.text}>{timeStart} às {timeEnd}</Text>
            </View>
            <View style={styles.dataContent}>
                <View style={styles.labelContainer}>
                    <Text style={styles.label}>Pagamento</Text>
                </View>
                <Text style={styles.text}>R$ {payment}</Text>
                <Text style={styles.text}>Transfência via app</Text>
            </View>
            <View style={styles.dataContent}>
                <View style={styles.labelContainer}>
                    <Text style={styles.label}>Uniforme</Text>
                </View>
                <Text style={styles.text}>{uniform}</Text>
            </View>
            <View style={styles.dataContent}>
                <View style={styles.labelContainer}>
                    <Text style={styles.label}>Endereço</Text>
                </View>
                <Text style={styles.text}>{addressStreet}, {addressNumber}{"\n"}{addressNeighborhood}, {addressCity} - {addressState}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginHorizontal: 20
    },
    title: {
        fontFamily: 'NunitoSans_700Bold',
        fontSize: 20,
        color: '#484848',
        marginTop: 15
    },
    tag: {
        width: 120,
        height: 30,
        borderColor: '#00A699',
        borderWidth: 1,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center'
    },
    tagText: {
        fontFamily: 'NunitoSans_600SemiBold',
        color: '#00A699'
    },
    dataContent: {
        borderBottomWidth: 0.3,
        borderBottomColor: '#484848',
        paddingBottom: 10,
        marginBottom: 10
    },
    labelContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    label: {
        fontFamily: 'NunitoSans_600SemiBold',
        color: '#484848',
        fontSize: 15,
    },
    text: {
        fontFamily: 'NunitoSans_400Regular',
        color: '#484848'
    },
})

export default JobDetails