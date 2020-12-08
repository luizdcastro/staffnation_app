import React, { useState, useEffect } from 'react'
import { connect } from "react-redux";
import { View, Text, StyleSheet } from 'react-native'

import { getSingleJob, removePendingApplication } from '../../redux/actions/jobActions'
import { getMe } from "../../redux/actions/getMeActions"

import LightButton from '../../components/LightButton'
import JobDetails from '../../components/JobDetails'

const PendingJobDetailsPage = ({ getme, route, navigation, dispatchGetJobAction, dispatchCancelApplication, dispatchGetMe }) => {
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
    }, []);

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
            {jobDetails._id ?
                <JobDetails
                    navigation={navigation}
                    title={jobDetails.title}
                    date={jobDetails.date}
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
                <View style={{ marginBottom: 45 }}>
                    <Text style={{ fontFamily: 'NunitoSans_600SemiBold', fontSize: 15, color: 'grey' }}>Sua candidatura foi enviada com sucesso!{"\n"}Aguardando confirmação do recrutador.</Text>
                </View>
                <View style={{ width: '95%' }}>
                    <LightButton
                        textColor="#523BE4"
                        borderColor="#523BE4"
                        name="Cancelar Aplicação"
                        onPress={handleCancelApplication} />
                </View>
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
    dispatchGetJobAction: (id, onSuccess, onError) =>
        dispatch(getSingleJob(id, onSuccess, onError)),
    dispatchCancelApplication: (id, applicationsPending) =>
        dispatch(removePendingApplication(id, { applicationsPending })),
    dispatchGetMe: () => dispatch(getMe()),

});

const mapStateToProps = (state) => ({
    getme: state.getme,
});

export default connect(mapStateToProps, mapDispatchToProps)(PendingJobDetailsPage)