import * as React from "react";
import { View, ScrollView, StyleSheet } from "react-native";
import JobCard from '../../components/JobCard'

const NextJobsPage = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <View style={styles.main}>
                <ScrollView style={{ marginHorizontal: 15 }}>
                    <JobCard openCard={() => navigation.navigate('JobDetailsPage')} />
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
        backgroundColor: '#fafafa',
        height: '100%',
        width: '100%',
        justifyContent: 'flex-end'
    }
});

export default NextJobsPage;
