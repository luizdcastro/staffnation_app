import React, { useState, useEffect } from 'react'
import { connect } from "react-redux";
import { View, StyleSheet } from 'react-native'
import _ from "lodash";

import { getSingleJob, createPendingApplication } from '../../redux/actions/jobActions'
import { getMe } from "../../redux/actions/getMeActions"

import LightButton from '../../components/LightButton'
import JobDetails from '../../components/JobDetails'

const SearchJobDetailsPage = ({ getme, route, navigation, dispatchGetJobAction, dispatchJobApplicationAction, dispatchGetMe }) => {
    const [jobDetails, setJobDetails] = useState({})
    const { jobId } = route.params;

    useEffect(() => {
        dispatchGetJobAction(
            jobId,
            async (response) => {
                const data = await response
                setJobDetails(data[0])
            },
            (error) => console.log(error)
        );
    }, [dispatchGetJobAction, jobId]);

    const jobApplication = () => {
        dispatchJobApplicationAction(
            jobId,
            getme.data._id
        )
        dispatchGetMe()
        navigation.goBack()
    }

    return (
        <View style={styles.container}>
            {jobDetails._id ?
                <JobDetails
                    navigation={navigation}
                    title={jobDetails.store.name}
                    category={jobDetails.category}
                    date={jobDetails.date}
                    positions={jobDetails.positions}
                    timeStart={jobDetails.time.start}
                    timeEnd={jobDetails.time.end}
                    payment={jobDetails.payment}
                    uniform={jobDetails.uniform}
                    addressStreet={jobDetails.store.address.street}
                    addressNumber={jobDetails.store.number}
                    addressNeighborhood={jobDetails.store.address.neighborhood}
                    addressCity={jobDetails.store.address.city}
                    addressState={jobDetails.store.address.state}
                    image={jobDetails.store.image}

                /> : null}
            <View style={styles.buttonsContainer}>
                {_.filter(getme.data.jobsPending, ["_id", jobId]).length >= 1 ?
                    <View style={{ width: '95%' }}>
                        <LightButton
                            textColor="#523BE4"
                            borderColor="#523BE4"
                            name="Candidatura Pendente"
                            onPress={() => alert('Você já se candidatou para essa vaga')} />
                    </View>
                    :
                    <View style={{ width: '95%' }}>
                        <LightButton
                            textColor="#523BE4"
                            borderColor="#523BE4"
                            name="Candidatar-se"
                            onPress={jobApplication} />
                    </View>
                }
            </View>
        </View >
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fafafa',
    },
    buttonsContainer: {
        flex: 1,
        marginBottom: 40,
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
    dispatchGetMe: () => dispatch(getMe()),
    dispatchGetJobAction: (id, onSuccess, onError) =>
        dispatch(getSingleJob(id, onSuccess, onError)),
    dispatchJobApplicationAction: (id, applicationsPending) =>
        dispatch(createPendingApplication(id, { applicationsPending }))
});

const mapStateToProps = (state) => ({
    getme: state.getme,
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchJobDetailsPage)