import React, { useState, useEffect } from 'react'
import { connect } from "react-redux";
import { View, Text, StyleSheet, Modal, TouchableOpacity } from 'react-native'

import { getSingleJob, cancelAcceptedApplication } from '../../redux/actions/jobActions'
import { getUser } from "../../redux/actions/userActions"
import { createStructuredSelector } from 'reselect';
import { selectUserData } from '../../redux/reducers/user/userSelector'

import GradientButton from '../../components/GradientButton'
import LateNotification from '../../components/LateNotification'
import JobDetails from '../../components/JobDetails'

const NextJobDetailsPage = ({ user, navigation, route, dispatchGetJobAction, dispatchCancelApplication, dispatchGetUserAction }) => {
    const [jobDetails, setJobDetails] = useState({})
    const [modalNotification, setModalNotification] = useState(false);
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

    const handleCancelApplication = () => {
        dispatchCancelApplication(
            jobId,
            user.data._id
        )
        dispatchGetUserAction(user.data._id)
        navigation.navigate('JobsTab');
    }

    return (
        <View style={styles.container}>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalNotification}>
                <LateNotification
                    setModalNotification={setModalNotification}
                />
            </Modal>
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
                <TouchableOpacity style={styles.button} onPress={() => setModalNotification(true)}>
                    <Text style={styles.textButton}>Notificar Atraso</Text>
                </TouchableOpacity>
                <View>
                    <GradientButton
                        title="Cancelar Trabalho"
                        gradient={["#00A699", "#00A699"]}
                        onPress={handleCancelApplication}
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
        marginBottom: 20,
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
    dispatchCancelApplication: (id, applicationsAccepted) =>
        dispatch(cancelAcceptedApplication(id, { applicationsAccepted })),
    dispatchGetUserAction: (id) => dispatch(getUser(id)),

});

const mapStateToProps = createStructuredSelector({
    user: selectUserData,
});

export default connect(mapStateToProps, mapDispatchToProps)(NextJobDetailsPage)