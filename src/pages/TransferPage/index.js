import React, { useState } from 'react'
import { View, Text, KeyboardAvoidingView, TouchableOpacity, Platform, StyleSheet } from 'react-native'
import { useHeaderHeight } from '@react-navigation/stack';

import { TextInputMask } from "react-native-masked-text";
import * as Animatable from "react-native-animatable";
import { Feather } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";

import GradientButton from '../../components/GradientButton'

const TransferPage = () => {
    const [transferValue, setTransferValue] = useState('')
    const [confirm, setConfirm] = useState(false)
    return (
        <KeyboardAvoidingView keyboardVerticalOffset={useHeaderHeight()} behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.mainContainer}>

            <View style={styles.formContainer}>
                <TextInputMask
                    keyboardType='number-pad'
                    placeholder='R$ 0,00'
                    autoFocus={true}
                    blurOnSubmit={false}
                    type={'money'}
                    options={{
                        precision: 2,
                        separator: ',',
                        delimiter: '.',
                        unit: 'R$ ',
                        suffixUnit: ''
                    }}
                    value={transferValue}
                    onChangeText={text => setTransferValue(text)}
                    maxLength={11}
                    style={{ fontSize: 26, fontFamily: 'NunitoSans_700Bold', color: '#484848', width: 150 }}
                />
            </View>
            {transferValue.length >= 6 ? (
                <Animatable.View animation="fadeInUp" style={{ flex: 1, marginHorizontal: 15, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    <View>
                        <Text style={styles.confirmText}>Banco: Itaú</Text>
                        <Text style={styles.confirmText}>Agência: 0000 Conta: 0000-0</Text>
                        <Text style={styles.confirmText}>Valor: {transferValue}</Text>
                    </View>
                    <View>
                        <TouchableOpacity onPress={() => setConfirm(!confirm)}>
                            {confirm ? (
                                <MaterialIcons
                                    name="check-circle"
                                    size={30}
                                    color="#00A699"
                                />
                            ) : (
                                    <Feather name="circle" size={30} color="#00A699" />
                                )}
                        </TouchableOpacity>
                    </View>
                </Animatable.View>
            ) : null}
            <View style={styles.buttonContainer}>
                {confirm ?
                    <GradientButton
                        title="Continuar"
                        gradient={["#00A699", "#00A699"]}
                        onPress={() => { }}
                    />
                    :
                    <GradientButton
                        onPress={() => { }}
                        gradient={["#E8E8E8", "#E8E8E8"]}
                        title="Confirmar"
                        textStyle={{ color: "#767676" }}
                    />
                }

            </View>
        </KeyboardAvoidingView>
    )
}

export const pageOptions = {
    headerTitle: 'Transferência',
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
        <View style={{ paddingRight: 15, paddingTop: 10, alignItems: 'flex-end' }}>
            <Text style={{ fontSize: 14, fontFamily: 'NunitoSans_400Regular' }}>Meu saldo</Text>
            <Text style={{ fontSize: 17, fontFamily: 'NunitoSans_700Bold', color: '#00A699' }}>R$ 300,00</Text>
        </View>
    ),
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
    confirmText: {
        fontSize: 15,
        fontFamily: 'NunitoSans_400Regular'
    }
})

export default TransferPage