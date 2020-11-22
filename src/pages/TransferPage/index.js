import React, { useState, useEffect } from 'react'
import { connect } from "react-redux";
import { createStructuredSelector } from 'reselect';
import { View, Text, KeyboardAvoidingView, TouchableOpacity, Platform, StyleSheet } from 'react-native'
import { useHeaderHeight } from '@react-navigation/stack';

import { TextInputMask } from "react-native-masked-text";
import * as Animatable from "react-native-animatable";
import { Feather } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { Ionicons } from '@expo/vector-icons';

import GradientButton from '../../components/GradientButton'

const TransferPage = ({ navigation, getme }) => {
    const [transferValue, setTransferValue] = useState(0)
    const [confirm, setConfirm] = useState(false)

    useEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <View style={{ paddingRight: 15, paddingTop: 10, alignItems: 'flex-end' }}>
                    <Text style={{ fontSize: 14, fontFamily: 'NunitoSans_400Regular' }}>Meu saldo</Text>
                    <Text style={{ fontSize: 17, fontFamily: 'NunitoSans_700Bold', color: '#00A699' }}>R$ {getme.data.totalCash.toFixed(2)}</Text>
                </View>
            )
        })
    }, [transferValue])

    const format = amount => {
        return Number(amount)
            .toFixed(2)
            .replace(/\d(?=(\d{3})+\.)/g, '$&,');
    };

    return (
        <KeyboardAvoidingView keyboardVerticalOffset={useHeaderHeight()}
            behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.mainContainer}>
            <View style={styles.formContainer}>
                <TextInputMask
                    keyboardType='number-pad'
                    placeholder='R$ 0,00'
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
                    onChangeText={text => setTransferValue(text.toString().split(' ')[1])}
                    maxLength={11}
                    style={{ fontSize: 26, fontFamily: 'NunitoSans_700Bold', color: '#484848', width: 150 }}
                />
            </View>
            {transferValue.length > 2 ? (
                <Animatable.View animation="fadeInUp" style={{ marginHorizontal: 15, marginBottom: 30 }}>
                    {getme.data.bankData.name.length >= 2 & getme.data.bankData.agency >= 3 & getme.data.bankData.account >= 4 ?
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                            <View>
                                <Text style={styles.confirmText}>Banco: {getme.data.bankData.name}</Text>
                                <Text style={styles.confirmText}>Agência: {getme.data.bankData.agency} Conta: {getme.data.bankData.account}</Text>
                                <Text style={styles.confirmText}>Valor: R$ {transferValue}</Text>
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
                        </View>
                        :
                        <TouchableOpacity style={styles.noBankDataCard} onPress={() => navigation.navigate('BankDataPage')}>
                            <Text style={styles.noBankDataText}>Atualize seus dados bancários para continuar</Text>
                            <Ionicons name="ios-arrow-forward" size={28} color="#00A699" />
                        </TouchableOpacity>
                    }
                </Animatable.View>
            ) : null}
            <View style={styles.buttonContainer}>
                {confirm ?
                    <GradientButton
                        title="Transferir"
                        gradient={["#00A699", "#00A699"]}
                        onPress={() => { }}
                    />
                    :
                    <GradientButton
                        onPress={() => { }}
                        gradient={["#E8E8E8", "#E8E8E8"]}
                        title="Transferir"
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
    },
    noBankDataCard: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly',
    },
    noBankDataText: {
        fontFamily: 'NunitoSans_400Regular',
        fontSize: 15,
        color: '#484848'

    }
})
const mapStateToProps = (state) => ({
    getme: state.getme,
});

export default connect(mapStateToProps)(TransferPage)