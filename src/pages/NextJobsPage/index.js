import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from 'reselect';
import { View, FlatList, Text, StyleSheet } from "react-native";

import { selectUserData } from '../../redux/reducers/user/userSelector'
import { getUser } from "../../redux/actions/userActions"
import JobCard from '../../components/JobCard'

const NextJobsPage = ({ navigation, user, dispatchGetUserAction }) => {
    const [nextJobs, setNextJobs] = useState([])
    const [noContent, setNoContent] = useState(false)

    useEffect(() => {
        dispatchGetUserAction(
            user.data._id,
            async (response) => {
                const data = await response.data.jobsAccepted
                if (data.length >= 1) {
                    setNextJobs(data)
                } else {
                    setNoContent(!noContent)
                }
            },
            error => console.log(error)
        )
    }, [dispatchGetUserAction])

    return (
        <View style={styles.container}>
            <View style={styles.main}>
                {!noContent ?
                    <FlatList
                        style={{ marginHorizontal: 15 }}
                        data={nextJobs}
                        renderItem={({ item }) => (
                            <JobCard
                                title={item.title}
                                local={item.address.neighborhood}
                                category={item.category}
                                payment={item.payment.toFixed(2)}
                                timeStart={item.time.start}
                                timeEnd={item.time.end}
                                openCard={() => navigation.navigate('PendingJobDetailsPage', {
                                    jobId: item._id
                                })}
                            />
                        )}
                    />
                    :
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <Text>Você ainda não possui trabalhos confirmados</Text>
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
    }
});

const mapDispatchToProps = (dispatch) => ({
    dispatchGetUserAction: (id, onSuccess, onError) => dispatch(getUser(id, onSuccess, onError))
});

const mapStateToProps = createStructuredSelector({
    user: selectUserData,
});

export default connect(mapStateToProps, mapDispatchToProps)(NextJobsPage);