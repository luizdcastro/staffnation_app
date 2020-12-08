import React, { useEffect } from "react";
import { connect } from "react-redux";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";

import { Feather } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import Header from '../../components/Header'

import { logoutUser } from '../../redux/actions/authActions'
import { getMe } from "../../redux/actions/getMeActions"

const ProfilePage = ({ navigation, getme, dispatchGetMe, dispatchLogoutAction, setHome, setProfile }) => {

	useEffect(() => {
		dispatchGetMe()
	}, [dispatchGetMe])

	const handleLogOut = (event) => {
		event.preventDefault();
		dispatchLogoutAction()
	}

	const LeftAction = () => (
		<TouchableOpacity onPress={() => { navigation.navigate('BottomTabPage'); setHome(true); setProfile(false) }} style={{ marginLeft: 10 }}>
			<AntDesign name="arrowleft" size={25} color="grey" />
		</TouchableOpacity>
	)

	return (
		<View style={styles.container}>
			<Header title="Configurações" letfIcon={<LeftAction />} />
			<View style={styles.personalData}>
				<TouchableOpacity style={{ justifyContent: 'center', alignItems: 'center' }} onPress={() => navigation.navigate('AvatarPage')}>
					<Image
						style={styles.avatar}
						source={{ uri: `${getme.data?.avatar.url}`, }}
					/>
					<Text style={styles.pictureText}>Editar</Text>
				</TouchableOpacity>
				<View style={{ marginBottom: 15, marginLeft: 12 }}>
					<Text style={styles.name}>{getme.data.name}</Text>
					<View style={{ flexDirection: 'row', alignItems: 'center', }} >
						<Text style={styles.rate}>{getme.data?.rating.toFixed(2)}</Text>
						<Ionicons name="ios-star" size={13} color="#767676" />
					</View>
				</View>
			</View>
			<View>
				<TouchableOpacity style={styles.button} onPress={() => navigation.navigate('PersonalDataPage')}>
					<View style={{ flexDirection: 'row', alignItems: 'center' }}>
						<Feather name="user" size={22} color="#523BE4" />
						<Text style={styles.buttonText}>Informações Pessoais</Text>
					</View>
					<Feather name="chevron-right" size={22} color="grey" />
				</TouchableOpacity>
				<TouchableOpacity style={styles.button} onPress={() => navigation.navigate('AdressDataPage')}>
					<View style={{ flexDirection: 'row', alignItems: 'center' }}>
						<Feather name="map-pin" size={22} color="#523BE4" />
						<Text style={styles.buttonText}>Meu Endereço</Text>
					</View>
					<Feather name="chevron-right" size={22} color="grey" />
				</TouchableOpacity>
				<TouchableOpacity style={styles.button} onPress={() => navigation.navigate('ProfessionalDataPage')}>
					<View style={{ flexDirection: 'row', alignItems: 'center' }}>
						<Feather name="award" size={22} color="#523BE4" />
						<Text style={styles.buttonText}>Perfil Profissional</Text>
					</View>
					<Feather name="chevron-right" size={22} color="grey" />
				</TouchableOpacity>
				<TouchableOpacity style={styles.button} onPress={() => navigation.navigate('BankDataPage')}>
					<View style={{ flexDirection: 'row', alignItems: 'center' }}>
						<Feather name="dollar-sign" size={22} color="#523BE4" />
						<Text style={styles.buttonText}>Dados Bancários</Text>
					</View>
					<Feather name="chevron-right" size={22} color="grey" />
				</TouchableOpacity>
			</View>
			<TouchableOpacity style={styles.button} onPress={handleLogOut}>
				<View style={{ flexDirection: 'row', alignItems: 'center' }}>
					<Feather name="log-out" size={22} color="#523BE4" />
					<Text style={styles.buttonText}>Sair</Text>
				</View>
				<Feather name="chevron-right" size={22} color="grey" />
			</TouchableOpacity>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fafafa'
	},
	personalData: {
		flexDirection: 'row',
		alignItems: 'center',
		marginTop: 15,
		marginBottom: 30,
		marginHorizontal: 15
	},
	avatar: {
		width: 65,
		height: 65,
		borderRadius: 50,
	},
	rate: {
		fontFamily: "NunitoSans_600SemiBold",
		color: '#484848',
		paddingRight: 5,
	},
	pictureText: {
		fontFamily: 'NunitoSans_700Bold',
		color: '#523BE4',
		fontSize: 12,
		marginTop: 5
	},
	name: {
		fontFamily: "NunitoSans_700Bold",
		fontSize: 18,
		color: '#484848',
		paddingBottom: 3
	},
	button: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		marginHorizontal: 20,
		paddingBottom: 10,
		borderBottomWidth: 0.3,
		borderBottomColor: '#484848',
		marginBottom: 20,

	},
	buttonText: {
		fontFamily: 'NunitoSans_600SemiBold',
		fontSize: 15,
		marginLeft: 10,
		color: '#484848',
	},

});

const mapDispatchToProps = (dispatch) => ({
	dispatchGetMe: () => dispatch(getMe()),
	dispatchLogoutAction: () => dispatch(logoutUser()),
});

const mapStateToProps = (state) => ({
	getme: state.getme,
});

export default connect(mapStateToProps, mapDispatchToProps)(ProfilePage);
