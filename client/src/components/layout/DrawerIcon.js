import {Left} from 'native-base';
import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';

const DrawerIcon = (props) => {
  const drawerToggleHandler = () => {
    props.navigation.toggleDrawer();
  };
  return (
    <>
      <View style={[styles.container, {flexDirection: 'row'}]}>
        <FontAwesome5Icon
          style={styles.icon}
          name="bars"
          onPress={drawerToggleHandler}
          size={18}
        />
        <Text style={styles.text}>
          HearMeOut <FontAwesome5Icon name="bullhorn" size={20} />
        </Text>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFF',
    margin: 10,
  },
  icon: {
    margin: 6,
    marginEnd: 'auto',
  },
  text: {
    color: '#0C6CD5',
    textAlign: 'center',
    fontWeight: '700',
    fontSize: 22,
    marginEnd: 'auto',
  },
});

export default DrawerIcon;
