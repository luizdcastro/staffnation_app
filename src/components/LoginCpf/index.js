import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

import { cpf } from "cpf-cnpj-validator";
import { TextInputMask } from "react-native-masked-text";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

import GradientButton from "../../components/GradientButton";

const LoginCpf = ({ setCpfFormFilled, userCpf, setUserCpf }) => {
    const navigation = useNavigation();
    const [verifyUserCpf, setVerifyUserCpf] = useState("");

    const handleCpfInput = (text) => {
        if (cpf.isValid(text)) {
            setUserCpf(text);
            setVerifyUserCpf(true);
        } else {
            setVerifyUserCpf(false);
        }
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity
                style={styles.buttonClose}
                onPress={() => navigation.navigate("AuthPage")}
            >
                <Ionicons name="ios-arrow-back" size={30} color="#00A699" />
            </TouchableOpacity>
            <View style={{ flex: 1, justifyContent: "space-between" }}>
                <Text style={styles.title}>Para entrar, digite seu CPF</Text>
                <View>
                    <View style={{ flexDirection: "row", alignItems: "center" }}>
                        <TextInputMask
                            blurOnSubmit={false}
                            style={[
                                (verifyUserCpf === false) & (userCpf.length === 14)
                                    ? [styles.input, { color: "#ff5555" }]
                                    : styles.input,
                            ]}
                            type={"cpf"}
                            value={userCpf}
                            autoFocus={true}
                            keyboardType="number-pad"
                            onChangeText={(text) => {
                                handleCpfInput(text);
                                setUserCpf(text);
                            }}
                        />
                        {userCpf.length >= 1 ? (
                            <TouchableOpacity onPress={() => setUserCpf("")}>
                                <Ionicons name="ios-close-circle" size={25} color="#a8a8a8" />
                            </TouchableOpacity>
                        ) : null}
                    </View>
                    {(verifyUserCpf === false) & (userCpf.length === 14) ? (
                        <View style={styles.errorContainer}>
                            <Text style={styles.errorText}>CPF inválido</Text>
                        </View>
                    ) : null}
                </View>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.footerLink} onPress={() => navigation.navigate('RegisterPage')}>
                        <Text style={styles.footerText}>Ainda não tem conta? Começar</Text>
                        <Ionicons name="ios-arrow-forward" size={15} color="#00A699" />
                    </TouchableOpacity>
                    {verifyUserCpf ? (
                        <GradientButton
                            title="Continuar"
                            gradient={["#00A699", "#00A699"]}
                            onPress={() => setCpfFormFilled(true)}
                        />
                    ) : (
                            <GradientButton
                                onPress={() => { }}
                                gradient={["#E8E8E8", "#E8E8E8"]}
                                title="Continuar"
                                textStyle={{ color: "#767676" }}
                            />
                        )}
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    buttonClose: {
        marginTop: 35,
        paddingHorizontal: 15,
    },
    title: {
        fontSize: 24,
        fontFamily: "NunitoSans_400Regular",
        color: "#484848",
        marginTop: 10,
        paddingHorizontal: 15,
    },
    input: {
        fontSize: 24,
        color: "#484848",
        fontFamily: "NunitoSans_400Regular",
        width: "90%",
        height: 45,
        paddingHorizontal: 15,
        position: "relative",
    },
    inputClaear: {
        width: 50,
        height: 50,
    },
    errorContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-start",
        paddingHorizontal: 15,
        position: "absolute",
        top: 40,
    },
    errorText: {
        fontSize: 13,
        color: "#ff5555",
    },
    buttonContainer: {
        justifyContent: "flex-end",
        alignItems: "center",
        paddingBottom: 20,
    },
    footerLink: {
        alignSelf: 'flex-start',
        marginLeft: 15,
        marginBottom: 30,
        flexDirection: 'row',
        alignItems: 'center'
    },
    footerText: {
        fontFamily: 'NunitoSans_400Regular',
        fontSize: 15,
        color: '#484848',
        marginRight: 5
    }
});

export default LoginCpf;
