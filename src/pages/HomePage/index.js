import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from 'reselect';
import { View, Text, TouchableOpacity, StatusBar, StyleSheet, Platform } from "react-native";

import { Feather } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';

import { selectUserData } from '../../redux/reducers/user/userSelector'
import { getUser } from "../../redux/actions/userActions"


const HomePage = ({ navigation, user, dispatchGetUserAction }) => {

	useEffect(() => {
		navigation.setOptions({
			headerTitle: `Olá, ${user.data.name.split(' ')[0]}!`
		})
	}, [user])

	return (
		<View style={styles.container}>
			<StatusBar barStyle='dark-content' backgroundColor='#fafafa' />
			<View style={styles.main}>
				<View>
				</View>
				<View style={styles.menu}>
					<View style={styles.menuItem}>
						<TouchableOpacity onPress={() => navigation.navigate('JobsTab')}>
							<Feather name="calendar" size={24} color="#00A699" style={{ alignSelf: 'center' }} />
							<Text style={styles.menuText}>Trabalhos</Text>
						</TouchableOpacity>
					</View>
					<View style={styles.separator} />
					<View style={styles.menuItem}>
						<TouchableOpacity onPress={() => navigation.navigate('TransferPage')}>
							<Feather name="repeat" size={24} color="#00A699" style={{ alignSelf: 'center' }} />
							<Text style={styles.menuText}>Transferir Saldo</Text>
						</TouchableOpacity>
					</View>
					<View style={styles.separator} />
					<View style={styles.menuItem} >
						<TouchableOpacity onPress={() => navigation.navigate('ProfilePage')}>
							<Feather name="user" size={24} color="#00A699" style={{ alignSelf: 'center' }} />
							<Text style={styles.menuText}>Perfil</Text>
						</TouchableOpacity>
					</View>
				</View>
				<View >
					<TouchableOpacity style={styles.footerButton} onPress={() => navigation.navigate('SearchPage')}>
						<Text style={styles.footerButtonText}>Procurar Vagas</Text>
					</TouchableOpacity>
				</View>
			</View>
		</View>
	);
};

export const pageOptions = ({ navigation }) => {

	return {
		headerTitleStyle: {
			color: '#484848',
			fontFamily: "NunitoSans_700Bold",
			fontSize: 20,
			alignSelf: 'center'
		},
		headerStyle: {
			backgroundColor: '#fafafa',
			height: Platform.OS === 'ios' ? 90 : 70,
		},
		headerLeft: () => (
			<TouchableOpacity style={{ paddingLeft: 15 }} >
				<Ionicons name="ios-menu" size={28} color="#00A699" onPress={() => navigation.toggleDrawer()} />
			</TouchableOpacity >
		),
		headerRight: () => (
			<TouchableOpacity style={{ paddingRight: 15 }}>
				<Ionicons name="ios-help-circle-outline" size={28} color="#00A699" />
			</TouchableOpacity>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fafafa',
		alignItems: 'center',
	},
	main: {
		backgroundColor: '#fafafa',
		height: '100%',
		width: '100%',

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
		fontFamily: "NunitoSans_400Regular",
		paddingTop: 8,
		color: '#484848',
		fontSize: 13
	},
	separator: {
		borderRightColor: '#E8E8E8',
		borderRightWidth: 1,
		height: 80,
	},
	footerButton: {
		backgroundColor: '#00A699',
		height: 60,
		justifyContent: 'center',
		alignItems: 'center',
	},
	footerButtonText: {
		fontFamily: "NunitoSans_700Bold",
		fontSize: 18,
		color: '#fff'
	}
});

const mapDispatchToProps = (dispatch) => ({
	dispatchGetUserAction: (id) => dispatch(getUser(id))
});

const mapStateToProps = createStructuredSelector({
	user: selectUserData,
});

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
