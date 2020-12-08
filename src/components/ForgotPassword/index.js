import React from 'react'
import { Container, MainContent, ModalHeader, Title, RegularText, TextContent } from './styles'
import { View, Text } from 'react-native'

import { AntDesign } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import KeyboardButton from '../../components/KeyboardButton'

const ForgotPassword = ({ setForgotPassword }) => {
    return (
        <Container>
            <MainContent>
                <ModalHeader>
                    <AntDesign
                        name="close"
                        size={30}
                        color="#fff"
                        onPress={() => setForgotPassword(false)}
                        style={{ alignSelf: 'flex-start', marginLeft: '4%', marginTop: '4%' }}
                    />
                    <Feather name="mail" size={100} color="#fff" style={{ alignSelf: 'center' }} />
                </ModalHeader>
                <Title>Verifique seu e-mail</Title>
                <RegularText>Enviamos um link para troca de senha para o email cadastrado com seu CPF.</RegularText>
                <View style={{ flex: 1, justifyContent: 'flex-end' }}>
                    <KeyboardButton
                        name="Fechar"
                        textColor="#523BE4"
                        borderColor="grey"
                        onPress={() => setForgotPassword(false)}
                    />
                </View>
            </MainContent>
        </Container>
    )
}

export default ForgotPassword