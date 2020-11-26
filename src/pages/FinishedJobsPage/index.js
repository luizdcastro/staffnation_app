import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { View, FlatList, Image, Text, StyleSheet } from "react-native";

import { getMe } from "../../redux/actions/getMeActions"
import JobCard from '../../components/JobCard'

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
                                title={item.title}
                                dateDay={item.date.split(' ')[0]}
                                dateMonth={item.date.split(' ')[1].substring(0, 3)}
                                local={item.address.neighborhood}
                                category={item.category}
                                payment={item.payment.toFixed(2)}
                                timeStart={item.time.start}
                                timeEnd={item.time.end}
                                openCard={() => navigation.navigate('FinishedJobsDetailsPage', {
                                    jobId: item._id
                                })}
                            />
                        )}
                    />
                    :
                    <View style={styles.noContentBox}>
                        <Image source={require('../../assets/images/no-result-search.png')} style={styles.noContentImage} />
                        <Text style={styles.noContentText}>Você ainda não possui trabalhos realizados</Text>
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
        fontFamily: 'NunitoSans_400Regular',
        color: '#484848',
        paddingTop: 30,
        marginBottom: '30%'
    },
    noContentImage: {
        width: '60%',
        height: 187,
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
