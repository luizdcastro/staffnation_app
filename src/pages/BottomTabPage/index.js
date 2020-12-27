import React, { useState, useEffect } from 'react'
import { connect } from "react-redux";
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native'

import Icon from 'react-native-vector-icons/Feather';
import { LinearGradient } from 'expo-linear-gradient';

import HomePage from '../HomePage';
import SearchPage from '../SearchPage';
import TransferPage from '../TransferPage'
import ProfilePage from '../ProfilePage'
import JobsTabPage from '../JobsTabPage'
import { getMe } from "../../redux/actions/getMeActions"

const { width, height } = Dimensions.get('window')

const BottomTabPage = ({ navigation, dispatchGetMe }) => {
    const [home, setHome] = useState(true)
    const [jobs, setJobs] = useState(false)
    const [search, setSearch] = useState(false)
    const [transfer, setTransfer] = useState(false)
    const [profile, setProfile] = useState(false)
    const [value, setValue] = useState('')

    useEffect(() => dispatchGetMe, [dispatchGetMe])

    return (
        <View style={styles.container}>
            {home ? (
                <HomePage navigation={navigation} setHome={setHome} setJobs={setJobs} setSearch={setSearch} setValue={setValue} />
            ) : jobs ? (
                <JobsTabPage navigation={navigation} />
            ) : search ? (
                <SearchPage navigation={navigation} setHome={setHome} setSearch={setSearch} value={value} setValue={setValue} />
            ) : transfer ? (
                < TransferPage navigation={navigation} setHome={setHome} setTransfer={setTransfer} />
            ) : profile ? (
                <ProfilePage navigation={navigation} setHome={setHome} setProfile={setProfile} />
            ) : <HomePage navigation={navigation} />
            }
            <View>
                {!transfer ?
                    <View style={styles.bottomBar}>
                        <TouchableOpacity activeOpacity={0.5} style={styles.buttonBar}
                            onPress={() => { setHome(true); setJobs(false); setSearch(false); setTransfer(false); setProfile(false) }}>
                            <Icon name="home" size={home ? 28 : 26} color={home ? '#523BE4' : '#777'} />
                            <Text style={home ? styles.textActive : styles.textInactive}>Home</Text>
                        </TouchableOpacity>
                        <TouchableOpacity activeOpacity={0.5} style={styles.buttonBar}
                            onPress={() => { setHome(false); setJobs(true); setSearch(false); setTransfer(false); setProfile(false) }}>
                            <Icon name="calendar" size={jobs ? 28 : 26} color={jobs ? '#523BE4' : '#777'} />
                            <Text style={jobs ? styles.textActive : styles.textInactive}>Agenda</Text>
                        </TouchableOpacity>
                        <TouchableOpacity activeOpacity={0.5} style={styles.buttonBar}
                            onPress={() => { setHome(false); setJobs(false); setSearch(true); setTransfer(false); setProfile(false); setValue('') }}>
                            <LinearGradient style={styles.iconTabRound} start={{ x: 0, y: 1 }} end={{ x: 0, y: 0 }} colors={['#523BE4', '#6978EA']}>
                                <Icon name="search" size={search ? 28 : 26} color='#FFF' />
                            </LinearGradient>
                        </TouchableOpacity>
                        <TouchableOpacity activeOpacity={0.5} style={styles.buttonBar}
                            onPress={() => { setHome(false); setJobs(false); setSearch(false); setTransfer(true); setProfile(false) }}>
                            <Icon name="repeat" size={transfer ? 28 : 26} color={transfer ? '#523BE4' : '#777'} />
                            <Text style={transfer ? styles.textActive : styles.textInactive}>Transferir</Text>
                        </TouchableOpacity>
                        <TouchableOpacity activeOpacity={0.5} style={styles.buttonBar}
                            onPress={() => { setHome(false); setJobs(false); setSearch(false); setTransfer(false); setProfile(true) }}>
                            <Icon name="user" size={profile ? 28 : 26} color={profile ? '#523BE4' : '#777'} />
                            <Text style={profile ? styles.textActive : styles.textInactive}>Perfil</Text>
                        </TouchableOpacity>
                    </View>
                    : null
                }
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fafafa',
        justifyContent: 'space-between'
    },
    bottomBar: {
        backgroundColor: '#fff',
        height: 50,
        flexDirection: 'row',
        justifyContent: 'space-around',
        borderTopColor: '#E0E0E0',
        borderTopWidth: 0.3,
        paddingBottom: 3,
        paddingTop: 3,
    },
    buttonBar: {
        width: width / 5,
        justifyContent: 'center',
        alignItems: 'center'
    },
    textActive: {
        fontFamily: 'NunitoSans_600SemiBold',
        fontSize: 11,
        color: '#523BE4'
    },
    textInactive: {
        fontFamily: 'NunitoSans_600SemiBold',
        fontSize: 11,
        color: '#777'
    },
    iconTabRound: {
        width: 50,
        height: 50,
        borderRadius: 25,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 1,
        shadowColor: '#2193b0',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
        marginBottom: 12
    }
})

const mapDispatchToProps = (dispatch) => ({
    dispatchGetMe: () => dispatch(getMe()),
});

export default connect(null, mapDispatchToProps)(BottomTabPage)