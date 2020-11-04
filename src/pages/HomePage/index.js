import * as React from "react";
import { View, Text, TouchableOpacity, StatusBar, StyleSheet } from "react-native";
import { Feather } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';

const HomePage = ({ navigation }) => {
	return (
		<View style={styles.container}>
			<StatusBar barStyle='light-content' backgroundColor='#343d52' />
			<View style={styles.main}>
				<View>
				</View>
				<View style={styles.menu}>
					<View style={styles.menuItem}>
						<TouchableOpacity onPress={() => navigation.navigate('JobsTab')}>
							<Feather name="calendar" size={28} color="#2397d4" style={{ alignSelf: 'center' }} />
							<Text style={styles.menuText}>Trabalhos</Text>
						</TouchableOpacity>
					</View>
					<View style={styles.separator} />
					<View style={styles.menuItem} >
						<TouchableOpacity>
							<Feather name="user" size={28} color="#2397d4" style={{ alignSelf: 'center' }} />
							<Text style={styles.menuText}>Perfil</Text>
						</TouchableOpacity>
					</View>
					<View style={styles.separator} />
					<View style={styles.menuItem}>
						<TouchableOpacity>
							<Feather name="dollar-sign" size={28} color="#2397d4" style={{ alignSelf: 'center' }} />
							<Text style={styles.menuText}>Transferir</Text>
						</TouchableOpacity>
					</View>
				</View>
				<View >
					<TouchableOpacity style={styles.footerButton}>
						<Text style={styles.footerButtonText}>Procurar Vagas</Text>
					</TouchableOpacity>
				</View>
			</View>
		</View>
	);
};

export const pageOptions = {
	headerTitle: 'Olá, Luiz!',
	headerTitleStyle: {
		color: '#fff',
		fontFamily: "Montserrat_700Bold",
		fontSize: 18,
		alignSelf: 'center'
	},
	headerStyle: {
		backgroundColor: '#343d52',
		height: Platform.OS === 'ios' ? 90 : 70,
		elevation: 0,
		shadowOpacity: 0,
	},
	headerLeft: () => (
		<TouchableOpacity style={{ paddingLeft: 15 }}>
			<Ionicons name="ios-menu" size={30} color="#fff" />
		</TouchableOpacity>
	),
	headerRight: () => (
		<TouchableOpacity style={{ paddingRight: 15 }}>
			<Ionicons name="ios-help-circle-outline" size={30} color="#fff" />
		</TouchableOpacity>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#343d52',
		alignItems: 'center',
	},
	main: {
		backgroundColor: '#eceff1',
		height: '93%',
		width: '93%',
		borderRadius: 15,
		justifyContent: 'flex-end'
	},
	menu: {
		flexDirection: 'row',
		justifyContent: 'space-evenly',
		marginBottom: 12
	},
	menuItem: {
		justifyContent: 'flex-end',
		alignItems: 'center',
		textAlign: 'center',
		width: '30%',
	},
	menuText: {
		fontFamily: "Montserrat_500Medium",
		paddingTop: 8
	},
	separator: {
		borderRightColor: '#cfd8dc',
		borderRightWidth: 1,
		height: 80,
	},
	footerButton: {
		backgroundColor: '#fff',
		height: 65,
		justifyContent: 'center',
		alignItems: 'center',
		borderTopLeftRadius: 10,
		borderTopRightRadius: 10,
		borderBottomLeftRadius: 15,
		borderBottomRightRadius: 15
	},
	footerButtonText: {
		fontFamily: "Montserrat_700Bold",
		fontSize: 16,
		color: '#2397d4'
	}
});


export default HomePage;
