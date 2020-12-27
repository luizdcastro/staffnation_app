import React from "react";
import { connect } from "react-redux";
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from "react-native";
import * as Animatable from "react-native-animatable";

import NextJobsPage from '../NextJobsPage'
import FinishedJobsPage from '../FinishedJobsPage'
import PendingJobsPage from '../PendingJobsPage'

import { useState } from "react/cjs/react.development";

const { width, height } = Dimensions.get('window')

const JobsTabPage = () => {
    const [confirmedJobs, setConfirmedJobs] = useState(true)
    const [pendingJobs, setPendingJobs] = useState(false)
    const [pastJobs, setPastJobs] = useState(false)

    return (
        <View style={styles.container}>
            <View style={styles.tabHeader}>
                <View style={styles.tabMenu}>
                    <TouchableOpacity
                        style={styles.tabItem}
                        onPress={() => {
                            setConfirmedJobs(true);
                            setPendingJobs(false);
                            setPastJobs(false);
                        }}><Text style={styles.tabItemText}>Confirmados</Text>
                        {confirmedJobs ? <Animatable.View animation="zoomIn" duration={500} style={styles.tabHover} /> : null}
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.tabItem}
                        onPress={() => {
                            setPendingJobs(true);
                            setConfirmedJobs(false);
                            setPastJobs(false);
                        }}><Text style={styles.tabItemText}>Pendentes</Text>
                        {pendingJobs ? <Animatable.View animation="zoomIn" duration={500} style={styles.tabHover} /> : null}
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.tabItem}
                        onPress={() => {
                            setPastJobs(true);
                            setConfirmedJobs(false);
                            setPendingJobs(false);
                        }}><Text style={styles.tabItemText}>Histórico</Text>
                        {pastJobs ? <Animatable.View animation="zoomIn" duration={500} style={styles.tabHover} /> : null}
                    </TouchableOpacity>
                </View>
            </View>
            <View style={{ flex: 1 }}>
                {confirmedJobs ? (
                    <NextJobsPage />
                ) : pendingJobs ? (
                    <PendingJobsPage />
                ) : pastJobs ? (
                    <FinishedJobsPage />
                ) : <NextJobsPage />
                }
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fafafa'
    },
    tabHeader: {
        backgroundColor: '#fff',
        borderBottomColor: '#E0E0E0',
        borderBottomWidth: 0.3,
        paddingTop: 25,
        height: 75,
        justifyContent: 'flex-end',
    },
    tabTitle: {
        color: 'grey',
        fontFamily: "NunitoSans_700Bold",
        fontSize: 18,
        paddingRight: 20,
        textAlign: 'center'
    },
    tabMenu: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        color: '#484848',
        fontFamily: "NunitoSans_700Bold",
        alignItems: 'center',
    },
    tabItem: {
        display: 'flex',
        width: width / 3,

    },
    tabItemText: {
        color: 'grey',
        fontFamily: "NunitoSans_700Bold",
        fontSize: 16,
        textAlign: 'center',
        paddingBottom: 8
    },
    tabHover: {
        position: 'absolute',
        bottom: 0,
        width: width / 3,
        borderBottomWidth: 2,
        borderBottomColor: '#523BE4',
    }

});

export default JobsTabPage;
