import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import Login from '../auth/Login';
import Register from '../auth/Register';
import Test from '../Tabs/Test';
import Reviews from '../Tabs/Reviews';

import AppTabsScreen from './AppTabsScreen';
import AppDrawerScreen from './AppDrawerScreen';
import CreateProfile from '../Dashboard/CreateProfile';
import DashboardActions from '../Dashboard/DashboardActions';
import EditProfile from '../Dashboard/EditProfile';
import AddEducation from '../Dashboard/AddEducation';
import AddExperience from '../Dashboard/AddExperience';
import EditEducation from '../Dashboard/EditEducation';
import EditExperience from '../Dashboard/EditExperience';
import Apply from '../Tabs/Apply';
import PostItem from '../Tabs/PostItem';
import Help from '../Tabs/Help';

const DefaultStack = createStackNavigator();

const DefaultStackScreen = () => {
  return (
    <DefaultStack.Navigator headerMode="none">
      <DefaultStack.Screen name="Login" component={Login} />
      <DefaultStack.Screen name="Register" component={Register} />
      <DefaultStack.Screen name="AppDrawerScreen" component={AppDrawerScreen} />
      <DefaultStack.Screen name="AppTabsScreen" component={AppTabsScreen} />
      <DefaultStack.Screen name="Test" component={Test} />
      <DefaultStack.Screen name="PostItem" component={PostItem} />
      <DefaultStack.Screen name="Apply" component={Apply} />
      <DefaultStack.Screen name="Reviews" component={Reviews} />
      <DefaultStack.Screen name="Help" component={Help} />
      <DefaultStack.Screen name="CreateProfile" component={CreateProfile} />
      <DefaultStack.Screen
        name="DashboardActions"
        component={DashboardActions}
      />
      <DefaultStack.Screen name="EditProfile" component={EditProfile} />
      <DefaultStack.Screen name="AddEducation" component={AddEducation} />
      <DefaultStack.Screen name="AddExperience" component={AddExperience} />
      <DefaultStack.Screen name="EditEducation" component={EditEducation} />
      <DefaultStack.Screen name="EditExperience" component={EditExperience} />
    </DefaultStack.Navigator>
  );
};

export default DefaultStackScreen;
