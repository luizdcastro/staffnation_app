
import React, { useState, useEffect } from 'react'
import { connect } from "react-redux";
import { View, Text, Platform, StyleSheet, ScrollView, KeyboardAvoidingView, TextInput, TouchableOpacity } from 'react-native'
import { useHeaderHeight } from '@react-navigation/stack';

import { AntDesign } from '@expo/vector-icons';
import { updateUser } from "../../redux/actions/userActions"
import { getMe } from "../../redux/actions/getMeActions"

const BankDataPage = ({ navigation, dispatchGetMe, dispatchUpdateUserAction, getme }) => {
    const [account, setAccount] = useState(getme.data.bankData.account)
    const [agency, setAgency] = useState(getme.data.bankData.agency)
    const [bank, setBank] = useState(getme.data.bankData.name)
    const data = {
        name: bank,
        agency: agency,
        account: account
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
    }, [account, agency, bank])

    return (
        <KeyboardAvoidingView style={styles.container} keyboardVerticalOffset={useHeaderHeight()} behavior={Platform.OS === "ios" ? "padding" : "height"}>
            <ScrollView>
                <View style={styles.formContent}>
                    <Text style={styles.label}>Banco</Text>
                    <TextInput style={styles.input}
                        keyboardType="default"
                        placeholder="Selecione seu banco"
                        value={bank}
                        onChangeText={(value) => setBank(value)}
                    />
                </View>

                <View style={styles.formContent}>
                    <Text style={styles.label}>Agência</Text>
                    <TextInput style={styles.input}
                        placeholder='Digite sua agência'
                        keyboardType='number-pad'
                        autoCapitalize="none"
                        value={agency}
                        onChangeText={(value) => setAgency(value)}
                    />
                </View>
                <View style={styles.formContent}>
                    <Text style={styles.label}>Conta</Text>
                    <TextInput style={styles.input}
                        placeholder='Digite sua conta'
                        keyboardType='number-pad'
                        autoCapitalize="none"
                        value={account}
                        onChangeText={(value) => setAccount(value)}
                    />
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    )
}

export const pageOptions = ({ navigation }) => {
    return {
        headerTitle: 'Dados Pessoais',
        headerTitleAlign: 'center',
        headerTitleStyle: {
            color: '#484848',
            fontFamily: "NunitoSans_700Bold",
            textAlign: 'center',
        },
        headerBackTitleVisible: false,
        headerStyle: {
            backgroundColor: '#FFF',
            height: Platform.OS === 'ios' ? 75 : 55,

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
        marginHorizontal: 15,
        borderBottomColor: 'grey',
        borderBottomWidth: 0.3
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