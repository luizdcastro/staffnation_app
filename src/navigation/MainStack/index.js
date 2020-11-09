import React from "react";

import { createStackNavigator } from "@react-navigation/stack";

import HomePage, { pageOptions as HomePageOptions } from "../../pages/HomePage";
import JobsTab, { pageOptions as JobsPageOptions } from '../JobsTab'
import SearchPage, { pageOptions as SearchPageOptions } from "../../pages/SearchPage";
import ProfilePage, { pageOptions as ProfileOptions } from '../../pages/ProfilePage'
import PersonalDataPage, { pageOptions as PersonalOptions } from '../../pages/PersonalDataPage'
import AdressDataPage, { pageOptions as AddressOptions } from '../../pages/AdressDataPage'
import ProfessionalDataPage, { pageOptions as ProfessionalOptions } from '../../pages/ProfessionalDataPage'
import BankDataPage, { pageOptions as BankOptions } from '../../pages/BankDataPage'
import TransferPage, { pageOptions as TransferOptions } from '../../pages/TransferPage'


const MainStack = createStackNavigator();

const MainStackPage = ({ navigation }) => (
    <MainStack.Navigator headerMode='screen'>
        <MainStack.Screen name="HomePage" component={HomePage} options={HomePageOptions} />
        <MainStack.Screen name="JobsTab" component={JobsTab} options={JobsPageOptions} />
        <MainStack.Screen name="SearchPage" component={SearchPage} options={SearchPageOptions} />
        <MainStack.Screen name="ProfilePage" component={ProfilePage} options={ProfileOptions} />
        <MainStack.Screen name="PersonalDataPage" component={PersonalDataPage} options={PersonalOptions} />
        <MainStack.Screen name="AdressDataPage" component={AdressDataPage} options={AddressOptions} />
        <MainStack.Screen name="ProfessionalDataPage" component={ProfessionalDataPage} options={ProfessionalOptions} />
        <MainStack.Screen name="BankDataPage" component={BankDataPage} options={BankOptions} />
        <MainStack.Screen name="TransferPage" component={TransferPage} options={TransferOptions} />
    </MainStack.Navigator>
);

export default MainStackPage;
