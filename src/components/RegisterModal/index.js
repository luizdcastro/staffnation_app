import React, { useState, useEffect } from 'react'
import { connect } from "react-redux";
import {
    Container,
    ModalContent,
    RegisterContent,
    Title,
    GenderTitle,
    InputContainer,
    NameInput,
    PasswordInput,
    EmailInput,
    ErrorMessage,
} from './styles'
import { View, ActivityIndicator, ScrollView, Dimensions, Text, StyleSheet } from 'react-native'
import _ from "lodash";
import * as Animatable from 'react-native-animatable';


import moment from "moment"
import { cpf } from "cpf-cnpj-validator";
import { TextInputMask } from "react-native-masked-text";
import { AntDesign } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Feather } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";

import { registerUser } from "../../redux/actions/authActions";
import { getMe } from "../../redux/actions/getMeActions"

import KeyboardButton from '../../components/KeyboardButton'
import FormAddress from '../../components/FormAddress'
import SelectorCategory from '../../components/SelectorCategory'
import { TouchableOpacity } from 'react-native-gesture-handler';

const { width, height } = Dimensions.get('window')

const RegisterModal = ({ closeModal, dispatchRegisterUser, dispatchGetme }) => {

    // user registration data
    const [userCpf, setUserCpf] = useState("")
    const [userPassword, setUserPassword] = useState("");
    const [userConfirmPassword, setUserConfirmPassword] = useState("")
    const [name, setName] = useState("")
    const [birthdayDate, setBirthdayDate] = useState("")
    const [phone, setPhone] = useState("")
    const [email, setEmail] = useState("")
    const [address, setAddress] = useState("")
    const [gender, setGender] = useState('')

    // data validation 
    const [verifyUserCpf, setVerifyUserCpf] = useState(false);
    const [secureTextEntry, setSecureTextEntry] = useState(true);
    const [dateIsValid, setDateIsValid] = useState(true)
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("")
    const [loading, setLoading] = useState(false);

    // form filled verification
    const [isCpfFilled, setIsCpfFilled] = useState(false)
    const [isPasswordFilled, setIsPasswordFilled] = useState(false)
    const [isNameDateFilled, setIsNameDateFilled] = useState(false)
    const [isAddressFilled, setIsAddressFilled] = useState(false)
    const [isCategoryFilled, setIsCategoryFilled] = useState(false)
    const [isEmailPhoneFilled, setIsEmailPhoneFilled] = useState(false)

    //Select categories data from object
    const [segCardExpanded, setSegCardExpanded] = useState(false);
    const [segExperience, setSegExperience] = useState(0);
    const [segCertificate, setSegCertificate] = useState(false);
    const [barCardExpanded, setBarCardExpanded] = useState(false);
    const [barExperience, setBarExperience] = useState(0);
    const [barCertificate, setBarCertificate] = useState(false);
    const [hostCardExpanded, setHostCardExpanded] = useState(false);
    const [hostExperience, setHostExperience] = useState(0);
    const [hostCertificate, setHostCertificate] = useState(false);
    const [limpCarExpanded, setLimpCardExpanded] = useState(false);
    const [limpExprience, setLimpExperience] = useState(0);
    const [limpCertificate, setLimpCertificate] = useState(false);
    const [garCardExpanded, setGacCardExpanded] = useState(false);
    const [garExperience, setGarExperience] = useState(0);
    const [garCertificate, setGarCertificate] = useState(false);

    const [genderModal, setGenderModal] = useState(false)
    const [genderOptionMan, setGenderOptionMan] = useState(false)
    const [genderOptionWoman, setGenderOptionWoman] = useState(false)

    useEffect(() => {
        if (genderOptionMan) {
            setGender('Masculino')
        }
        if (genderOptionWoman) {
            setGender('Feminino')
        }

        if (!genderOptionMan & !genderOptionWoman) {
            setGender('')
        }
    }, [genderOptionMan, genderOptionWoman])

    const categories = [
        {
            id: 1,
            name: "segurança",
            certificado: segCertificate,
            experiencia: segExperience,
            selected: segCardExpanded,
        },
        {
            id: 2,
            name: "bar",
            certificado: barCertificate,
            experiencia: barExperience,
            selected: barCardExpanded,
        },
        {
            id: 3,
            name: "hostess",
            certificado: hostCertificate,
            experiencia: hostExperience,
            selected: hostCardExpanded,
        },
        {
            id: 4,
            name: "limpeza",
            certificado: limpCertificate,
            experiencia: limpExprience,
            selected: limpCarExpanded,
        },
        {
            id: 5,
            name: "garçom",
            certificado: garCertificate,
            experiencia: garExperience,
            selected: garCardExpanded,
        },
    ];

    const userCategories = _.filter(categories, ["selected", true]);

    // cpf format validation
    const handleCpfInput = (text) => {
        if (cpf.isValid(text)) {
            setUserCpf(text);
            setVerifyUserCpf(true);
        } else {
            setVerifyUserCpf(false);
        }
    };

    // date format validation
    useEffect(() => {
        if (birthdayDate.length === 10) {
            const value = moment(birthdayDate, "DD/MM/YYYY").isValid() &
                Number(birthdayDate.split('/')[2]) < 2020 &
                Number(birthdayDate.split('/')[2]) > 1850
            setDateIsValid(value)
        }
    }, [birthdayDate, dateIsValid])

    const handleRegistration = (event) => {
        event.preventDefault();
        setLoading(true)
        dispatchRegisterUser(
            userCpf,
            name,
            gender,
            birthdayDate,
            address,
            email,
            phone,
            userCategories,
            userPassword,
            userConfirmPassword,
            () => dispatchGetMe(),
            (response) => {
                setError(true);
                setErrorMessage(response)
            }
        );
    };

    useEffect(() => dispatchGetme(), [dispatchGetme])


    useEffect(() => {
        if (error === true) {
            setLoading(false)
            setError(false)
        }
    }, [error, loading])

    return (
        <Container>
            <ModalContent>
                {!isCpfFilled ? (
                    <RegisterContent>
                        <View>
                            <AntDesign
                                name="close"
                                size={30}
                                color="grey"
                                onPress={closeModal}
                                style={{ alignSelf: 'flex-start', marginLeft: '3%' }}
                            />
                            <Title>Vamos começar seu cadastro, qual seu CPF?</Title>
                            <TextInputMask
                                blurOnSubmit={false}
                                type={"cpf"}
                                value={userCpf}
                                autoFocus={true}
                                keyboardType="number-pad"
                                onChangeText={(text) => {
                                    handleCpfInput(text);
                                    setUserCpf(text);
                                }}
                                style={{
                                    marginTop: '5%',
                                    marginLeft: '5%',
                                    fontFamily: 'NunitoSans_400Regular',
                                    fontSize: 22,
                                    color: !verifyUserCpf & userCpf.length >= 14 ? "#BA000D" : "#484848"
                                }}
                            />
                        </View>
                        <View>
                            {!verifyUserCpf & userCpf.length >= 14 ?
                                <ErrorMessage>CPF inváliddo</ErrorMessage>
                                : null
                            }
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
                    </RegisterContent>
                ) : isCpfFilled & !isPasswordFilled ? (
                    <RegisterContent>
                        <View>
                            <AntDesign
                                name="arrowleft"
                                size={30}
                                color="grey"
                                style={{ alignSelf: 'flex-start', marginLeft: '4%' }}
                                onPress={() => setIsCpfFilled(false)}
                            />
                            <Title>Crie sua senha de acesso?</Title>
                            <InputContainer>
                                <PasswordInput
                                    placeholder="Senha"
                                    blurOnSubmit={false}
                                    autoFocus={true}
                                    autoCorrect={false}
                                    value={userPassword}
                                    underlineColorAndroid="transparent"
                                    keyboardType='number-pad'
                                    secureTextEntry={secureTextEntry}
                                    onChangeText={(val) => setUserPassword(val)}
                                />
                            </InputContainer>
                            <View style={{ alignItems: 'flex-end', marginRight: '5%' }}>
                                {!secureTextEntry ?

                                    <MaterialCommunityIcons name="eye-outline" size={28} color="grey" onPress={() => setSecureTextEntry(true)} />
                                    :
                                    <MaterialCommunityIcons name="eye-off-outline" size={28} color="grey" onPress={() => setSecureTextEntry(false)} />
                                }
                            </View>
                            <InputContainer>
                                <PasswordInput
                                    blurOnSubmit={false}
                                    placeholder="Confirmar senha"
                                    autoCorrect={false}
                                    underlineColorAndroid="transparent"
                                    value={userConfirmPassword}
                                    keyboardType='number-pad'
                                    secureTextEntry={secureTextEntry}
                                    onChangeText={(val) => setUserConfirmPassword(val)}
                                />

                            </InputContainer>
                        </View>
                        <View>
                            {userPassword.length < 6 & userConfirmPassword.length >= 1 ?
                                <ErrorMessage>Senha precisa conter no mínimo 6 digitos</ErrorMessage>
                                : userConfirmPassword.length >= 6 &
                                    userConfirmPassword.length >= userPassword.length &
                                    userConfirmPassword !== userPassword ?
                                    <ErrorMessage>A confirmação de senha está incorreta</ErrorMessage>
                                    : null

                            }
                            {userPassword.length >= 6 & userConfirmPassword === userPassword ?
                                <KeyboardButton
                                    name="Continuar"
                                    textColor="#523BE4"
                                    borderColor="grey"
                                    onPress={() => setIsPasswordFilled(true)}
                                />
                                :
                                <KeyboardButton
                                    name="Continuar"
                                    textColor="grey"
                                    borderColor="grey"
                                />
                            }
                        </View>
                    </RegisterContent>
                ) : isPasswordFilled & !isNameDateFilled ? (
                    <RegisterContent>
                        <View>
                            <AntDesign
                                name="arrowleft"
                                size={30}
                                color="grey"
                                style={{ alignSelf: 'flex-start', marginLeft: '4%' }}
                                onPress={() => setIsPasswordFilled(false)}
                            />
                            <Title>Digite seu nome completo, data de nascimento e sexo</Title>
                            {!genderModal ?
                                <View>
                                    <InputContainer>
                                        <NameInput
                                            placeholder="Nome completo"
                                            autoFocus={true}
                                            value={name}
                                            onChangeText={(value) => setName(value)}
                                            maxLength={25}
                                            blurOnSubmit={false}
                                        />
                                    </InputContainer>
                                    <InputContainer>
                                        <TextInputMask
                                            placeholder="Data de nascimento"
                                            type={"datetime"}
                                            options={{
                                                format: "DD/MM/YYYY",
                                            }}
                                            value={birthdayDate}
                                            onChangeText={(value) => setBirthdayDate(value)}
                                            blurOnSubmit={false}
                                            style={{
                                                marginTop: '5%',
                                                fontFamily: 'NunitoSans_400Regular',
                                                fontSize: 22,
                                                width: '75%',
                                                color: !dateIsValid & birthdayDate.length === 10 ? "#BA000D" : "#484848"
                                            }}
                                        />
                                    </InputContainer>
                                    <InputContainer>
                                        <TouchableOpacity style={{ marginTop: 18, width: 150, height: 35 }} onPress={() => setGenderModal(true)}>
                                            <GenderTitle style={!gender.length >= 1 ? styles.genderInputText : [styles.genderInputText, { color: '#484848' }]}>
                                                {gender.length >= 1 ? `${gender}` : 'Sexo'}
                                            </GenderTitle>
                                        </TouchableOpacity>
                                    </InputContainer>

                                </View> :
                                <Animatable.View animation='slideInLeft'>
                                    <InputContainer>
                                        <TouchableOpacity
                                            style={styles.genderCard}
                                            onPress={() => {
                                                setGenderOptionMan(!genderOptionMan);
                                                setGenderOptionWoman(false)
                                                setGenderModal(false)
                                            }}>
                                            <Text style={styles.genderTitle}>Maculino</Text>
                                            {!genderOptionMan ? <Feather name="circle" size={25} color="grey" /> :
                                                <MaterialIcons name="check-circle" size={25} color="#523BE4" />}
                                        </TouchableOpacity>
                                    </InputContainer>
                                    <InputContainer>
                                        <TouchableOpacity
                                            style={styles.genderCard}
                                            onPress={() => {
                                                setGenderOptionWoman(!genderOptionWoman);
                                                setGenderOptionMan(false)
                                                setGenderModal(false)
                                            }}>
                                            <Text style={styles.genderTitle}>Feminino</Text>
                                            {!genderOptionWoman ? <Feather name="circle" size={25} color="grey" /> :
                                                <MaterialIcons name="check-circle" size={25} color="#523BE4" />}
                                        </TouchableOpacity>
                                    </InputContainer>
                                </Animatable.View>
                            }

                        </View>
                        <View>
                            {name.length < 3 & birthdayDate.length >= 1 ?
                                <ErrorMessage>O nome informado é inváliddo</ErrorMessage>
                                : !dateIsValid & birthdayDate.length === 10 & name.length >= 3 ?
                                    <ErrorMessage>A data informada está incorreta</ErrorMessage>
                                    : null
                            }
                            {dateIsValid & birthdayDate.length === 10 & name.length >= 3 ?
                                <KeyboardButton
                                    name="Continuar"
                                    textColor="#523BE4"
                                    borderColor="grey"
                                    onPress={() => setIsNameDateFilled(true)}
                                />
                                :
                                <KeyboardButton
                                    name="Continuar"
                                    textColor="grey"
                                    borderColor="grey"
                                />
                            }
                        </View>
                    </RegisterContent>
                ) : isNameDateFilled & !isAddressFilled ? (
                    <FormAddress
                        setIsNameDateFilled={setIsNameDateFilled}
                        setIsAddressFilled={setIsAddressFilled}
                        address={address}
                        setAddress={setAddress} />

                ) : isAddressFilled & !isCategoryFilled ? (

                    <RegisterContent>
                        <View>
                            <AntDesign
                                name="arrowleft"
                                size={30}
                                color="grey"
                                style={{ alignSelf: 'flex-start', marginLeft: '4%' }}
                                onPress={() => setIsAddressFilled(false)}
                            />
                            <Title>Selecione até duas categorias que você gostaria trabalhar</Title>
                            <ScrollView style={{ height: '70%' }}>
                                <View>
                                    <SelectorCategory
                                        title="Segurança"
                                        setCardExpanded={setSegCardExpanded}
                                        setCertificate={setSegCertificate}
                                        setExperience={setSegExperience}
                                        cardExpanded={segCardExpanded}
                                        experience={segExperience}
                                        certificate={segCertificate}
                                        categoriesLimit={userCategories.length}
                                    />
                                    <SelectorCategory
                                        title="Bar"
                                        setCardExpanded={setBarCardExpanded}
                                        setCertificate={setBarCertificate}
                                        setExperience={setBarExperience}
                                        cardExpanded={barCardExpanded}
                                        experience={barExperience}
                                        certificate={barCertificate}
                                        categoriesLimit={userCategories.length}
                                    />
                                    <SelectorCategory
                                        title="Hostess"
                                        setCardExpanded={setHostCardExpanded}
                                        setCertificate={setHostCertificate}
                                        setExperience={setHostExperience}
                                        cardExpanded={hostCardExpanded}
                                        experience={hostExperience}
                                        certificate={hostCertificate}
                                        categoriesLimit={userCategories.length}
                                    />
                                    <SelectorCategory
                                        title="Limpeza"
                                        setCardExpanded={setLimpCardExpanded}
                                        setCertificate={setLimpCertificate}
                                        setExperience={setLimpExperience}
                                        cardExpanded={limpCarExpanded}
                                        experience={limpExprience}
                                        certificate={limpCertificate}
                                        categoriesLimit={userCategories.length}
                                    />
                                    <SelectorCategory
                                        title="Garçom"
                                        setCardExpanded={setGacCardExpanded}
                                        setCertificate={setGarCertificate}
                                        setExperience={setGarExperience}
                                        cardExpanded={garCardExpanded}
                                        experience={garExperience}
                                        certificate={garCertificate}
                                        categoriesLimit={userCategories.length}
                                    />
                                </View>
                            </ScrollView>

                        </View>
                        <View>
                            {userCategories.length >= 1 ?
                                <KeyboardButton
                                    name="Continuar"
                                    textColor="#523BE4"
                                    borderColor="grey"
                                    onPress={() => setIsCategoryFilled(true)}
                                /> :
                                <KeyboardButton
                                    name="Continuar"
                                    textColor="grey"
                                    borderColor="grey"
                                />
                            }
                        </View>
                    </RegisterContent>
                ) : isCategoryFilled & !isEmailPhoneFilled ? (
                    <RegisterContent>
                        <View>
                            <AntDesign
                                name="arrowleft"
                                size={30}
                                color="grey"
                                style={{ alignSelf: 'flex-start', marginLeft: '4%' }}
                                onPress={() => setIsCategoryFilled(false)}
                            />
                            <Title>Para finalizar, informe seu email e número de telefone com DDD</Title>
                            <InputContainer>
                                <EmailInput
                                    autoFocus={true}
                                    keyboardType="email-address"
                                    autoCapitalize="none"
                                    placeholder="Email"
                                    value={email}
                                    onChangeText={(value) => setEmail(value)}
                                    maxLength={30}
                                    blurOnSubmit={false}
                                />
                            </InputContainer>
                            <InputContainer>
                                <TextInputMask
                                    placeholder="Telefone"
                                    type={"cel-phone"}
                                    options={{
                                        maskType: "BRL",
                                        withDDD: true,
                                        dddMask: "(99) ",
                                    }}
                                    value={phone}
                                    onChangeText={(value) => setPhone(value)}
                                    blurOnSubmit={false}
                                    style={{
                                        marginTop: '5%',
                                        fontFamily: 'NunitoSans_400Regular',
                                        fontSize: 22,
                                        width: '75%',
                                        color: "#484848"
                                    }}
                                />
                            </InputContainer>
                        </View>
                        <View>
                            {error ?
                                <ErrorMessage>{errorMessage}</ErrorMessage>
                                : null
                            }
                            {phone.length >= 2 & (!email.includes("@") || !email.includes(".") || !email.length > 8) ?
                                <ErrorMessage>O email informado é inválido</ErrorMessage>
                                : null
                            }
                            {!loading & email.includes("@") & email.includes(".") & email.length > 8 & (phone.length >= 14) ?
                                <KeyboardButton
                                    name="Cadastrar"
                                    textColor="#523BE4"
                                    borderColor="grey"
                                    onPress={handleRegistration}
                                />

                                : loading & email.includes("@") & email.includes(".") & email.length > 8 & (phone.length >= 14) ?
                                    <KeyboardButton
                                        onPress={() => { }}
                                        textColor="#523BE4"
                                        borderColor="grey"
                                        children={<ActivityIndicator style={{ paddingBottom: 10 }} size="large" color="#523BE4" animating={loading} />}
                                    />
                                    :
                                    <KeyboardButton
                                        name="Cadastrar"
                                        textColor="grey"
                                        borderColor="grey"
                                    />
                            }
                        </View>

                    </RegisterContent>
                ) : null
                }
            </ModalContent>
        </Container>
    )
}

const styles = StyleSheet.create({
    genderCard: {
        width: width - 30,
        height: 60,
        backgroundColor: "#fff",
        elevation: 1,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 0.5,
        },
        shadowOpacity: 0.09,
        shadowRadius: 0.5,
        elevation: 0.5,
        marginBottom: 8,
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20
    },
    genderTitle: {
        fontSize: 18,
        fontFamily: 'NunitoSans_600SemiBold',
        color: "#484848"
    }
})

const mapDispatchToProps = (dispatch) => ({
    dispatchRegisterUser: (
        cpf,
        name,
        gender,
        birthdayDate,
        address,
        email,
        phone,
        categories,
        password,
        confirmPassword,
        onSuccess,
        onError
    ) =>
        dispatch(
            registerUser(
                {
                    cpf,
                    name,
                    gender,
                    birthdayDate,
                    address,
                    email,
                    phone,
                    categories,
                    password,
                    confirmPassword,
                },
                onSuccess,
                onError
            )
        ),
    dispatchGetme: () => dispatch(getMe())
});


export default connect(null, mapDispatchToProps)(RegisterModal)