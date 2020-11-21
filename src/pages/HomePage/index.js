import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from 'reselect';
import { View, Text, TouchableOpacity, FlatList, StatusBar, ScrollView, StyleSheet, Platform } from "react-native";

import { Feather } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';

import { selectUserData } from '../../redux/reducers/user/userSelector'
import { selectAuthData } from '../../redux/reducers/auth/authSelector'
import { getAllJobs } from '../../redux/actions/jobActions'
import { selectJobData } from '../../redux/reducers/job/jobSelector'
import { getUser } from "../../redux/actions/userActions"

import JobCardHome from '../../components/JobCardHome'

const HomePage = ({ navigation, user, auth, jobs, dispatchGetUserAction, dispatchGetAllJobsAction }) => {

	useEffect(() => {
		dispatchGetUserAction(
			auth.userId,
			(response) => console.log(response),
			(error) => console.log(error))
	}, [dispatchGetUserAction])

	dispatchGetUserAction(user)


	useEffect(() => {
		navigation.setOptions({
			headerTitle: `Olá, ${user.data.name.split(' ')[0]}!`
		})
	}, [user])

	useEffect(() => {
		dispatchGetAllJobsAction()
	}, [dispatchGetAllJobsAction])

	return (
		<View style={styles.container}>
			<StatusBar barStyle='dark-content' backgroundColor='#fafafa' />
			<View style={styles.main}>
				<ScrollView>
					<Text style={styles.titleSection}>Resumo da Conta</Text>
					<View style={styles.accountSection}>
						<View style={styles.cardSection}>
							<Text style={styles.cardSectionText}>Trabalhos Realizados</Text>
							<Text style={styles.cardSectionNumber}>0</Text>
						</View>
						<View style={styles.cardSection}>
							<Text style={styles.cardSectionText}>Saldo Atual</Text>
							<Text style={styles.cardSectionNumber}>R$ {user.data.totalCash.toFixed(2)}</Text>
						</View>
					</View>
					<View style={{ flex: 1 }}>
						<Text style={styles.titleSection}>Pŕoximos Trabalhos</Text>
						{!user.data.jobsAccepted.length >= 1 ? (
							<TouchableOpacity style={styles.cardJobsSection} onPress={() => navigation.navigate('SearchPage')}>
								<Text style={styles.cardSectionText}>Você não possui trabalhos confirmados</Text>
								<Ionicons name="ios-arrow-forward" size={28} color="#00A699" />
							</TouchableOpacity>
						) :
							<FlatList
								style={{ marginHorizontal: 15, marginTop: 10 }}
								horizontal={true}
								showsVerticalScrollIndicator={false}
								showsHorizontalScrollIndicator={false}
								data={user.data.jobsAccepted.slice(0, 5)}
								renderItem={({ item }) => (
									<JobCardHome
										title={item.title}
										dateDay={item.date.split(' ')[0]}
										dateMonth={item.date.split(' ')[1]}
										local={item.address.neighborhood}
										payment={item.payment.toFixed(2)}
										openCard={() => navigation.navigate('NextJobDetailsPage', {
											jobId: item._id
										})}
									/>
								)}
							/>}
						<Text style={styles.titleSection}>Vagas Recentes</Text>
						{!jobs.length >= 1 ?
							<TouchableOpacity style={styles.cardJobsSection} onPress={() => navigation.navigate('SearchPage')}>
								<Text style={styles.cardSectionText}>Desculpe, nenhum resultado encontrado</Text>
								<Ionicons name="ios-arrow-forward" size={28} color="#00A699" />
							</TouchableOpacity>
							:
							<FlatList
								style={{ marginHorizontal: 15, marginTop: 10 }}
								horizontal={true}
								showsVerticalScrollIndicator={false}
								showsHorizontalScrollIndicator={false}
								data={jobs.slice(0, 5)}
								renderItem={({ item }) => (
									<JobCardHome
										title={item.title}
										dateDay={item.date.split(' ')[0]}
										dateMonth={item.date.split(' ')[1]}
										local={item.address.neighborhood}
										payment={item.payment.toFixed(2)}
										openCard={() => navigation.navigate('SearchJobDetailsPage', {
											jobId: item._id
										})}
									/>
								)}
							/>}
					</View>
				</ScrollView>
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
				<Ionicons name="ios-menu" size={30} color="#00A699" onPress={() => navigation.toggleDrawer()} />
			</TouchableOpacity >
		),
		headerRight: () => (
			<TouchableOpacity style={{ paddingRight: 15 }}>
				<Ionicons name="ios-help-circle-outline" size={30} color="#00A699" onPress={() => navigation.navigate('HelpPage')} />
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
	titleSection: {
		fontSize: 20,
		fontFamily: 'NunitoSans_400Regular',
		color: '#484848',
		marginLeft: 15,
		marginTop: 10
	},
	accountSection: {
		height: 110,
		flexDirection: 'row',
		justifyContent: 'space-between',
		marginHorizontal: 15,
		marginTop: 10
	},
	cardSection: {
		width: '48%',
		backgroundColor: '#fff',
		justifyContent: 'space-evenly',
		alignItems: 'center',
		borderRadius: 10,
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 1,
		},
		shadowOpacity: 0.18,
		shadowRadius: 1.00,
		elevation: 1,
	},
	cardSectionText: {
		fontFamily: 'NunitoSans_400Regular',
		color: '#484848',
		fontSize: 14
	},
	cardSectionNumber: {
		fontFamily: 'NunitoSans_600SemiBold',
		color: '#00A699',
		fontSize: 18
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
	cardJobsSection: {
		flexDirection: 'row',
		backgroundColor: '#fff',
		justifyContent: 'space-evenly',
		alignItems: 'center', borderRadius: 10,
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 1,
		},
		shadowOpacity: 0.18,
		shadowRadius: 1.00,
		elevation: 1,
		marginHorizontal: 15,
		height: 110,
		marginTop: 10,
		marginBottom: 5

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
	dispatchGetUserAction: (id, onSuccess, onError) => dispatch(getUser(id, onSuccess, onError)),
	dispatchGetAllJobsAction: () =>
		dispatch(getAllJobs()),
});

const mapStateToProps = createStructuredSelector({
	user: selectUserData,
	auth: selectAuthData,
	jobs: selectJobData,
});

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
