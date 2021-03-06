import React, { useState, useEffect } from 'react'
import { connect } from "react-redux";
import { View, Text, Platform, StyleSheet, ScrollView, KeyboardAvoidingView, TextInput, TouchableOpacity } from 'react-native'
import { useHeaderHeight } from '@react-navigation/stack';
import * as Animatable from "react-native-animatable";

import { updateUser } from "../../redux/actions/userActions"
import { getMe } from "../../redux/actions/getMeActions"

import { AntDesign } from '@expo/vector-icons';
import { TextInputMask } from "react-native-masked-text";

const AdressDataPage = ({ getme, navigation, dispatchUpdateUserAction, dispatchGetMe }) => {
    const [cep, setCep] = useState(getme.data.address.cep);
    const [number, setNumber] = useState(getme.data.address.number);
    const [address, setAddress] = useState({})
    const [errorCep, setErrorCep] = useState(false);

    const getUserAddress = () => {
        fetch(`https://viacep.com.br/ws/${cep}/json/`)
            .then((res) => res.json())
            .then((data) => {
                if (data.erro) {
                    setErrorCep(true);
                    setAddress({});
                } else {
                    setErrorCep(false);
                    setAddress({
                        cep: data.cep,
                        street: data.logradouro,
                        neighborhood: data.bairro,
                        city: data.localidade,
                        state: data.uf,
                        number: "",
                    });
                }
            });
    };

    useEffect(() => {
        if (cep?.length >= 8) {
            getUserAddress();
        }
    }, [cep]);

    useEffect(() => {
        if (number?.length) {
            setAddress({ ...address, number: number });
        }
    }, [number]);

    const handleUpdateAddress = (event) => {
        event.preventDefault();
        dispatchUpdateUserAction(
            getme.data._id,
            address,
            () => dispatchGetMe(),
            (error) => console.log(error)
        )
        navigation.goBack();
    }

    useEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <TouchableOpacity style={{ paddingRight: 15 }} onPress={handleUpdateAddress}>
                    <Text style={{ fontSize: 17, fontFamily: 'NunitoSans_700Bold', color: '#523BE4' }}>Salvar</Text>
                </TouchableOpacity>
            )
        })
    }, [cep, number, address])

    return (
        <KeyboardAvoidingView style={styles.container} keyboardVerticalOffset={useHeaderHeight()} behavior={Platform.OS === "ios" ? "padding" : "height"}>
            <ScrollView>
                <View style={styles.formContent}>
                    <Text style={styles.label}>CEP</Text>
                    <TextInputMask
                        style={[
                            errorCep
                                ? [styles.input, { width: "90%", color: "#ff5555", marginBottom: 10, marginTop: 5 }]
                                : [styles.input, { width: "90%", color: '#484848', marginBottom: 10, marginTop: 5 }],
                        ]}
                        type={"zip-code"}
                        value={cep}
                        onChangeText={(value) => setCep(value.replace("-", ""))}
                        blurOnSubmit={false}
                        autoFocus={true}
                        placeholder="Digite seu CEP"
                    />
                </View>
                {address.cep ?
                    <Animatable.View animation="fadeInUp" style={{ paddingHorizontal: 15, marginTop: 20 }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Text style={[styles.address, { marginRight: 10 }]}>{`${address.street}, Nº`}</Text>
                            <TextInput
                                style={styles.input}
                                placeholder=""
                                autoFocus={true}
                                keyboardType="number-pad"
                                blurOnSubmit={false}
                                value={number}
                                onChangeText={(value) => setNumber(value)}
                                maxLength={6}
                            />
                        </View>
                        <View>
                            <Text style={styles.address}>{`${address.neighborhood}, ${address.city} - ${address.state}`}</Text>
                        </View>
                    </Animatable.View > : null}
            </ScrollView>
        </KeyboardAvoidingView>
    )
}

export const pageOptions = ({ navigation }) => {
    return {
        headerTitle: 'Meu Endereço',
        headerTitleAlign: 'center',
        headerTitleStyle: {
            color: 'grey',
            fontFamily: "NunitoSans_700Bold",
            textAlign: 'center',
        },
        headerBackTitleVisible: false,
        headerStyle: {
            backgroundColor: '#fff',
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
        color: '#484848',
        width: 120
    },
    address: {
        fontSize: 18,
        fontFamily: 'NunitoSans_400Regular',
        color: '#484848',
    }
})

const mapDispatchToProps = (dispatch) => ({
    dispatchGetMe: () => dispatch(getMe()),
    dispatchUpdateUserAction: (id, address, onSuccess, onError) =>
        dispatch(updateUser(id, { address }, onSuccess, onError))
});

const mapStateToProps = (state) => ({
    getme: state.getme,
});

export default connect(mapStateToProps, mapDispatchToProps)(AdressDataPage)