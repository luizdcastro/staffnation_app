import React from "react";
import { connect } from "react-redux";
import { View, FlatList, Text, Image, StyleSheet } from "react-native";

import { getMe } from "../../redux/actions/getMeActions"
import JobCard from '../../components/JobCard'

const NextJobsPage = ({ navigation, getme, dispatchGetMe }) => {
    return (
        <View style={styles.container}>
            <View style={styles.main}>
                {getme.data.jobsAccepted.length >= 1 ?
                    <FlatList
                        style={{ marginLeft: 10, }}
                        showsVerticalScrollIndicator={false}
                        data={getme.data.jobsAccepted}
                        renderItem={({ item }) => (
                            <JobCard
                                buttonTitle="Detalhes"
                                onPress={() => navigation.navigate('NextJobDetailsPage', {
                                    jobId: item._id
                                })}
                            />
                        )}
                    />
                    :
                    <View style={styles.noContentBox}>
                        <Image source={require('../../assets/images/no-result-search.png')} style={styles.noContentImage} />
                        <Text style={styles.noContentText}>Você não possui trabalhos confirmados</Text>
                    </View>
                }
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
    },
    noContentBox: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    noContentText: {
        fontSize: 16,
        fontFamily: 'NunitoSans_600SemiBold',
        color: '#484848',
        paddingTop: 40,
        marginBottom: '15%',
        color: 'grey'
    },
    noContentImage: {
        width: '50%',
        height: 160,
        resizeMode: "cover"
    },
});

const mapDispatchToProps = (dispatch) => ({
    dispatchGetMe: () => dispatch(getMe())
});

const mapStateToProps = (state) => ({
    getme: state.getme,
});;

export default connect(mapStateToProps, mapDispatchToProps)(NextJobsPage);