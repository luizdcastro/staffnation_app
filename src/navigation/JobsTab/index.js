import React, { useEffect } from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from 'reselect';
import { TouchableOpacity, Platform } from 'react-native'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { selectUserData } from '../../redux/reducers/user/userSelector'
import { getUser } from "../../redux/actions/userActions"
import NextJobsPage from '../../pages/NextJobsPage'
import PastJobsPage from '../../pages/PastJobsPage'
import PendingJobsPage from '../../pages/PendingJobsPage'
import { Ionicons } from '@expo/vector-icons';

const Tab = createMaterialTopTabNavigator();

const JobsTab = ({ user, dispatchGetUserAction }) => {

    useEffect(() => {
        dispatchGetUserAction(user.data._id)
    }, [dispatchGetUserAction])

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
            <Tab.Screen name="Histórico" component={PastJobsPage} />
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
    headerRight: () => (
        <TouchableOpacity style={{ paddingRight: 15 }}>
            <Ionicons name="ios-help-circle-outline" size={28} color="#00A699" />
        </TouchableOpacity>
    )

}

const mapDispatchToProps = (dispatch) => ({
    dispatchGetUserAction: (id) => dispatch(getUser(id))
});

const mapStateToProps = createStructuredSelector({
    user: selectUserData,
});

export default connect(mapStateToProps, mapDispatchToProps)(JobsTab)