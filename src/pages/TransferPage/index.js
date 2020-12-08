import React, { useState } from 'react'
import { connect } from "react-redux";
import { View, Text, TouchableOpacity, Platform, StyleSheet, KeyboardAvoidingView, } from 'react-native'

import { TextInputMask } from "react-native-masked-text";
import * as Animatable from "react-native-animatable";

import { Feather } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { Ionicons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';

import Header from '../../components/Header'
import KeyboardButton from '../../components/KeyboardButton'

const TransferPage = ({ navigation, getme, setHome, setTransfer }) => {
    const [transferValue, setTransferValue] = useState(0)
    const [confirm, setConfirm] = useState(false)

    const LeftAction = () => (
        <TouchableOpacity onPress={() => { setHome(true); setTransfer(false) }} style={{ width: 50, height: 40, justifyContent: 'center', marginLeft: 10 }}>
            <AntDesign name="arrowleft" size={25} color="grey" />
        </TouchableOpacity >
    )

    const RightAction = () => (
        <View style={{ justifyContent: 'center', marginRight: 10, alignItems: 'center' }}>
            <Text style={{ fontFamily: 'NunitoSans_600SemiBold', color: "#484848" }}>Saldo</Text>
            <Text style={{ fontFamily: 'NunitoSans_700Bold', color: "#523BE4", fontSize: 15 }}>R$ {getme.data.totalCash.toFixed(2)}</Text>
        </View>
    )

    return (
        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.mainContainer} >
            <Header title="Transferência" letfIcon={<LeftAction />} rightIcon={<RightAction />} />
            <View style={styles.formContainer}>
                <TextInputMask
                    keyboardType='number-pad'
                    autoFocus={true}
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
            {
                transferValue.length > 2 ? (
                    <Animatable.View animation="fadeInLeft" style={{ marginHorizontal: 15, marginBottom: 30 }}>
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
                                                color="#523BE4"
                                            />
                                        ) : (
                                                <Feather name="circle" size={30} color="grey" />
                                            )}
                                    </TouchableOpacity>
                                </View>
                            </View>
                            :
                            <TouchableOpacity style={styles.noBankDataCard} onPress={() => { navigation.navigate('BankDataPage') }}>
                                <Text style={styles.noBankDataText}>Atualize seus dados bancários para continuar</Text>
                                <Ionicons name="ios-arrow-forward" size={28} color="#523BE4" />
                            </TouchableOpacity>
                        }
                    </Animatable.View>
                ) : null
            }
            <View style={styles.buttonContainer}>
                {!confirm ?
                    <KeyboardButton
                        name="Transferir"
                        textColor="grey"
                        borderColor="grey"
                        onPress={() => navigation.navigate('Transfer')}
                    />
                    :
                    <KeyboardButton
                        name="Transferir"
                        textColor="#523BE4"
                        borderColor="grey"
                        onPress={() => { }}
                    />
                }
            </View>
        </KeyboardAvoidingView >
    )
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
        alignItems: "center",
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