import React from "react";
import { View, Platform } from 'react-native'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import NextJobsPage from '../../pages/NextJobsPage'
import PastJobsPage from '../../pages/PastJobsPage'
import PendingJobsPage from '../../pages/PendingJobsPage'

import { Ionicons } from '@expo/vector-icons';


const Tab = createMaterialTopTabNavigator();

const JobsTab = () => {
    return (
        <Tab.Navigator style={{ backgroundColor: '#eceff1' }} tabBarOptions={{
            indicatorStyle: {
                borderBottomWidth: 2.5,
                borderBottomColor: '#dce5eb'
            },
            labelStyle: {
                textTransform: 'capitalize',
                fontFamily: "Montserrat_500Medium",
                color: '#fff',
                fontSize: 14
            },
            style: {
                height: 55,
                marginTop: 15,
                borderTopLeftRadius: 10,
                borderTopRightRadius: 10,
                marginHorizontal: 15,
                backgroundColor: '#2397d4',
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
        color: '#fff',
        fontFamily: "Montserrat_700Bold",
        fontSize: 18,
        textAlign: 'center',

    },
    headerBackTitleVisible: false,
    headerStyle: {
        backgroundColor: '#343d52',
        height: Platform.OS === 'ios' ? 90 : 70,
        elevation: 0,
        shadowOpacity: 0,
    },
    headerTintColor: '#fff',
    headerBackImage: () => (
        <Ionicons name="ios-arrow-back" size={35} color="#fff" style={{ marginLeft: Platform.OS === 'ios' ? 15 : 10 }} />
    )


}

export default JobsTab