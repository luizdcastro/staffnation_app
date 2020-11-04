import * as React from "react";
import { View, ScrollView, StyleSheet } from "react-native";
import JobCard from '../../components/JobCard'

const NextJobsPage = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <View style={styles.main}>
                <ScrollView style={{ marginHorizontal: 15 }}>
                    <JobCard />
                    <JobCard />
                    <JobCard />
                </ScrollView>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        backgroundColor: '#343d52'
    },
    main: {
        backgroundColor: '#eceff1',
        height: '100%',
        width: '100%',
        justifyContent: 'flex-end'
    }
});

export default NextJobsPage;
