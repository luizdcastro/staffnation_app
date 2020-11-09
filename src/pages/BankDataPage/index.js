import React, { useState } from 'react'
import { View, Text, Platform, StyleSheet, ScrollView, KeyboardAvoidingView, TextInput, TouchableOpacity } from 'react-native'
import { useHeaderHeight } from '@react-navigation/stack';

const BankDataPage = () => {
    const [agencia, setAgencia] = useState('')
    const [conta, setConta] = useState('')
    const [banco, setBanco] = useState('')

    return (
        <KeyboardAvoidingView style={styles.container} keyboardVerticalOffset={useHeaderHeight()} behavior={Platform.OS === "ios" ? "padding" : "height"}>
            <ScrollView>
                <View style={styles.formContent}>
                    <Text style={styles.label}>Banco</Text>
                    <TextInput style={styles.input}
                        keyboardType="default"
                        placeholder="Selecione seu banco"
                        value={banco}
                        onChangeText={(value) => setBanco(value)}
                    />
                </View>

                <View style={styles.formContent}>
                    <Text style={styles.label}>Agência</Text>
                    <TextInput style={styles.input}
                        placeholder='Digite sua agência'
                        keyboardType='number-pad'
                        autoCapitalize="none"
                        value={agencia}
                        onChangeText={(value) => setAgencia(value)}
                    />
                </View>
                <View style={styles.formContent}>
                    <Text style={styles.label}>Conta</Text>
                    <TextInput style={styles.input}
                        placeholder='Digite sua conta'
                        keyboardType='number-pad'
                        autoCapitalize="none"
                        value={conta}
                        onChangeText={(value) => setConta(value)}
                    />
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    )
}

export const pageOptions = {
    headerTitle: 'Dados Bancários',
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
    headerRight: () => (
        <TouchableOpacity style={{ paddingRight: 15 }}>
            <Text style={{ fontSize: 17, fontFamily: 'NunitoSans_700Bold', color: '#00A699' }}>Salvar</Text>
        </TouchableOpacity>
    )
    ,
    headerTintColor: '#00A699',

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fafafa'
    },
    label: {
        fontSize: 16,
        fontFamily: 'NunitoSans_600SemiBold',
        color: '#484848'
    },
    formContent: {
        marginTop: 15,
        marginHorizontal: 20,
        borderBottomColor: '#767676',
        borderBottomWidth: 0.5
    },
    input: {
        fontSize: 19,
        fontFamily: 'NunitoSans_400Regular',
        marginTop: 5,
        marginBottom: 20,
        color: '#484848'
    }
})

export default BankDataPage