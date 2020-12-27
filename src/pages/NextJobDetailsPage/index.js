import React, { useState, useEffect } from 'react'
import { connect } from "react-redux";
import { View, StyleSheet, Modal } from 'react-native'

import { getSingleJob, cancelAcceptedApplication } from '../../redux/actions/jobActions'
import { getMe } from "../../redux/actions/getMeActions"

import LightButton from '../../components/LightButton'
import CustomButton from '../../components/CustomButton'
import LateNotification from '../../components/LateNotification'
import JobDetails from '../../components/JobDetails'

const NextJobDetailsPage = ({ getme, navigation, route, dispatchGetJobAction, dispatchCancelApplication, dispatchGetMe }) => {
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
            getme.data._id
        )
        dispatchGetMe()
        navigation.goBack();
    }

    return (
        <View style={styles.container}>
            <Modal
                animationType="fade"
                transparent={true}
                visible={modalNotification}>
                <LateNotification
                    setModalNotification={setModalNotification}
                />
            </Modal>
            {jobDetails._id ?
                <JobDetails
                    navigation={navigation}
                    title={jobDetails.store.name}
                    category={jobDetails.category}
                    positions={jobDetails.positions}
                    date={jobDetails.date}
                    timeStart={jobDetails.time.start}
                    timeEnd={jobDetails.time.end}
                    payment={parseInt(jobDetails.payment).toFixed(2)}
                    uniform={jobDetails.uniform}
                    addressStreet={jobDetails.store.address.street}
                    addressNumber={jobDetails.store.number}
                    addressNeighborhood={jobDetails.store.address.neighborhood}
                    addressCity={jobDetails.store.address.city}
                    addressState={jobDetails.store.address.state}
                    image={jobDetails.store.image}


                /> : null}
            <View style={styles.buttonsContainer}>
                <LightButton
                    textColor="#523BE4"
                    borderColor="#523BE4"
                    name="Notificar Atraso"
                    onPress={() => setModalNotification(true)} />
                <CustomButton
                    name="Cancelar Trabalho"
                    background="#523BE4"
                    onPress={handleCancelApplication}
                />
            </View>
        </View >
    )
}

export const pageOptions = {
    headerTitle: 'Detalhes da Vaga',
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
        alignItems: 'center',
        marginHorizontal: 10
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
    dispatchGetMe: () => dispatch(getMe())
});

const mapStateToProps = (state) => ({
    getme: state.getme,
});

export default connect(mapStateToProps, mapDispatchToProps)(NextJobDetailsPage)