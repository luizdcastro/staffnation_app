import * as React from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from 'reselect';
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";

import { selectUserData } from '../../redux/reducers/user/userSelector'

import { Feather } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';

const ProfilePage = ({ navigation, user }) => {

	return (
		<View style={styles.container}>
			<View style={styles.personalData}>
				<Image
					style={styles.avatar}
					source={{ uri: `${user.data.avatar?.url}`, }}
				/>
				<View>
					<Text style={styles.name}>{user.data.name}</Text>
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
	headerRight: () => (
		<TouchableOpacity style={{ paddingRight: 15 }}>
			<Ionicons name="ios-help-circle-outline" size={28} color="#00A699" />
		</TouchableOpacity>
	),
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

const mapStateToProps = createStructuredSelector({
	user: selectUserData,
});

export default connect(mapStateToProps)(ProfilePage);
