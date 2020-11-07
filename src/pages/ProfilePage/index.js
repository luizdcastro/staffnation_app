import * as React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";

import { Feather } from '@expo/vector-icons';
import { color } from "react-native-reanimated";


const ProfilePage = ({ navigation }) => {
	return (
		<View style={styles.container}>
			<View style={styles.personalData}>
				<Image
					style={styles.avatar}
					source={{ uri: 'https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50.jpg' }}
				/>
				<View>
					<Text style={styles.name}>Luiz Castro</Text>
					<Text style={styles.pictureText}>Alterar foto</Text>
				</View>
			</View>
			<View>
				<TouchableOpacity style={styles.button}>
					<Text style={styles.buttonText}>Informações Pessoais</Text>
					<Feather name="user" size={24} color="#00A699" />
				</TouchableOpacity>
				<TouchableOpacity style={styles.button}>
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
		borderBottomColor: 'black',
		marginBottom: 20
	},
	buttonText: {
		fontFamily: 'NunitoSans_600SemiBold',
		color: '#484848'
	},

});

export default ProfilePage;
