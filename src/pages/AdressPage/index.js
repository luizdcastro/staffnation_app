import React, { useState, useEffect } from 'react'
import { View, Text, Platform, StyleSheet, ScrollView, KeyboardAvoidingView, TextInput, TouchableOpacity } from 'react-native'
import { useHeaderHeight } from '@react-navigation/stack';

const AdressPage = () => {
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
                    <Text style={styles.label}>Endereço</Text>
                    <TextInput style={styles.label} placeholder='CEP' />
                    <View>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Text>{`${address.street}, Nº`}</Text>
                            <TextInput placeholder='00' />
                        </View>
                        <View>
                            <Text>{`${address.neighborhood}, ${address.city} - ${address.state}`}</Text>
                        </View>
                    </View>
                </View>
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
        fontSize: 15,
        fontFamily: 'NunitoSans_600SemiBold',
        color: '#484848'
    },
    formContent: {
        marginTop: 15,
        marginLeft: 15
    },
    input: {
        fontSize: 18,
        fontFamily: 'NunitoSans_400Regular',
        marginTop: 5,
        marginBottom: 10
    }
})

export default AdressPage