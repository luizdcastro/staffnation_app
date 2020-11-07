import React from "react";

import { createStackNavigator } from "@react-navigation/stack";

import HomePage, { pageOptions as HomepPageOptions } from "../../pages/HomePage";
import JobsTab, { pageOptions as JobsPageOptions } from '../JobsTab'
import SearchPage, { pageOptions as SearchPageOptions } from "../../pages/SearchPage";
import ProfilePage, { pageOptions as ProfileOptions } from '../../pages/ProfilePage'
import TransferPage, { pageOptions as TransferOptions } from '../../pages/TransferPage'

const HomeStack = createStackNavigator();

const HomeStackPage = ({ navigation }) => (
    <HomeStack.Navigator headerMode='screen'>
        <HomeStack.Screen name="HomePage" component={HomePage} options={HomepPageOptions} />
        <HomeStack.Screen name="JobsTab" component={JobsTab} options={JobsPageOptions} />
        <HomeStack.Screen name="SearchPage" component={SearchPage} options={SearchPageOptions} />
        <HomeStack.Screen name="ProfilePage" component={ProfilePage} options={ProfileOptions} />
        <HomeStack.Screen name="TransferPage" component={TransferPage} options={TransferOptions} />
    </HomeStack.Navigator>
);

export default HomeStackPage;
