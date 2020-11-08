import React, { useState, useEffect } from 'react'
import { View, Text, Platform, StyleSheet, ScrollView, KeyboardAvoidingView, TextInput, TouchableOpacity } from 'react-native'
import { useHeaderHeight } from '@react-navigation/stack';
import { TextInputMask } from "react-native-masked-text";
import { Ionicons } from "@expo/vector-icons";



const AdressDataPage = () => {
    const [cep, setCep] = useState("");
    const [number, setNumber] = useState("");
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
        if (cep.length >= 8) {
            getUserAddress();
        }
    }, [cep]);

    useEffect(() => {
        if (number.length) {
            setAddress({ ...address, number: number });
        }
    }, [number]);
    return (
        <KeyboardAvoidingView style={styles.container} keyboardVerticalOffset={useHeaderHeight()} behavior={Platform.OS === "ios" ? "padding" : "height"}>
            <ScrollView>
                <View style={styles.formContent}>
                    <Text style={styles.label}>CEP</Text>
                    <TextInputMask
                        style={[
                            errorCep
                                ? [styles.input, { width: "90%", color: "#ff5555", marginBottom: 20, marginTop: 5 }]
                                : [styles.input, { width: "90%", color: '#484848', marginBottom: 20, marginTop: 5 }],
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
                    <View style={{ marginLeft: 15, marginTop: 20 }}>
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
                    </View> : null}
            </ScrollView>
        </KeyboardAvoidingView>
    )
}


export const pageOptions = {
    headerTitle: 'Meu Endereço',
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
        borderBottomWidth: 0.5,
        marginBottom: 10
    },
    input: {
        fontSize: 19,
        fontFamily: 'NunitoSans_400Regular',
        color: '#484848'
    },
    address: {
        fontSize: 19,
        fontFamily: 'NunitoSans_400Regular',
        color: '#484848',
    }
})

export default AdressDataPage