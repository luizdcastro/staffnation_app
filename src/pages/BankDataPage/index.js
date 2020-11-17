
import React, { useState, useEffect } from 'react'
import { connect } from "react-redux";
import { createStructuredSelector } from 'reselect';
import { View, Text, Platform, StyleSheet, ScrollView, KeyboardAvoidingView, TextInput, TouchableOpacity } from 'react-native'
import { useHeaderHeight } from '@react-navigation/stack';


import { selectUserData } from '../../redux/reducers/user/userSelector'
import { getUser, updateUser } from "../../redux/actions/userActions"

import { TextInputMask } from "react-native-masked-text";
import { acc } from 'react-native-reanimated';

const BankDataPage = ({ navigation, dispatchGetUserAction, dispatchUpdateUserAction, user }) => {
    const [account, setAccount] = useState(user.data.bankData.account)
    const [agency, setAgency] = useState(user.data.bankData.agency)
    const [bank, setBank] = useState(user.data.bankData.name)
    const data = {
        name: bank,
        agency: agency,
        account: account
    }

    const hanleUpdateUser = (event) => {
        event.preventDefault();
        dispatchUpdateUserAction(
            user.data._id,
            data,
            async (response) => { await dispatchGetUserAction(user.data._id) },
            (error) => console.log(error)
        )
        navigation.navigate('ProfilePage')
    }

    useEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <TouchableOpacity style={{ paddingRight: 15 }} onPress={hanleUpdateUser}>
                    <Text style={{ fontSize: 17, fontFamily: 'NunitoSans_700Bold', color: '#00A699' }}>Salvar</Text>
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

export const pageOptions = {
    headerTitle: 'Dados Pessoais',
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

const mapDispatchToProps = (dispatch) => ({
    dispatchGetUserAction: (id) => dispatch(getUser(id)),
    dispatchUpdateUserAction: (id, bankData, onSuccess, onError) =>
        dispatch(updateUser(id, { bankData }, onSuccess, onError))
});

const mapStateToProps = createStructuredSelector({
    user: selectUserData,
});

export default connect(mapStateToProps, mapDispatchToProps)(BankDataPage)