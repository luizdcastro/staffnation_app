import React, { useState, useEffect } from 'react'
import { connect } from "react-redux";
import { View, Text, Platform, StyleSheet, ScrollView, KeyboardAvoidingView, TextInput, TouchableOpacity } from 'react-native'
import { useHeaderHeight } from '@react-navigation/stack';
import Svg from "react-native-svg";
import { usePaymentInputs } from "react-native-payment-inputs";
import { AntDesign } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';

import { getMe } from "../../redux/actions/getMeActions"
import { createPaymentMethod } from '../../redux/actions/userActions'
import LightButton from '../../components/LightButton'
import IconVisa from '../../assets/svg/visa'
import IconMastercard from '../../assets/svg/mastercard'


const PaymentMethodPage = ({ getme, navigation, dispatchGetMe, dispatchCreatePaymentMethod }) => {
    const [name, setName] = useState()
    const [cardNumber, setCardNumber] = useState("");
    const [expiry, setExpiry] = useState("");
    const [cvc, setCvc] = useState("");
    const [error, setError] = useState("")
    const expireMonth = expiry.slice(0, 2)
    const expireYear = '20' + expiry.slice(5, 7)

    const {
        getCardNumberProps,
        getCardImageProps,
        getExpiryProps,
        getCvcProps,
        meta: {
            cardType,
            erroredInputs,
            touchedInputs,
        },
    } = usePaymentInputs();

    const handleCreatePaymentMethod = (event) => {
        event.preventDefault()
        dispatchCreatePaymentMethod(
            getme.data._id,
            name,
            cardNumber.replace(/\s/g, ''),
            cardType?.type,
            cvc,
            expireMonth,
            expireYear,
            (response) => { console.log(response); dispatchGetMe(); navigation.goBack() },
            (error) => { console.log(error); setError(error.error) }
        )
    }

    return (
        <KeyboardAvoidingView style={styles.container} keyboardVerticalOffset={useHeaderHeight()} behavior={Platform.OS === "ios" ? "padding" : "height"}>
            <ScrollView>
                {getme.data?.creditCard.cardBrand.length >= 2 ?
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around', backgroundColor: '#fff', marginHorizontal: 15, marginTop: 15, height: 50 }}>
                        {getme.data?.creditCard.cardBrand === 'visa' ?
                            <IconVisa />
                            : getme.data?.creditCard.cardBrand === 'mastercard' ?
                                <IconMastercard /> : null
                        }
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Feather name="more-horizontal" size={24} color="grey" />
                            <Feather name="more-horizontal" size={24} color="grey" />
                            <Feather name="more-horizontal" size={24} color="grey" style={{ marginRight: 5 }} />
                            <Text style={{ marginRight: 20, fontSize: 15 }}>{getme.data?.creditCard.last4CardNumber}</Text>
                        </View>
                        <Text style={{ fontSize: 15 }}>{getme.data?.creditCard.expirationMonth}/{getme.data?.creditCard.expirationYear}</Text>
                    </View>
                    : null}
                <View style={{ marginTop: 30, marginHorizontal: 15 }}>
                    <View style={{
                        flexDirection: 'row', justifyContent: "space-between", alignItems: 'center', marginBottom: 10, borderBottomColor: 'grey',
                        borderBottomWidth: 0.3,
                    }}>
                        <TextInput
                            {...getCardNumberProps({
                                onChangeText: setCardNumber,
                                value: cardNumber,
                                /* ...extras go here */
                            })}
                            blurOnSubmit={false}
                            autoFocus={true}
                            maxLength={19}
                            placeholder="Número do cartão"
                            style={styles.input}
                        />
                        <Svg
                            style={{ width: 50, height: 30 }}
                            {...getCardImageProps()}
                        />
                    </View>
                    <View style={{
                        flexDirection: 'row', justifyContent: "space-between", alignItems: 'center', marginBottom: 10, borderBottomColor: 'grey',
                        borderBottomWidth: 0.3,
                    }}>
                        <TextInput
                            {...getExpiryProps({
                                onChangeText: setExpiry,
                                value: expiry,
                            })}
                            blurOnSubmit={false}
                            style={styles.input}
                            placeholder="Válidade"
                        />
                        <TextInput
                            {...getCvcProps({
                                onChangeText: setCvc,
                                value: cvc,
                            })}
                            blurOnSubmit={false}
                            maxLength={3}
                            secureTextEntry={false}
                            style={styles.input}
                        />
                    </View>
                    <View style={{
                        flexDirection: 'row', justifyContent: "space-between", alignItems: 'center', marginBottom: 10, borderBottomColor: 'grey',
                        borderBottomWidth: 0.3,
                    }}>
                        <TextInput
                            blurOnSubmit={false}
                            placeholder="Nome do titular"
                            style={styles.input}
                            value={name}
                            onChangeText={(value) => setName(value)}
                        />
                    </View>
                    {error ? <Text style={styles.errorMessage}>{error}</Text> : null}
                    <View style={{ width: '100%', marginTop: 10 }}>
                        <LightButton
                            blurOnSubmit={false}
                            textColor="#523BE4"
                            borderColor="#523BE4"
                            name="Salvar Cartão"
                            onPress={handleCreatePaymentMethod} />
                    </View>
                </View>
            </ScrollView>
        </KeyboardAvoidingView >
    )
}

export const pageOptions = ({ navigation }) => {
    return {
        headerTitle: 'Método de Pagamento',
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
        color: '#484848',
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
        color: '#484848',
        minWidth: 120,
        height: 40
    },
    errorMessage: {
        fontSize: 13,
        color: '#BA000D',
        marginBottom: -5,
        marginTop: 5
    }
})

const mapDispatchToProps = (dispatch) => ({
    dispatchGetMe: () => dispatch(getMe()),
    dispatchCreatePaymentMethod: (id, holderName, cardNumber, cardBrand, securityCode, expirationMonth, expirationYear, onSuccess, onError) =>
        dispatch(createPaymentMethod({ id, holderName, cardNumber, cardBrand, securityCode, expirationMonth, expirationYear }, onSuccess, onError))
});

const mapStateToProps = (state) => ({
    getme: state.getme,
});

export default connect(mapStateToProps, mapDispatchToProps)(PaymentMethodPage)