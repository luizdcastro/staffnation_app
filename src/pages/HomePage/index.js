import React, { useEffect } from "react";
import { connect } from "react-redux";
import { View, Text, TouchableOpacity, FlatList, ScrollView, StyleSheet, Dimensions } from "react-native";
import { Container, Title, HeaderLeft, HeaderTitle } from './styles'

import { Ionicons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';

import { getAllJobs } from '../../redux/actions/jobActions'
import { getMe } from "../../redux/actions/getMeActions"

import Header from '../../components/Header'
import JobCardHome from '../../components/JobCardHome'
import CategoryCard from '../../components/CategoryCard'
import IconBar from '../../assets/svg/bar'
import IconCleaner from '../../assets/svg/cleaner'
import IconSecurity from '../../assets/svg/security'
import Iconkitchen from '../../assets/svg/kitchen'
import IconWaiter from '../../assets/svg/waiter'
import IconHostess from '../../assets/svg/hostess'

const { width, height } = Dimensions.get('window')


const HomePage = ({ navigation, getme, jobs, dispatchGetMe, dispatchGetAllJobsAction }) => {

	useEffect(() => {
		dispatchGetMe()
	}, [dispatchGetMe])

	useEffect(() => dispatchGetAllJobsAction(),
		[dispatchGetAllJobsAction])

	const LeftAction = () => (
		<HeaderLeft>
			<HeaderTitle>Curitiba, PR</HeaderTitle>
			<Feather name="chevron-down" size={20} color="#484848" style={{ marginLeft: 4, paddingRight: 2 }} />
		</HeaderLeft>
	)

	const RightAction = () => (
		<TouchableOpacity>
			<Feather name="bell" size={23} color="#484848" onPress={() => navigation.navigate('HelpPage')} />
		</TouchableOpacity>
	)

	return (
		<Container>
			<Header letfIcon={<LeftAction />} rightIcon={<RightAction />} />
			<ScrollView >
				<Title>Categorias</Title>
				<ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={{ marginHorizontal: 15, height: 80 }} >
					<CategoryCard title="Bar" children={<IconBar />} />
					<CategoryCard title="Limpeza" children={<IconCleaner />} />
					<CategoryCard title="Cozinha" children={<Iconkitchen />} />
					<CategoryCard title="Segurança" children={<IconSecurity />} />
					<CategoryCard title="Garçom" children={<IconWaiter />} />
					<CategoryCard title="Hostess" children={<IconHostess />} />
				</ScrollView>
				<Title>Pŕoximos Trabalhos</Title>
				<View style={{ flex: 1 }}>
					{!getme.data?.jobsAccepted.length >= 1 ? (
						<TouchableOpacity style={styles.cardJobsSection} onPress={() => navigation.navigate('SearchPage')}>
							<Text style={styles.cardSectionText}>Nenhum trabalho encontrado</Text>
							<Ionicons name="ios-arrow-forward" size={28} color="#484848" />
						</TouchableOpacity>
					) :
						<FlatList
							style={{ marginHorizontal: 15, marginTop: 10 }}
							horizontal={false}
							numColumns={2}
							data={getme.data.jobsAccepted.slice(0, 5)}
							renderItem={({ item }) => (
								<JobCardHome />
							)}
						/>}
					<Title>Vagas em Destaque</Title>
					{!jobs.length >= 1 ?
						<TouchableOpacity style={styles.cardJobsSection} onPress={() => navigation.navigate('SearchPage')}>
							<Text style={styles.cardSectionText}>Desculpe, nenhum resultado encontrado</Text>
							<Ionicons name="ios-arrow-forward" size={28} color="grey" />
						</TouchableOpacity>
						:
						<View>
							<FlatList
								style={{ marginLeft: 10 }}
								horizontal={true}
								contentContainerStyle={{ alignSelf: 'flex-start' }}
								directionalLockEnabled={true}
								showsVerticalScrollIndicator={false}
								showsHorizontalScrollIndicator={false}
								data={jobs.slice(0, 3)}
								renderItem={({ item }) => (
									<JobCardHome width={width - 20} buttonTitle="Detalhes" />
								)}
							/>
							<FlatList
								style={{ marginLeft: 10 }}
								horizontal={true}
								contentContainerStyle={{ alignSelf: 'flex-start' }}
								directionalLockEnabled={true}
								showsVerticalScrollIndicator={false}
								showsHorizontalScrollIndicator={false}
								data={jobs.slice(3, 5)}
								renderItem={({ item }) => (
									<JobCardHome width={width - 20} buttonTitle="Detalhes" />
								)}
							/>
						</View>

					}
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
