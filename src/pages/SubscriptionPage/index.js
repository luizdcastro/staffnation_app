import React, { useState, useEffect } from 'react'
import { connect } from "react-redux";
import { View, Text, Platform, StyleSheet, ScrollView, KeyboardAvoidingView, TextInput, TouchableOpacity } from 'react-native'
import { useHeaderHeight } from '@react-navigation/stack';

import { updateUser } from "../../redux/actions/userActions"
import { getMe } from "../../redux/actions/getMeActions"

import { AntDesign } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import LightButton from '../../components/LightButton'
import IconVisa from '../../assets/svg/visa'
import IconMastercard from '../../assets/svg/mastercard'

const SubscriptionPage = ({ getme, navigation, dispatchGetMe, dispatchUpdateUserAction }) => {

    const hanleUpdateUser = (event) => {
        event.preventDefault();
        dispatchUpdateUserAction(
            getme.data._id,
            () => dispatchGetMe(),
            (error) => console.log(error)
        )
        navigation.goBack();
    }

    return (
        <KeyboardAvoidingView style={styles.container} keyboardVerticalOffset={useHeaderHeight()} behavior={Platform.OS === "ios" ? "padding" : "height"}>
            <ScrollView>
                <View style={styles.currentPlan}>
                    <View style={styles.currentPlanItem}>
                        <Text style={styles.label}>Plano atual</Text>
                        <Text style={styles.currentPlanText}>Básico</Text>
                    </View>
                    <View style={styles.currentPlanItem}>
                        <Text style={styles.label}>Valor</Text>
                        <Text style={styles.currentPlanText}>Grátis</Text>
                    </View>
                    <View style={styles.currentPlanItem}>
                        <Text style={styles.label}>Status</Text>
                        <Text style={styles.currentPlanText}>Ativo</Text>
                    </View>
                </View>
                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('PaymentMethodPage')}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        {getme.data?.creditCard?.cardBrand.length >= 2 ?
                            <View style={{ flexDirection: 'row' }}>
                                {getme.data?.creditCard.cardBrand === 'visa' ?
                                    <IconVisa />
                                    : getme.data?.creditCard.cardBrand === 'mastercard' ?
                                        <IconMastercard /> : null
                                }
                                <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 20 }}>
                                    <Feather name="more-horizontal" size={24} color="grey" />
                                    <Feather name="more-horizontal" size={24} color="grey" />
                                    <Feather name="more-horizontal" size={24} color="grey" style={{ marginRight: 5 }} />
                                    <Text style={{ marginRight: 20, fontSize: 15 }}>{getme.data?.creditCard.last4CardNumber}</Text>
                                </View>
                            </View>
                            :
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <Feather name="credit-card" size={26} color="grey" style={{ marginRight: 12 }} />
                                <Text style={styles.buttonText}>Método de Pagamento</Text>
                            </View>
                        }

                    </View>
                    <Feather name="chevron-right" size={22} color="grey" />
                </TouchableOpacity>
                <View style={{ marginHorizontal: 20, marginTop: 10 }}>
                    <Text style={[styles.label, { marginBottom: 20, textAlign: 'center' }]}>Upgrade para plano Profissional</Text>
                    <View style={styles.planItems}>
                        <Feather name="check" size={22} color="#523BE4" />
                        <Text style={styles.planItemText}>Preferência na busca por profissionais.</Text>
                    </View>
                    <View style={styles.planItems}>
                        <Feather name="check" size={22} color="#523BE4" />
                        <Text style={styles.planItemText}>Notificação de novas vagas.</Text>
                    </View>
                    <View style={styles.planItems}>
                        <Feather name="check" size={22} color="#523BE4" />
                        <Text style={styles.planItemText}>Aumente até 40% oportunidades de contratações.</Text>
                    </View>
                    <View style={styles.planItems}>
                        <Feather name="check" size={22} color="#523BE4" />
                        <Text style={styles.planItemText}>Tarifas reduzidas.</Text>
                    </View>
                    <View style={styles.planItems}>
                        <Feather name="check" size={22} color="#523BE4" />
                        <Text style={styles.planItemText}>Cancele a qualquer momento sem custos.</Text>
                    </View>
                    <View style={styles.planPrice}>
                        <Text style={styles.plamPriceText}>R$ 12,90 / Mensal</Text>
                    </View>
                    <View style={{ width: '100%' }}>
                        <LightButton
                            textColor="#523BE4"
                            borderColor="#523BE4"
                            name="Fazer Upgrade"
                            onPress={() => { }} />
                    </View>
                </View>
            </ScrollView>
        </KeyboardAvoidingView >
    )
}

export const pageOptions = ({ navigation }) => {
    return {
        headerTitle: 'Assinatura',
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
        marginBottom: 3
    },
    currentPlan: {
        flexDirection: 'row',
        marginHorizontal: 20,
        justifyContent: 'space-between',
        marginTop: 25
    },
    currentPlanItem: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    currentPlanText: {
        color: "#523BE4"
    },
    button: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginHorizontal: 20,
        paddingBottom: 15,
        borderBottomWidth: 0.3,
        borderBottomColor: '#484848',
        borderTopWidth: 0.3,
        borderTopColor: '#484848',
        paddingTop: 17,
        marginBottom: 20,
        marginTop: 25
    },
    planItems: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10
    },
    planItemText: {
        marginLeft: 12,
        fontSize: 13
    },
    planPrice: {
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 15,
        marginTop: 15,
        borderBottomWidth: 0.3,
        borderBottomColor: '#484848',
        paddingBottom: 20
    },
    plamPriceText: {
        marginLeft: 12,
        fontSize: 15,
        fontFamily: 'NunitoSans_700Bold',
        color: "#523BE4"
    }
})

const mapDispatchToProps = (dispatch) => ({
    dispatchGetMe: () => dispatch(getMe()),
    dispatchUpdateUserAction: (onSuccess, onError) =>
        dispatch(updateUser(onSuccess, onError))
});

const mapStateToProps = (state) => ({
    getme: state.getme,
});

export default connect(mapStateToProps, mapDispatchToProps)(SubscriptionPage)