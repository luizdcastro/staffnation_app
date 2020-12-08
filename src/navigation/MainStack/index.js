import React from "react";
import { StyleSheet } from 'react-native'

import { createStackNavigator } from "@react-navigation/stack";

import BottomTabPage from '../../pages/BottomTabPage';
import HomePage from "../../pages/HomePage";
import JobsTab, { pageOptions as JobsPageOptions } from '../JobsTab'
import SearchJobDetailsPage from '../../pages/SearchJobDetalsPage'
import PendingJobDetailsPage from '../../pages/PendingJobDetailsPage'
import NextJobDetailsPage from '../../pages/NextJobDetailsPage'
import FinishedJobsDetailsPage from '../../pages/FinishedJobsDetailsPage'
import SearchPage from "../../pages/SearchPage";
import ProfilePage from '../../pages/ProfilePage'
import AvatarPage, { pageOptions as AvatarOptions } from '../../pages/AvatarPage'
import PersonalDataPage, { pageOptions as PersonalOptions } from '../../pages/PersonalDataPage'
import AdressDataPage, { pageOptions as AddressOptions } from '../../pages/AdressDataPage'
import ProfessionalDataPage, { pageOptions as ProfessionalOptions } from '../../pages/ProfessionalDataPage'
import BankDataPage, { pageOptions as BankOptions } from '../../pages/BankDataPage'
import TransferPage from '../../pages/TransferPage'
import HelpPage, { pageOptions as HelpOptions } from '../../pages/HelpPage'
import NotificationPage, { pageOptions as NotificationOptions } from '../../pages/NotificationPage'

const MainStack = createStackNavigator();

const BottomStack = ({ navigation }) => (
    <MainStack.Navigator headerMode='screen'>
        <MainStack.Screen name="BottomTabPage" component={BottomTabPage} options={{ headerShown: false }} />
        <MainStack.Screen name="HomePage" component={HomePage} />
        <MainStack.Screen name="Search" component={SearchPage} />
        <MainStack.Screen name="TransferPage" component={TransferPage} />
        <MainStack.Screen name="JobsTab" component={JobsTab} options={JobsPageOptions} />
        <MainStack.Screen name="ProfilePage" component={ProfilePage} options={{ headerShown: false }} />
        <MainStack.Screen name="SearchJobDetailsPage" component={SearchJobDetailsPage} options={{ headerShown: false }} />
        <MainStack.Screen name="PendingJobDetailsPage" component={PendingJobDetailsPage} options={{ headerShown: false }} />
        <MainStack.Screen name="NextJobDetailsPage" component={NextJobDetailsPage} options={{ headerShown: false }} />
        <MainStack.Screen name="FinishedJobsDetailsPage" component={FinishedJobsDetailsPage} options={{ headerShown: false }} />
        <MainStack.Screen name="PersonalDataPage" component={PersonalDataPage} options={PersonalOptions} />
        <MainStack.Screen name="AdressDataPage" component={AdressDataPage} options={AddressOptions} />
        <MainStack.Screen name="ProfessionalDataPage" component={ProfessionalDataPage} options={ProfessionalOptions} />
        <MainStack.Screen name="BankDataPage" component={BankDataPage} options={BankOptions} />
        <MainStack.Screen name="AvatarPage" component={AvatarPage} options={AvatarOptions} />
        <MainStack.Screen name="NotificationPage" component={NotificationPage} options={NotificationOptions} />
    </MainStack.Navigator>
)

const MainStackPage = ({ navigation }) => (
    <MainStack.Navigator headerMode='screen'>
        <MainStack.Screen name="BottomStack" component={BottomStack} options={{ headerShown: false }} />
    </MainStack.Navigator>
);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
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
    }
});

export default MainStackPage;
