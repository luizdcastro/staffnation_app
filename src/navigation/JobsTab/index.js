import React, { useEffect } from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from 'reselect';
import { TouchableOpacity, Platform } from 'react-native'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { getMe } from "../../redux/actions/getMeActions"
import NextJobsPage from '../../pages/NextJobsPage'
import FinishedJobsPage from '../../pages/FinishedJobsPage'
import PendingJobsPage from '../../pages/PendingJobsPage'
import { Ionicons } from '@expo/vector-icons';

const Tab = createMaterialTopTabNavigator();

const JobsTab = ({ navigation, dispatchGetMe }) => {

    useEffect(() => dispatchGetMe, [dispatchGetMe])

    useEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <TouchableOpacity style={{ paddingRight: 15 }} onPress={() => navigation.navigate('HelpPage')}>
                    <Ionicons name="ios-help-circle-outline" size={30} color="#00A699" />
                </TouchableOpacity>
            ),
        })
    }, [])

    return (
        <Tab.Navigator style={{ backgroundColor: '#FAFAFA' }} tabBarOptions={{
            indicatorStyle: {
                borderBottomWidth: 3,
                borderBottomColor: '#00A699'
            },
            labelStyle: {
                textTransform: 'capitalize',
                fontFamily: "NunitoSans_700Bold",
                color: '#484848',
                fontSize: 16
            },
            style: {
                height: 45,
                marginBottom: 20,
                backgroundColor: '#fafafa',
                justifyContent: 'center'
            },

        }
        }>
            <Tab.Screen name="Próximos" component={NextJobsPage} />
            <Tab.Screen name="Pendentes" component={PendingJobsPage} />
            <Tab.Screen name="Histórico" component={FinishedJobsPage} />
        </Tab.Navigator>
    );
}

export const pageOptions = {
    headerTitle: 'Meus Trabalhos',
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
        height: Platform.OS === 'ios' ? 70 : 50,
        elevation: 0,
        shadowOpacity: 0

    },
    headerTintColor: '#00A699',

}

const mapDispatchToProps = (dispatch) => ({
    dispatchGetMe: () => dispatch(getMe())
});

const mapStateToProps = (state) => ({
    getme: state.getme,
});

export default connect(mapStateToProps, mapDispatchToProps)(JobsTab)