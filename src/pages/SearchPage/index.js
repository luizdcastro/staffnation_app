import * as React from "react";
import { View, ScrollView, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, StyleSheet } from "react-native";

import { Feather } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import JobCard from '../../components/JobCard'


const SearchPage = ({ navigation }) => {
	return (
		<View style={styles.container} >
			<KeyboardAvoidingView style={styles.main} behavior={Platform.OS === "ios" ? "padding" : "height"}>
				<View style={styles.containerSearch}>
					<TextInput
						style={styles.searchBar}
						placeholder="Search"
						autoCorrect={false}
						autoCapitalize='none'
						keyboardType='default'
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
				<ScrollView style={{ marginHorizontal: 15 }}>
					<JobCard />
					<JobCard />
					<JobCard />
					<JobCard />

				</ScrollView>
			</KeyboardAvoidingView>
		</View>
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
		alignItems: 'center',
	},
	main: {
		backgroundColor: '#fafafa',
		height: '100%',
		width: '100%',
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
	}
});

export default SearchPage;
