
import React, { useState, useEffect } from 'react'
import { connect } from "react-redux";
import { View, Text, Platform, StyleSheet, ScrollView, KeyboardAvoidingView, TextInput, TouchableOpacity, Dimensions } from 'react-native'
import { useHeaderHeight } from '@react-navigation/stack';
import { Picker } from '@react-native-picker/picker';


import { AntDesign } from '@expo/vector-icons';
import { updateUser } from "../../redux/actions/userActions"
import { getMe } from "../../redux/actions/getMeActions"

const { width, height } = Dimensions.get('window')


const BankDataPage = ({ navigation, dispatchGetMe, dispatchUpdateUserAction, getme }) => {
    const [accountNumber, setAccountNumber] = useState(getme.data.bankData.accountNumber)
    const [agencyNumber, setAgencyNumber] = useState(getme.data.bankData.agencyNumber)
    const [bankNumber, setBankNumber] = useState(getme.data.bankData.bankNumber)
    const [accountType, setAccountType] = useState(getme.data.bankData.accountType)
    const [accountHolder, setAccountHolder] = useState(getme.data.bankData.accountHolder)
    const [accountComplementNumber, setAccountComplementNumber] = useState(getme.data.bankData.accountComplementNumber)
    const data = {
        bankNumber: bankNumber,
        agencyNumber: agencyNumber,
        accountNumber: accountNumber,
        accountComplementNumber: accountComplementNumber,
        accountType: accountType,
        accountHolder: accountHolder
    }

    const hanleUpdateUser = (event) => {
        event.preventDefault();
        dispatchUpdateUserAction(
            getme.data._id,
            data,
            () => dispatchGetMe(),
            (error) => console.log(error)
        )
        navigation.goBack()
    }

    useEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <TouchableOpacity style={{ paddingRight: 15 }} onPress={hanleUpdateUser}>
                    <Text style={{ fontSize: 17, fontFamily: 'NunitoSans_700Bold', color: '#523BE4' }}>Salvar</Text>
                </TouchableOpacity>
            )
        })
    }, [accountNumber, agencyNumber, bankNumber])

    return (
        <KeyboardAvoidingView style={styles.container} keyboardVerticalOffset={useHeaderHeight()} behavior={Platform.OS === "ios" ? "padding" : "height"}>
            <ScrollView style={{ marginBottom: 15 }}>
                <View style={{ marginTop: 15 }}>
                    <Text style={[styles.label, { marginLeft: 15, position: 'absolute', top: -5, left: 0 }]}>Banco</Text>
                    <Picker
                        selectedValue={bankNumber}
                        onValueChange={(bankNumber) => setBankNumber(bankNumber)}
                        mode="dropdown"
                        style={{ height: Platform.OS === 'android' ? 45 : 100, width: width - 10, marginLeft: 7, marginTop: Platform.OS === 'android' ? 8 : 3 }}
                        itemStyle={{
                            fontSize: 18,
                            fontFamily: 'NunitoSans_400Regular',
                            marginTop: 5,
                            marginBottom: 5,
                            color: '#484848',
                            height: Platform.OS === 'android' ? 45 : 100,
                        }}>
                        <Picker.Item label="Itau" value="01" />
                        <Picker.Item label="Bradesco" value="02" />
                        <Picker.Item label="Santander" value="03" />
                        <Picker.Item label="Caixa" value="04" />
                        <Picker.Item label="Nu Bank" value="05" />
                    </Picker>
                    <View style={{ borderBottomColor: 'grey', borderBottomWidth: 0.3, marginHorizontal: 15 }} />
                </View>
                <View style={styles.formContent}>
                    <Text style={styles.label}>Agência</Text>
                    <TextInput style={styles.input}
                        placeholder='Digite sua agência'
                        keyboardType='number-pad'
                        autoCapitalize="none"
                        value={agencyNumber}
                        onChangeText={(value) => setAgencyNumber(value)}
                    />
                </View>
                <View style={styles.formContent}>
                    <Text style={styles.label}>Conta</Text>
                    <TextInput style={styles.input}
                        placeholder='Digite sua conta'
                        keyboardType='number-pad'
                        autoCapitalize="none"
                        value={accountNumber}
                        onChangeText={(value) => setAccountNumber(value)}
                    />
                </View>
                {bankNumber === '1' ?
                    <View style={styles.formContent}>
                        <Text style={styles.label}>Complemento da conta</Text>
                        <TextInput style={styles.input}
                            placeholder='Ex: 003'
                            keyboardType='twitter'
                            autoCapitalize="none"
                            value={accountComplementNumber}
                            onChangeText={(value) => setAccountComplementNumber(value)}
                        />
                    </View> : null}
                <View style={{ marginTop: 15 }}>
                    <Text style={[styles.label, { marginLeft: 15, position: 'absolute', top: -5, left: 0 }]}>Tipo da conta</Text>
                    <Picker
                        selectedValue={accountType}
                        onValueChange={(accountType) => setAccountType(accountType)}
                        mode="dropdown"
                        style={{ height: Platform.OS === 'android' ? 45 : 100, width: width - 10, marginLeft: 7, marginTop: Platform.OS === 'android' ? 8 : 3 }}
                        itemStyle={{
                            fontSize: 18,
                            fontFamily: 'NunitoSans_400Regular',
                            marginTop: 5,
                            marginBottom: 5,
                            color: '#484848',
                            height: Platform.OS === 'android' ? 45 : 100,
                        }}>
                        <Picker.Item label="Corrente" value="01" />
                        <Picker.Item label="Poupança" value="02" />
                    </Picker>
                    <View style={{ borderBottomColor: 'grey', borderBottomWidth: 0.3, marginHorizontal: 15 }} />
                </View>
                <View style={styles.formContent}>
                    <Text style={styles.label}>Nome do titular</Text>
                    <TextInput style={styles.input}
                        placeholder='Titular da conta'
                        keyboardType='twitter'
                        autoCapitalize="none"
                        value={accountHolder}
                        onChangeText={(value) => setAccountHolder(value)}
                    />
                </View>

            </ScrollView>
        </KeyboardAvoidingView>
    )
}

export const pageOptions = ({ navigation }) => {
    return {
        headerTitle: 'Dados Bancários',
        headerTitleAlign: 'center',
        headerTitleStyle: {
            color: 'grey',
            fontFamily: "NunitoSans_700Bold",
            textAlign: 'center',
        },
        headerBackTitleVisible: false,
        headerStyle: {
            backgroundColor: '#FFF',
            height: 75,

        },
        headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.goBack()} >
                <AntDesign name="arrowleft" size={25} color="grey" style={{ marginLeft: 10 }} />
            </TouchableOpacity>
        ),
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fafafa'
    },
    label: {
        fontSize: 16,
        fontFamily: 'NunitoSans_700Bold',
        color: '#484848'
    },
    formContent: {
        marginTop: 15,
        borderBottomColor: 'grey',
        borderBottomWidth: 0.3,
        marginHorizontal: 15

    },
    input: {
        fontSize: 18,
        fontFamily: 'NunitoSans_400Regular',
        marginTop: 5,
        marginBottom: 10,
        color: '#484848'
    }
})

const mapDispatchToProps = (dispatch) => ({
    dispatchGetMe: () => dispatch(getMe()),
    dispatchUpdateUserAction: (id, bankData, onSuccess, onError) =>
        dispatch(updateUser(id, { bankData }, onSuccess, onError))
});

const mapStateToProps = (state) => ({
    getme: state.getme,
});

export default connect(mapStateToProps, mapDispatchToProps)(BankDataPage)