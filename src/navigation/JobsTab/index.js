import React from "react";
import { TouchableOpacity, Platform } from 'react-native'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import NextJobsPage from '../../pages/NextJobsPage'
import PastJobsPage from '../../pages/PastJobsPage'
import PendingJobsPage from '../../pages/PendingJobsPage'

import { Ionicons } from '@expo/vector-icons';

const Tab = createMaterialTopTabNavigator();

const JobsTab = () => {
    return (
        <Tab.Navigator style={{ backgroundColor: '#FAFAFA' }} tabBarOptions={{
            indicatorStyle: {
                borderBottomWidth: 1.5,
                borderBottomColor: '#E0E0E0'
            },
            labelStyle: {
                textTransform: 'capitalize',
                fontFamily: "NunitoSans_600SemiBold",
                color: '#fafafa',
                fontSize: 15
            },
            style: {
                height: 55,
                marginTop: 20,
                marginBottom: 20,
                borderTopLeftRadius: 10,
                borderTopRightRadius: 10,
                marginHorizontal: 15,
                backgroundColor: '#00A699',
                elevation: 0,
                shadowOpacity: 0,
                justifyContent: 'center'

            },

        }
        }>
            <Tab.Screen name="Próximos" component={NextJobsPage} />
            <Tab.Screen name="Pendentes" component={PastJobsPage} />
            <Tab.Screen name="Histórico" component={PendingJobsPage} />
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
        height: Platform.OS === 'ios' ? 90 : 70,
    },
    headerTintColor: '#00A699',
    headerRight: () => (
        <TouchableOpacity style={{ paddingRight: 15 }}>
            <Ionicons name="ios-help-circle-outline" size={28} color="#00A699" />
        </TouchableOpacity>
    )

}

export default JobsTab