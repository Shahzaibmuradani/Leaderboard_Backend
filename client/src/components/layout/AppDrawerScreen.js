import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import AppTabsScreen from './AppTabsScreen';

import {View, StyleSheet} from 'react-native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {Avatar, Title, Caption, Paragraph, Drawer} from 'react-native-paper';
import {DrawerContentScrollView, DrawerItem} from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {logout} from '../../actions/auth';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';

const logo = require('../../img/showcase.jpg');
const AppDrawer = createDrawerNavigator();

const AppDrawerScreen = ({logout, auth}) => {
  return (
    <AppDrawer.Navigator
      drawerContent={(props) => (
        <DrawerContent {...props} logout={logout} auth={auth} />
      )}>
      <AppDrawer.Screen name="App" component={AppTabsScreen} />
    </AppDrawer.Navigator>
  );
};

function DrawerContent(props) {
  const {
    logout,
    navigation,
    auth: {user},
  } = props;
  const onSubmit = () => {
    logout();
    navigation.navigate('Login');
  };

  return (
    <View style={{flex: 1}}>
      <DrawerContentScrollView {...props}>
        <View style={styles.drawerContent}>
          <View style={styles.userInfoSection}>
            <View style={{flexDirection: 'row', marginTop: 15}}>
              <Avatar.Image source={logo} size={50} />
              <View style={{marginLeft: 15, flexDirection: 'column'}}>
                <Title style={styles.title}>{user && user.name}</Title>
                <Caption style={styles.caption}>
                  {user && (
                    <Icon style={{color: 'green'}} name="circle">
                      {' '}
                      Online
                    </Icon>
                  )}
                </Caption>
              </View>
            </View>
            <View style={styles.row}>
              <View style={styles.section}>
                <Paragraph style={[styles.paragraph, styles.caption]}>
                  Status :
                </Paragraph>
                <Caption style={[styles.caption, {marginLeft: 10}]}>
                  {user && user.status}
                </Caption>
              </View>
            </View>
          </View>
        </View>
        {/* <Drawer.Section style={styles.drawerSection}>
          <DrawerItem
            icon={({color, size}) => (
              <Icon name="home-outline" color={color} size={size} />
            )}
            label="Home"
            onPress={() => {
              props.navigation.navigate('Home');
            }}
          />
          <DrawerItem
            icon={({color, size}) => (
              <Icon name="account-outline" color={color} size={size} />
            )}
            label="Profile"
            onPress={() => {
              props.navigation.navigate('Home');
            }}
          />
        </Drawer.Section> */}
      </DrawerContentScrollView>
      <Drawer.Section style={styles.bottomDrawerSection}>
        <DrawerItem
          icon={({color, size}) => (
            <Icon name="exit-to-app" color={color} size={size} />
          )}
          label="Logout"
          onPress={() => {
            onSubmit();
          }}
        />
      </Drawer.Section>
    </View>
  );
}

AppDrawerScreen.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, {logout})(AppDrawerScreen);

const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
  },
  userInfoSection: {
    paddingLeft: 20,
  },
  title: {
    fontSize: 16,
    marginTop: 3,
    fontWeight: 'bold',
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
  },
  row: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  section: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 15,
  },
  paragraph: {
    fontWeight: 'bold',
    marginRight: 3,
  },
  drawerSection: {
    marginTop: 15,
  },
  bottomDrawerSection: {
    marginBottom: 15,
    borderTopColor: '#f4f4f4',
    borderTopWidth: 1,
  },
});
