import React, { useState } from 'react';
import { StatusBar, Dimensions, Platform } from 'react-native'

import LoginModal from '../../components/LoginModal'
import RegisterModal from '../../components/RegisterModal'
import DarkButton from '../../components/DarkButton'
import LightButton from '../../components/LightButton'
import { Container, Logo, ImageCover, Title, ButtonContainer } from './styles'
import * as Animatable from 'react-native-animatable';


const AuthPage = ({ navigation }) => {
	const [loginModal, setLoginModal] = useState(false)
	const [registerModal, setRegisterModal] = useState(false)

	return (
		<Container behavior={Platform.OS === "ios" ? "padding" : "height"} >
			<StatusBar barStyle='light-content' />
			<ImageCover source={require("../../assets/images/bar_01.png")}>
				{loginModal ?
					<Animatable.View style={{ width: '100%', height: '100%', zIndex: 1 }} animation="slideInUp">
						<LoginModal setLoginModal={setLoginModal} setRegisterModal={setRegisterModal} />
					</Animatable.View>
					: null
				}
				{registerModal ?
					<Animatable.View style={{ width: '100%', height: '100%', zIndex: 1 }} animation="slideInUp">
						<RegisterModal closeModal={() => setRegisterModal(false)} />
					</Animatable.View>
					: null
				}
				<Logo></Logo>
				<ButtonContainer>
					<Title>Lorem ipsum{"\n"}dolor adipiscing{"\n"}consectetur</Title>
					<DarkButton
						name="Criar sua conta"
						onPress={() => setRegisterModal(!registerModal)}
					/>
					<LightButton
						textColor="#FAFAFA"
						borderColor="#FAFAFA"
						name="Já tenho conta"
						onPress={() => setLoginModal(!loginModal)} />
				</ButtonContainer>
			</ImageCover>
		</Container>
	)
}
export default AuthPage