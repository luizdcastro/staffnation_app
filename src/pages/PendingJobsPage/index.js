import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from 'reselect';
import { View, FlatList, StyleSheet } from "react-native";
import JobCard from '../../components/JobCard'

import { selectUserData } from '../../redux/reducers/user/userSelector'
import { getUser } from "../../redux/actions/userActions"

const PendingJobsPage = ({ navigation, user, dispatchGetUserAction }) => {
    const [pendingJobs, setPendingJobs] = useState([])

    useEffect(() => {
        dispatchGetUserAction(
            user.data._id,
            async (response) => {
                const data = await response.data.pendingApplications
                setPendingJobs(data)
            },
            error => console.log(error)
        )
    }, [dispatchGetUserAction, user])

    console.log(pendingJobs)


    return (
        <View style={styles.container}>
            <View style={styles.main}>
                <FlatList
                    style={{ marginHorizontal: 15 }}
                    data={pendingJobs}
                    renderItem={({ item }) => (
                        <JobCard
                            title={item.title}
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

const mapDispatchToProps = (dispatch) => ({
    dispatchGetUserAction: (id, onSuccess, onError) => dispatch(getUser(id, onSuccess, onError))
});

const mapStateToProps = createStructuredSelector({
    user: selectUserData,
});

export default connect(mapStateToProps, mapDispatchToProps)(PendingJobsPage);