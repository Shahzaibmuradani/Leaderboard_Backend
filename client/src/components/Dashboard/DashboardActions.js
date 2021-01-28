import React from 'react';
import {StyleSheet} from 'react-native';
import {View} from 'native-base';
import {Button} from 'react-native-paper';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';

const DashboardActions = ({navigation}) => {
  return (
    <>
      <View style={{marginBottom: 8}}>
        <View style={styles.row}>
          <View style={styles.section}>
            <Button
              contentStyle={{flexDirection: 'row-reverse'}}
              style={[
                {marginTop: 6},
                {marginLeft: 2},
                {alignSelf: 'flex-start'},
              ]}
              mode="contained"
              color="#E5EAEA"
              onPress={() => navigation.navigate('EditProfile')}>
              <FontAwesome5Icon
                name="user-edit"
                color="#0275d8"></FontAwesome5Icon>{' '}
              Edit Profile
            </Button>
          </View>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  row: {
    marginTop: 6,
    flexDirection: 'row',
    alignItems: 'center',
  },
  section: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 15,
  },
});

export default DashboardActions;
