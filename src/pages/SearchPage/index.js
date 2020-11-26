import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from 'reselect';
import { View, TextInput, Text, FlatList, Image, TouchableOpacity, KeyboardAvoidingView, Platform, StyleSheet } from "react-native";

import { Feather } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import { getAllJobs } from '../../redux/actions/jobActions'

import JobCard from '../../components/JobCard'

const SearchPage = ({ navigation, jobs, dispatchGetAllJobsAction }) => {
	const [filteredJobs, setFilteredJobs] = useState([])
	const [search, setSearch] = useState('')

	useEffect(() => {
		dispatchGetAllJobsAction()
	}, [dispatchGetAllJobsAction])

	useEffect(() => {
		setFilteredJobs(jobs)
	}, [setFilteredJobs, jobs])

	useEffect(() => {
		setFilteredJobs(
			jobs.filter(
				(job) =>
					job.title
						.toLowerCase()
						.includes(search.toLowerCase()) ||
					job.category.toLowerCase().includes(search.toLowerCase()) ||
					job.payment.toString().includes(search.toLowerCase()) ||
					job.address.neighborhood.toLowerCase().includes(search.toLowerCase())
			)
		);
	}, [jobs, search]);

	return (
		<KeyboardAvoidingView style={styles.container} behavior={Platform.OS === "ios" ? "padding" : "height"}>
			<View style={styles.containerSearch}>
				<TextInput
					style={styles.searchBar}
					placeholder="Search"
					autoCorrect={false}
					autoCapitalize='none'
					keyboardType='default'
					onChangeText={(value) => setSearch(value)}
				/>
				<View style={{ position: 'absolute', left: 10, top: 12, elevation: 1 }} >
					<Feather name="search" size={26} color="#00A699" />
				</View>
				<View style={{ position: 'absolute', right: 10, top: 12, elevation: 1 }} >
					<TouchableOpacity>
						<MaterialCommunityIcons name="filter-variant" size={26} color="#00A699" />
					</TouchableOpacity>
				</View>
			</View>
			{filteredJobs.length >= 1 ?
				<FlatList
					style={{ marginHorizontal: 20, marginBottom: 20 }}
					showsVerticalScrollIndicator={false}
					data={filteredJobs}
					renderItem={({ item }) => (
						<JobCard
							title={item.title}
							dateDay={item.date.split(' ')[0]}
							dateMonth={item.date.split(' ')[1].substring(0, 3)}
							local={item.address.neighborhood}
							category={item.category}
							payment={item.payment.toFixed(2)}
							timeStart={item.time.start}
							timeEnd={item.time.end}
							openCard={() => navigation.navigate('SearchJobDetailsPage', {
								jobId: item._id
							})}
						/>
					)}
				/>
				:
				<View style={styles.noContentBox}>
					<Image source={require('../../assets/images/no-result.png')} style={styles.noContentImage} />
					<Text style={styles.noContentText}>Desculpe, nenhum resultado encontrado</Text>
				</View>
			}
		</KeyboardAvoidingView>
	);
};

export const pageOptions = {
	headerTitle: 'Pesquisar Vagas',
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
		backgroundColor: '#fafafa',
	},
	containerSearch: {
		position: 'relative',
		marginHorizontal: 15,
		marginTop: 15,
		marginBottom: 20
	},
	searchBar: {
		width: '100%',
		backgroundColor: '#fff',
		borderRadius: 10,
		height: 50,
		paddingLeft: 50,
		fontFamily: "NunitoSans_600SemiBold",
		fontSize: 17,
		color: '#484848',
		elevation: 1,
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 1,
		},
		shadowOpacity: 0.18,
		shadowRadius: 1.00,
	},
	noContentBox: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center'
	},
	noContentText: {
		fontSize: 17,
		fontFamily: 'NunitoSans_400Regular',
		color: '#484848',
		paddingTop: 30,
		marginBottom: '30%'
	},
	noContentImage: {
		width: '80%',
		height: 187,
		resizeMode: "cover"
	},
});

const mapDispatchToProps = (dispatch) => ({
	dispatchGetAllJobsAction: () =>
		dispatch(getAllJobs()),
});

const mapStateToProps = (state) => ({
	jobs: state.jobs
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchPage);
