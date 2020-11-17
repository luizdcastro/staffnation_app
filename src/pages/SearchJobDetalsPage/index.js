import React, { useState, useEffect } from 'react'
import { connect } from "react-redux";
import { createStructuredSelector } from 'reselect';
import { View, StyleSheet } from 'react-native'

import { getSingleJob, createPendingApplication } from '../../redux/actions/jobActions'
import { getUser } from "../../redux/actions/userActions"
import { selectUserData } from '../../redux/reducers/user/userSelector'

import GradientButton from '../../components/GradientButton'
import JobDetails from '../../components/JobDetails'

const SearchJobDetailsPage = ({ user, route, navigation, dispatchGetJobAction, dispatchJobApplicationAction }) => {
    const [jobDetails, setJobDetails] = useState({})
    const { jobId } = route.params;

    useEffect(() => {
        dispatchGetJobAction(
            jobId,
            async (response) => {
                const data = await response
                console.log(response)
                setJobDetails(data[0])
            },
            (error) => console.log(error)
        );
    }, [dispatchGetJobAction, jobId]);

    const jobApplication = () => {
        dispatchJobApplicationAction(
            jobId,
            user.data._id
        )
        navigation.navigate('JobsTab')
    }

    return (
        <View style={styles.container}>
            {jobDetails._id ?
                <JobDetails
                    title={jobDetails.title}
                    category={jobDetails.category}
                    positions={jobDetails.positions}
                    timeStart={jobDetails.time.start}
                    timeEnd={jobDetails.time.end}
                    payment={jobDetails.payment.toFixed(2)}
                    uniform={jobDetails.uniform}
                    addressStreet={jobDetails.address.street}
                    addressNumber={jobDetails.address.number}
                    addressNeighborhood={jobDetails.address.neighborhood}
                    addressCity={jobDetails.address.city}
                    addressState={jobDetails.address.state}

                /> : null}
            <View style={styles.buttonsContainer}>
                <View>
                    <GradientButton
                        title="Candidatar-se"
                        gradient={["#00A699", "#00A699"]}
                        onPress={jobApplication}
                    />
                </View>
            </View>
        </View >
    )
}

export const pageOptions = {
    headerTitle: 'Detalhes',
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
    },
    buttonsContainer: {
        flex: 1,
        marginBottom: 50,
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    button: {
        height: 50,
        borderWidth: 1.3,
        borderColor: '#00A699',
        justifyContent: 'center',
        alignItems: 'center',
        width: '95%',
        borderRadius: 5,
        marginBottom: 10,
    },
    textButton: {
        color: '#00A699',
        textTransform: 'uppercase',
        fontFamily: 'NunitoSans_600SemiBold'
    },
})

const mapDispatchToProps = (dispatch) => ({
    dispatchGetJobAction: (id, onSuccess, onError) =>
        dispatch(getSingleJob(id, onSuccess, onError)),
    dispatchJobApplicationAction: (id, applicationsPending) =>
        dispatch(createPendingApplication(id, { applicationsPending })),
    dispatchGetUserAction: (id) => dispatch(getUser(id))

});

const mapStateToProps = createStructuredSelector({
    user: selectUserData,
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchJobDetailsPage)