import React, { useState, useEffect } from 'react'
import { connect } from "react-redux";
import { View, Text, Platform, StyleSheet, ScrollView, KeyboardAvoidingView, TextInput, TouchableOpacity } from 'react-native'
import { useHeaderHeight } from '@react-navigation/stack';

import { updateUser } from "../../redux/actions/userActions"
import { getMe } from "../../redux/actions/getMeActions"

import { AntDesign } from '@expo/vector-icons';
import { TextInputMask } from "react-native-masked-text";

const PersonalDataPage = ({ getme, navigation, dispatchGetMe, dispatchUpdateUserAction }) => {
    const [name, setName] = useState(getme.data.name)
    const [date, setDate] = useState(getme.data.birthdayDate)
    const [email, setEmail] = useState(getme.data.email)
    const [phone, setPhone] = useState(getme.data.phone)
    const [gender, setGender] = useState(getme.data.gender)

    const hanleUpdateUser = (event) => {
        event.preventDefault();
        dispatchUpdateUserAction(
            getme.data._id,
            name,
            date,
            email,
            phone,
            () => dispatchGetMe(),
            (error) => console.log(error)
        )
        navigation.goBack();
    }

    useEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <TouchableOpacity style={{ paddingRight: 15 }} onPress={hanleUpdateUser}>
                    <Text style={{ fontSize: 17, fontFamily: 'NunitoSans_700Bold', color: '#523BE4' }}>Salvar</Text>
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
                    <Text style={styles.label}>Gênero</Text>
                    <Text style={styles.input}>{gender}</Text>
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

export const pageOptions = ({ navigation }) => {
    return {
        headerTitle: 'Dados Pessoais',
        headerTitleAlign: 'center',
        headerTitleStyle: {
            color: 'grey',
            fontFamily: "NunitoSans_700Bold",
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
    dispatchUpdateUserAction: (id, name, birthdayDate, email, phone, onSuccess, onError) =>
        dispatch(updateUser(id, { name, birthdayDate, email, phone }, onSuccess, onError))
});

const mapStateToProps = (state) => ({
    getme: state.getme,
});

export default connect(mapStateToProps, mapDispatchToProps)(PersonalDataPage)