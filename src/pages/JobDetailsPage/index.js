import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import GradientButton from '../../components/GradientButton'

const JobDetailsPage = () => {
    return (
        <View style={styles.container}>
            <View style={{ flex: 1, marginHorizontal: 20 }}>
                <Text style={styles.title}>James bar</Text>
                <View style={{ flexDirection: 'row', marginVertical: 20 }}>
                    <View style={[styles.tag, { marginRight: 15 }]}>
                        <Text style={styles.tagText}>Segurança</Text>
                    </View>
                    <View style={styles.tag}>
                        <Text style={styles.tagText}>5 vagas</Text>
                    </View>
                </View>
                <View style={styles.dataContent}>
                    <View style={styles.labelContainer}>
                        <Text style={styles.label}>Data e horário</Text>
                    </View>
                    <Text style={styles.text}>15 de Fevereiro</Text>
                    <Text style={styles.text}>18:00 às 03:00</Text>
                </View>
                <View style={styles.dataContent}>
                    <View style={styles.labelContainer}>
                        <Text style={styles.label}>Pagamento</Text>
                    </View>
                    <Text style={styles.text}>R$ 150,00</Text>
                    <Text style={styles.text}>Transfência via app</Text>
                </View>
                <View style={styles.dataContent}>
                    <View style={styles.labelContainer}>
                        <Text style={styles.label}>Uniforme</Text>
                    </View>
                    <Text style={styles.text}>Terno e calça preta</Text>
                </View>
                <View style={styles.dataContent}>
                    <View style={styles.labelContainer}>
                        <Text style={styles.label}>Endereço</Text>
                    </View>
                    <Text style={styles.text}>Alameda Dr. Carlos de Carvalho, 1275{"\n"}Centro, Curitiba - PR</Text>
                </View>
            </View>
            <View style={styles.buttonsContainer}>
                <View style={{ width: '100%', alignItems: 'center' }}>
                    <TouchableOpacity style={styles.button}>
                        <Text style={styles.textButton}>Notificar Atraso</Text>
                    </TouchableOpacity>
                </View>
                <View>
                    <GradientButton
                        title="Cancelar Trabalho"
                        gradient={["#00A699", "#00A699"]}
                        onPress={() => { }}
                    />
                </View>
            </View>
        </View>
    )
}

export const pageOptions = {
    headerTitle: 'Detalhes',
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
        backgroundColor: '#fafafa',
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
    buttonsContainer: {
        flex: 1,
        marginBottom: 20,
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    button: {
        height: 50,
        borderWidth: 1.3,
        borderColor: '#00A699',
        justifyContent: 'center',
        alignItems: 'center',
        width: '95%',
        borderRadius: 5,
        marginBottom: 10,
    },
    textButton: {
        color: '#00A699',
        textTransform: 'uppercase',
        fontFamily: 'NunitoSans_600SemiBold'
    },
})

export default JobDetailsPage