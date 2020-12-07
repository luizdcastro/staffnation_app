import React, { useState, useEffect } from 'react'
import { connect } from "react-redux";
import {
    Container,
    ModalContent,
    LoginContent,
    Title,
    InputContainer,
    PasswordInput,
    TextLink,
    ErrorMessage
} from './styles'
import { View, TouchableOpacity, ActivityIndicator, Platform } from 'react-native'

import { cpf } from "cpf-cnpj-validator";
import { TextInputMask } from "react-native-masked-text";
import { AntDesign } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { EvilIcons } from '@expo/vector-icons';

import { loginUser } from '../../redux/actions/authActions'
import KeyboardButton from '../../components/KeyboardButton'

const LoginModal = ({ setRegisterModal, setLoginModal, dispatchLoginAction }) => {
    const [userCpf, setUserCpf] = useState("")
    const [verifyUserCpf, setVerifyUserCpf] = useState(false);
    const [isCpfFilled, setIsCpfFilled] = useState(false)
    const [userPassword, setUserPassword] = useState("");
    const [secureTextEntry, setSecureTextEntry] = useState(true);
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("")
    const [loading, setLoading] = useState(false);


    const handleCpfInput = (text) => {
        if (cpf.isValid(text)) {
            setUserCpf(text);
            setVerifyUserCpf(true);
        } else {
            setVerifyUserCpf(false);
        }
    };

    const handleLogin = (event) => {
        event.preventDefault();
        setLoading(true);
        dispatchLoginAction(
            userCpf,
            userPassword,
            (response) => { setError(false) },
            (response) => {
                setError(true);
                setErrorMessage(response.error)
            }
        );
    };

    useEffect(() => {
        if (error) {
            setLoading(false)
        }
    }, [error, loading])

    return (
        <Container >
            <ModalContent>
                {!isCpfFilled ?
                    <LoginContent >
                        <View>
                            <AntDesign
                                name="close"
                                size={30}
                                color="grey"
                                onPress={() => setLoginModal(false)}
                                style={{ alignSelf: 'flex-start', marginLeft: '3%' }}
                            />
                            <Title>Para entrar, digite seu CPF</Title>
                            <TextInputMask
                                type={"cpf"}
                                blurOnSubmit={false}
                                autoFocus={true}
                                value={userCpf}
                                keyboardType="number-pad"
                                onChangeText={(text) => {
                                    handleCpfInput(text);
                                    setUserCpf(text);
                                }}
                                style={{
                                    marginTop: '5%',
                                    marginLeft: '5%',
                                    height: 45,
                                    fontFamily: 'NunitoSans_400Regular',
                                    fontSize: 24,
                                    color: !verifyUserCpf & userCpf.length >= 14 ? "#BA000D" : "#484848"
                                }}
                            />
                        </View>
                        <View>
                            <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center' }}
                                onPress={() => {
                                    setLoginModal(false);
                                    setRegisterModal(true)
                                }}>
                                <TextLink>Ainda não tem conta? Começar</TextLink>
                                <EvilIcons name="chevron-right" size={22} color="grey" style={{ alignSelf: 'flex-start', marginTop: 2, marginLeft: -5 }} />
                            </TouchableOpacity>
                            {!verifyUserCpf ?
                                <KeyboardButton
                                    name="Continuar"
                                    textColor="grey"
                                    borderColor="grey"
                                />
                                :
                                <KeyboardButton
                                    name="Continuar"
                                    textColor="#523BE4"
                                    borderColor="grey"
                                    onPress={() => setIsCpfFilled(true)}
                                />
                            }
                        </View>
                    </LoginContent>
                    :
                    <LoginContent>
                        <View>
                            <AntDesign
                                name="arrowleft"
                                size={30}
                                color="grey"
                                style={{ alignSelf: 'flex-start', marginLeft: '4%' }}
                                onPress={() => setIsCpfFilled(false)}
                            />
                            <Title>Qual sua senha de acesso?</Title>
                            <InputContainer>
                                <PasswordInput
                                    autoFocus={true}
                                    blurOnSubmit={false}
                                    value={userPassword}
                                    keyboardType='number-pad'
                                    secureTextEntry={secureTextEntry}
                                    onChangeText={(val) => setUserPassword(val)}
                                />
                                {!secureTextEntry ?
                                    <MaterialCommunityIcons name="eye-outline" size={28} color="grey" onPress={() => setSecureTextEntry(true)} />
                                    :
                                    <MaterialCommunityIcons name="eye-off-outline" size={28} color="grey" onPress={() => setSecureTextEntry(false)} />}
                            </InputContainer>
                        </View>
                        <View>
                            {error ?
                                <ErrorMessage>{errorMessage}</ErrorMessage>
                                : null
                            }
                            <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <TextLink>Esqueci minha senha</TextLink>
                                <EvilIcons name="chevron-right" size={22} color="grey" style={{ alignSelf: 'flex-start', marginTop: 2, marginLeft: -5 }} />
                            </TouchableOpacity>
                            {userPassword.length < 6 ?
                                <KeyboardButton
                                    name="Entrar"
                                    textColor="grey"
                                    borderColor="grey"
                                />
                                : userPassword.length >= 6 & !loading ?
                                    <KeyboardButton
                                        onPress={handleLogin}
                                        name="Entrar"
                                        textColor="#523BE4"
                                        borderColor="grey"
                                    />
                                    : userPassword.length >= 6 & loading ?
                                        <KeyboardButton
                                            onPress={handleLogin}
                                            textColor="#523BE4"
                                            borderColor="grey"
                                            children={<ActivityIndicator style={{ paddingBottom: 10 }} size="large" color="#523BE4" animating={loading} />}
                                        />
                                        : null
                            }
                        </View>
                    </LoginContent>
                }
            </ModalContent>
        </Container>
    )
}

const mapDispatchToProps = (dispatch) => ({
    dispatchLoginAction: (cpf, password, onSuccess, onError) =>
        dispatch(loginUser({ cpf, password }, onSuccess, onError)),
});

export default connect(null, mapDispatchToProps)(LoginModal)