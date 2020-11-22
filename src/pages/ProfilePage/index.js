import React, { useEffect } from "react";
import { connect } from "react-redux";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";

import { Feather } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';

const ProfilePage = ({ navigation, getme }) => {

	useEffect(() => {
		navigation.setOptions({
			headerRight: () => (
				<TouchableOpacity style={{ paddingRight: 15 }} onPress={() => navigation.navigate('HelpPage')}>
					<Ionicons name="ios-help-circle-outline" size={30} color="#00A699" />
				</TouchableOpacity>
			),
		})
	}, [])

	return (
		<View style={styles.container}>
			<View style={styles.personalData}>
				<Image
					style={styles.avatar}
					source={{ uri: `${getme.data.avatar?.url}`, }}
				/>
				<View>
					<Text style={styles.name}>{getme.data.name}</Text>
					<TouchableOpacity onPress={() => navigation.navigate('AvatarPage')}>
						<Text style={styles.pictureText}>Alterar foto</Text>
					</TouchableOpacity>
				</View>
			</View>
			<View>
				<TouchableOpacity style={styles.button} onPress={() => navigation.navigate('PersonalDataPage')}>
					<Text style={styles.buttonText}>Informações Pessoais</Text>
					<Feather name="user" size={24} color="#00A699" />
				</TouchableOpacity>
				<TouchableOpacity style={styles.button} onPress={() => navigation.navigate('AdressDataPage')}>
					<Text style={styles.buttonText}>Meu Endereço</Text>
					<Feather name="map-pin" size={24} color="#00A699" />
				</TouchableOpacity>
				<TouchableOpacity style={styles.button} onPress={() => navigation.navigate('ProfessionalDataPage')}>
					<Text style={styles.buttonText}>Perfil Profissional</Text>
					<Feather name="award" size={24} color="#00A699" />
				</TouchableOpacity>
				<TouchableOpacity style={styles.button} onPress={() => navigation.navigate('BankDataPage')}>
					<Text style={styles.buttonText}>Dados Bancários</Text>
					<Feather name="dollar-sign" size={24} color="#00A699" />
				</TouchableOpacity>
			</View>
		</View>
	);
};


export const pageOptions = {
	headerTitle: 'Meu Perfil',
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
	container: {
		flex: 1,
		backgroundColor: '#fafafa'
	},
	personalData: {
		flexDirection: 'row',
		alignItems: 'center',
		marginTop: 25,
		marginBottom: 30
	},
	avatar: {
		width: 60,
		height: 60,
		borderRadius: 50,
		marginRight: 15,
		marginLeft: 20,
	},
	pictureText: {
		fontFamily: 'NunitoSans_700Bold',
		color: '#00A699',
		fontSize: 13
	},
	name: {
		fontFamily: "NunitoSans_700Bold",
		fontSize: 17,
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
		marginBottom: 20
	},
	buttonText: {
		fontFamily: 'NunitoSans_600SemiBold',
		color: '#484848'
	},

});

const mapStateToProps = (state) => ({
	getme: state.getme,
});

export default connect(mapStateToProps)(ProfilePage);
