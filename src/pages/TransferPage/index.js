import React, { useState } from 'react'
import { View, Text, KeyboardAvoidingView, Platform, StyleSheet } from 'react-native'
import { useHeaderHeight } from '@react-navigation/stack';
import { TextInputMask } from "react-native-masked-text";
import * as Animatable from "react-native-animatable";

import GradientButton from '../../components/GradientButton'

const TransferPage = () => {
    const [transferValue, setTransferValue] = useState('')
    return (
        <KeyboardAvoidingView keyboardVerticalOffset={useHeaderHeight()} behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.mainContainer}>
            <Text style={{ marginLeft: 15, marginTop: 20 }}>Saldo atual: 350,00</Text>
            <View style={styles.formContainer}>
                <TextInputMask
                    keyboardType='number-pad'
                    autoFocus={true}
                    blurOnSubmit={false}
                    type={'money'}
                    value={transferValue}
                    onChangeText={text => setTransferValue(text)}
                    maxLength={11}
                    style={{ fontSize: 25 }}
                    defaultValue=''
                />
            </View>
            {transferValue.length >= 8 ? (
                <Animatable.View animation="fadeInUp" style={{ flex: 1, marginLeft: 15 }}>

                    <Text>Banco: Itaú</Text>
                    <Text>Agência: 0000 Conta: 0000-0</Text>
                    <Text>Valor: R$ {transferValue}</Text>
                </Animatable.View>
            ) : null}
            <View style={styles.buttonContainer}>
                <GradientButton
                    onPress={() => { }}
                    gradient={["#E8E8E8", "#E8E8E8"]}
                    title="Transferir"
                    textStyle={{ color: "#767676" }}
                />
            </View>
        </KeyboardAvoidingView>
    )
}

export const pageOptions = {
    headerTitle: 'Transferir Saldo',
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
    mainContainer: {
        flex: 1,
        backgroundColor: "#fafafa",
    },
    formContainer: {
        flex: 1,
        justifyContent: "space-around",
        alignItems: 'center',
        borderTopEndRadius: 20,
        borderTopStartRadius: 20,
        backgroundColor: "#fafafa",
    },
    buttonContainer: {
        justifyContent: "flex-end",
        alignItems: "center",
        paddingBottom: Platform.OS === 'ios' ? 10 : 30
    },
})

export default TransferPage