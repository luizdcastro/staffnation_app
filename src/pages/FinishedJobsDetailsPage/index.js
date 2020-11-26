import React, { useState, useEffect } from 'react'
import { connect } from "react-redux";
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'

import { getSingleJob } from '../../redux/actions/jobActions'

import GradientButton from '../../components/GradientButton'
import JobDetails from '../../components/JobDetails'

const FinishedJobsDetailsPage = ({ route, dispatchGetJobAction }) => {
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

    return (
        <View style={styles.container}>
            {jobDetails._id ?
                <JobDetails
                    title={jobDetails.title}
                    category={jobDetails.category}
                    positions={jobDetails.positions}
                    date={jobDetails.date}
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
                <GradientButton
                    onPress={() => { }}
                    gradient={["#E8E8E8", "#E8E8E8"]}
                    title="Cancelar Trabalho"
                    textStyle={{ color: "#767676" }}
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
});

export default connect(null, mapDispatchToProps)(FinishedJobsDetailsPage)