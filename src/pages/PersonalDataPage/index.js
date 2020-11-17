import React, { useState, useEffect } from 'react'
import { connect } from "react-redux";
import { createStructuredSelector } from 'reselect';
import { View, Text, Platform, StyleSheet, ScrollView, KeyboardAvoidingView, TextInput, TouchableOpacity } from 'react-native'
import { useHeaderHeight } from '@react-navigation/stack';


import { selectUserData } from '../../redux/reducers/user/userSelector'
import { getUser, updateUser } from "../../redux/actions/userActions"

import { TextInputMask } from "react-native-masked-text";

const PersonalDataPage = ({ navigation, dispatchGetUserAction, dispatchUpdateUserAction, user }) => {
    const [name, setName] = useState(user.data.name)
    const [date, setDate] = useState(user.data.birthdayDate)
    const [email, setEmail] = useState(user.data.email)
    const [phone, setPhone] = useState(user.data.phone)

    const hanleUpdateUser = (event) => {
        event.preventDefault();
        dispatchUpdateUserAction(
            user.data._id,
            name,
            date,
            email,
            phone,
            async (response) => { await dispatchGetUserAction(user.data._id) },
            (error) => console.log(error)
        )
        navigation.navigate('ProfilePage')
    }

    console.log(user)

    useEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <TouchableOpacity style={{ paddingRight: 15 }} onPress={hanleUpdateUser}>
                    <Text style={{ fontSize: 17, fontFamily: 'NunitoSans_700Bold', color: '#00A699' }}>Salvar</Text>
                </TouchableOpacity>
            )
        })
    }, [name, date, email, phone])

    return (
        <KeyboardAvoidingView style={styles.container} keyboardVerticalOffset={useHeaderHeight()} behavior={Platform.OS === "ios" ? "padding" : "height"}>
            <ScrollView>
                <View style={styles.formContent}>
                    <Text style={styles.label}>Nome</Text>
                    <TextInput style={styles.input}
                        keyboardType="default"
                        placeholder="Digite seu nome"
                        value={name}
                        onChangeText={(value) => setName(value)}
                        maxLength={30} />
                </View>
                <View style={styles.formContent}>
                    <Text style={styles.label}>Data de nascimento</Text>
                    <TextInputMask
                        style={styles.input}
                        placeholder="Data de nascimento"
                        type={"datetime"}
                        options={{
                            format: "DD/MM/YYYY",
                        }}
                        value={date}
                        onChangeText={(value) => setDate(value)}
                    />
                </View>
                <View style={styles.formContent}>
                    <Text style={styles.label}>Email</Text>
                    <TextInput style={styles.input}
                        placeholder='Digite seu email'
                        keyboardType="email-address"
                        autoCapitalize="none"
                        value={email}
                        onChangeText={(value) => setEmail(value)}
                        maxLength={30}
                    />
                </View>
                <View style={styles.formContent}>
                    <Text style={styles.label}>Telefone</Text>
                    <TextInputMask
                        style={styles.input}
                        placeholder="Digite seu telefone"
                        type={"cel-phone"}
                        options={{
                            maskType: "BRL",
                            withDDD: true,
                            dddMask: "(99) ",
                        }}
                        value={phone}
                        onChangeText={(value) => setPhone(value)}
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
    dispatchUpdateUserAction: (id, name, birthdayDate, email, phone, onSuccess, onError) =>
        dispatch(updateUser(id, { name, birthdayDate, email, phone }, onSuccess, onError))
});

const mapStateToProps = createStructuredSelector({
    user: selectUserData,
});

export default connect(mapStateToProps, mapDispatchToProps)(PersonalDataPage)