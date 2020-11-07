import * as React from "react";
import { View, ScrollView, StyleSheet } from "react-native";
import JobCard from '../../components/JobCard'

const PendingJobsPage = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <View style={styles.main}>
                <ScrollView style={{ marginHorizontal: 15 }}>
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
        backgroundColor: '#fafafa'
    },
    main: {
        backgroundColor: '#FAFAFA',
        backgroundColor: '#FAFAFA',
        height: '100%',
        width: '100%',
        justifyContent: 'flex-end'
    }
});

export default PendingJobsPage;
