import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Platform } from 'react-native'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { getMe } from "../../redux/actions/getMeActions"

import NextJobsPage from '../../pages/NextJobsPage'
import FinishedJobsPage from '../../pages/FinishedJobsPage'
import PendingJobsPage from '../../pages/PendingJobsPage'

const Tab = createMaterialTopTabNavigator();

const JobsTab = ({ navigation, dispatchGetMe }) => {

    return (
        <Tab.Navigator style={{ backgroundColor: '#FAFAFA' }} tabBarOptions={{
            indicatorStyle: {
                borderBottomWidth: 2,
                borderBottomColor: '#523BE4'
            },
            labelStyle: {
                textTransform: 'capitalize',
                fontFamily: "NunitoSans_600SemiBold",
                color: '#484848',
                fontSize: 16,
                backgroundColor: '#fff',
                alignItems: 'flex-start'

            },
            style: {
                height: 70,
                marginBottom: 15,
                paddingTop: 25,
                backgroundColor: '#fff',
            },
        }}>
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
        textAlign: 'center',

    },
    headerBackTitleVisible: false,
    headerStyle: {
        backgroundColor: '#fff',
        height: Platform.OS === 'ios' ? 65 : 45,
        elevation: 0,
        shadowOpacity: 0
    },
    headerTintColor: 'grey',

}

const mapDispatchToProps = (dispatch) => ({
    dispatchGetMe: () => dispatch(getMe())
});

const mapStateToProps = (state) => ({
    getme: state.getme,
});

export default connect(mapStateToProps, mapDispatchToProps)(JobsTab)