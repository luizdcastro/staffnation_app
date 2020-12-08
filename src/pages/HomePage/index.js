import React, { useEffect } from "react";
import { connect } from "react-redux";
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, Dimensions } from "react-native";
import { Container, Title, HeaderLeft, HeaderTitle } from './styles'

import { Ionicons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';

import { getAllJobs } from '../../redux/actions/jobActions'
import { getMe } from "../../redux/actions/getMeActions"

import Header from '../../components/Header'
import JobCard from '../../components/JobCard'
import JobCardNoContent from '../../components/JobCardNoContent'
import CategoryCard from '../../components/CategoryCard'

const { width, height } = Dimensions.get('window')


const HomePage = ({ navigation, getme, jobs, dispatchGetMe, dispatchGetAllJobsAction, setHome, setJobs }) => {

	useEffect(() => {
		dispatchGetMe()
	}, [dispatchGetMe])

	useEffect(() => dispatchGetAllJobsAction(),
		[dispatchGetAllJobsAction])

	const LeftAction = () => (
		<HeaderLeft>
			<HeaderTitle>Curitiba, PR</HeaderTitle>
			<Feather name="chevron-down" size={22} color="grey" style={{ marginLeft: 4, paddingRight: 5 }} />
		</HeaderLeft>
	)

	const RightAction = () => (
		<TouchableOpacity style={{ marginRight: 10 }}>
			<Feather name="bell" size={23} color="grey" onPress={() => navigation.navigate('NotificationPage')} />
		</TouchableOpacity>
	)

	return (
		<Container>
			<Header letfIcon={<LeftAction />} rightIcon={<RightAction />} />
			<ScrollView  >
				<Title>Categorias</Title>
				<ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={{ marginHorizontal: 10, height: 95 }}>
					<CategoryCard title="Bar" image={require("../../assets/images/categories/bar.jpg")} />
					<CategoryCard title="Limpeza" image={require("../../assets/images/categories/clean.jpg")} />
					<CategoryCard title="Cozinha" image={require("../../assets/images/categories/kitchen.jpg")} />
					<CategoryCard title="Garçom" image={require("../../assets/images/categories/waiter.jpg")} />
					<CategoryCard title="Segurança" image={require("../../assets/images/categories/guard.jpg")} />
					<CategoryCard title="Hostess" image={require("../../assets/images/categories/hostess.jpg")} />
				</ScrollView>
				<Title>Pŕoximos Trabalhos</Title>
				<View style={{ flex: 1 }}>
					<ScrollView style={{ marginLeft: 10 }} horizontal={true} showsHorizontalScrollIndicator={false}>
						{!getme.data?.jobsAccepted.length >= 1 ? (
							<JobCardNoContent
								width={width - 20}
								onPress={() => { setHome(false); setJobs(true) }} />
						) :
							getme.data.jobsAccepted.slice(0, 5).map((item) => (
								<View key={item._id}>
									<JobCard
										width={width - 20}
										buttonTitle="Detalhes"
										title={item.title}
										category={item.category}
										payment={item.payment.toFixed(2)}
										day={item.date.split(' ')[0]}
										month={item.date.split(' ')[1].substring(0, 3)}
										image={item.image}
										onPress={() => navigation.navigate('NextJobDetailsPage', {
											jobId: item._id
										})}
									/>
								</View>
							))}
					</ScrollView>
					<Title>Vagas em Destaque</Title>
					<ScrollView style={{ marginLeft: 10 }} horizontal={true} showsHorizontalScrollIndicator={false}>

						{!jobs.length >= 1 ?
							<TouchableOpacity style={styles.cardJobsSection} onPress={() => { }}>
								<Text style={styles.cardSectionText}>Desculpe, nenhum resultado encontrado</Text>
								<Ionicons name="ios-arrow-forward" size={28} color="grey" />
							</TouchableOpacity>
							:
							<ScrollView horizontal={true} showsHorizontalScrollIndicator={false} >
								<View>
									{jobs.slice(0, 2).map((item) => (
										<View key={item._id}>
											<JobCard
												width={width - 20}
												buttonTitle="Detalhes"
												title={item.title}
												category={item.category}
												payment={item.payment.toFixed(2)}
												day={item.date.split(' ')[0]}
												month={item.date.split(' ')[1].substring(0, 3)}
												image={item.image}
												onPress={() => navigation.navigate('SearchJobDetailsPage', {
													jobId: item._id
												})}
											/>
										</View>
									))}
								</View>
								<View>
									{jobs.slice(2, 4).map((item) => (
										<View key={item._id}>
											<JobCard
												width={width - 20}
												buttonTitle="Detalhes"
												title={item.title}
												category={item.category}
												payment={item.payment.toFixed(2)}
												day={item.date.split(' ')[0]}
												month={item.date.split(' ')[1].substring(0, 3)}
												image={item.image}
												onPress={() => navigation.navigate('SearchJobDetailsPage', {
													jobId: item._id
												})}
											/>
										</View>
									))}
								</View>
							</ScrollView>
						}
					</ScrollView>
				</View>
			</ScrollView>
		</Container>
	);
};

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
	cardJobsSection: {
		flexDirection: 'row',
		height: 80,
		width: width - 20,
		backgroundColor: '#fff',
		justifyContent: 'space-between',
		alignItems: 'center',
		borderRadius: 10,
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 0.5,
		},
		shadowOpacity: 0.09,
		shadowRadius: 0.5,
		elevation: 0.5,
		marginLeft: 10,
		paddingHorizontal: 15
	},
	cardSectionText: {
		fontFamily: 'NunitoSans_400Regular',
		fontSize: 15
	}

});

const mapDispatchToProps = (dispatch) => ({
	dispatchGetMe: () => dispatch(getMe()),
	dispatchGetAllJobsAction: () =>
		dispatch(getAllJobs()),
});

const mapStateToProps = (state) => ({
	getme: state.getme,
	jobs: state.jobs
});

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
