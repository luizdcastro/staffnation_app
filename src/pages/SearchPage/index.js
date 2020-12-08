import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { View, TextInput, Text, FlatList, Image, TouchableOpacity, Keyboard, Platform, StyleSheet } from "react-native";
import { SearchBar, Container } from './styles'

import { Feather } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';

import { getAllJobs } from '../../redux/actions/jobActions'
import JobCard from '../../components/JobCard'
import { color } from "react-native-reanimated";

const SearchPage = ({ navigation, jobs, dispatchGetAllJobsAction }) => {
	const [isKeyboardVisible, setKeyboardVisible] = useState(false);
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

	useEffect(() => {
		const keyboardDidShowListener = Keyboard.addListener(
			'keyboardDidShow',
			() => {
				setKeyboardVisible(true);
			}
		);
		const keyboardDidHideListener = Keyboard.addListener(
			'keyboardDidHide',
			() => {
				setKeyboardVisible(false);
			}
		);
		return () => {
			keyboardDidHideListener.remove();
			keyboardDidShowListener.remove();
		};
	}, []);

	return (
		<Container behavior={Platform.OS === "ios" ? "padding" : "height"}>
			<SearchBar>
				<TextInput
					style={styles.searchBar}
					placeholder="Buscar"
					autoCorrect={false}
					autoCapitalize='none'
					keyboardType='default'
					onChangeText={(value) => setSearch(value)}
				/>
				<View style={styles.searchIcon} >
					<Feather name="search" size={26} color="#523BE4" />
				</View>
				<View style={styles.closeIcon} >
					{isKeyboardVisible ?
						<TouchableOpacity>
							<AntDesign name="close" size={26} color="grey" onPress={() => Keyboard.dismiss()} />
						</TouchableOpacity>
						: null}
				</View>
			</SearchBar>
			{filteredJobs.length >= 1 ?
				<FlatList
					style={{ marginLeft: 10, marginBottom: 20, marginTop: 10 }}
					showsVerticalScrollIndicator={false}
					data={filteredJobs}
					renderItem={({ item }) => (
						<JobCard
							buttonTitle="Detalhes"
							onPress={() => navigation.navigate('SearchJobDetailsPage', {
								jobId: item._id
							})}
						/>
					)}
				/>
				:
				<View style={styles.noContentBox}>
					<Image source={require('../../assets/images/no-result.png')} style={styles.noContentImage} />
					<Text style={styles.noContentText}>Oops! Nenhum resultado encontrado.</Text>
				</View>
			}
		</Container>
	);
};

const styles = StyleSheet.create({
	searchBar: {
		width: '100%',
		backgroundColor: '#fff',
		borderRadius: 5,
		height: 50,
		paddingLeft: 50,
		fontFamily: "NunitoSans_400Regular",
		fontSize: 16,
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 0.5,
		},
		shadowOpacity: 0.09,
		shadowRadius: 0.5,
		elevation: 0.5,
	},
	searchIcon: {
		position: 'absolute',
		left: 10,
		top: 12,
		elevation: 1
	},
	closeIcon: {
		position: 'absolute',
		right: 10,
		top: 12,
		elevation: 1
	},
	noContentBox: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		marginTop: '15%'
	},
	noContentText: {
		fontSize: 17,
		fontFamily: 'NunitoSans_600SemiBold',
		color: '#484848',
		paddingTop: '6%',
		marginBottom: '30%',
		color: 'grey'
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
