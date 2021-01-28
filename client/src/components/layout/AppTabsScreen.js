import React from 'react';

// import {connect} from 'react-redux';
// import PropTypes from 'prop-types';

//import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import Posts from '../Tabs/allPosts';
import Home from '../Tabs/Home';
import DrawerIcon from './DrawerIcon';

// import {loadUser} from '../../actions/auth';

//const AppTabs = createBottomTabNavigator();
const AppTabs = createMaterialBottomTabNavigator();

const AppTabsScreen = (props) => {
  return (
    <>
      <DrawerIcon navigation={props.navigation} />
      <AppTabs.Navigator>
        <AppTabs.Screen
          name="Posts"
          component={Posts}
          options={{
            tabBarColor: '#0C6CD5',
            tabBarLabel: 'Home',
            tabBarIcon: (props) => (
              <MaterialCommunityIcons
                name="home"
                color={props.color}
                size={20}
              />
            ),
          }}
        />
        <AppTabs.Screen
          name="Home"
          component={Home}
          options={{
            tabBarColor: '#0C6CD5',
            tabBarLabel: 'Profile',
            tabBarIcon: (props) => (
              <MaterialCommunityIcons
                name="account"
                color={props.color}
                size={20}
              />
            ),
          }}
        />
      </AppTabs.Navigator>
    </>
  );
};

// AppTabsScreen.propTypes = {
//   loadUser: PropTypes.func.isRequired,
// };

export default AppTabsScreen;
