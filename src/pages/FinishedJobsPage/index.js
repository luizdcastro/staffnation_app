import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { View, FlatList, Image, Text, StyleSheet } from "react-native";

import { getMe } from "../../redux/actions/getMeActions"
import JobCard from '../../components/JobCard'
import { color } from "react-native-reanimated";

const FinishedJobsPage = ({ navigation, getme, dispatchGetMe }) => {
    const [pastJobs, setPastJobs] = useState([])
    const [noContent, setNoContent] = useState(false)

    useEffect(() => {
        dispatchGetMe(
            async (response) => {
                const data = await response.data.jobsFinished
                if (data.length >= 1) {
                    setPastJobs(data)
                } else {
                    setNoContent(!noContent)
                }
            },
            error => console.log(error)
        )
    }, [dispatchGetMe])

    return (
        <View style={styles.container}>
            <View style={styles.main}>
                {!noContent ?
                    <FlatList
                        style={{ marginHorizontal: 20 }}
                        showsVerticalScrollIndicator={false}
                        data={pastJobs}
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
                        <Text style={styles.noContentText}>Você não possui trabalhos finalizados.</Text>
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
        backgroundColor: '#FAFAFA',
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
        paddingTop: 30,
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
    dispatchGetMe: (onSuccess, onError) => dispatch(getMe(onSuccess, onError))
});

const mapStateToProps = (state) => ({
    getme: state.getme,
});

export default connect(mapStateToProps, mapDispatchToProps)(FinishedJobsPage);
