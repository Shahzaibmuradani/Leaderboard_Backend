import React from 'react';
import PropTypes from 'prop-types';
import {StyleSheet} from 'react-native';
import moment from 'moment';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import {Content, Card, CardItem, View, Text} from 'native-base';

const ShowExperience = ({
  navigation,
  experience: {_id, title, company, location, current, from, to, description},
}) => {
  const fromdate = moment(from).format('YYYY/MM/DD');
  const todate = moment(to).format('YYYY/MM/DD');
  return (
    <Content>
      <Card>
        <CardItem>
          <View>
            <View style={styles.row}>
              <View style={styles.section}>
                <Text style={{fontWeight: 'bold'}}>{title}</Text>
                <FontAwesome5Icon
                  style={{marginStart: 239}}
                  name="edit"
                  color="#0C6CD5"
                  onPress={() =>
                    navigation.navigate('EditExperience', {
                      id: _id,
                      title: title,
                      company: company,
                      location: location,
                      current: current,
                      from: from,
                      to: to,
                      description: description,
                    })
                  }
                />
              </View>
            </View>
            <View style={styles.row}>
              <View style={styles.section}>
                <Text style={{fontWeight: 'bold'}}>Company: </Text>
                <Text>{company}</Text>
              </View>
            </View>
            <View style={styles.row}>
              <View style={styles.section}>
                <Text style={{fontWeight: 'bold'}}>Location: </Text>
                <Text>{location}</Text>
              </View>
            </View>
            <View style={styles.row}>
              <View style={styles.section}>
                {<Text>{fromdate} - </Text>}
                {current ? <Text>Present</Text> : <Text>{todate}</Text>}
              </View>
            </View>
            <View style={styles.row}>
              <View style={styles.section}>
                <Text style={{fontWeight: 'bold'}}>Description: </Text>
                <Text>{description}</Text>
              </View>
            </View>
          </View>
        </CardItem>
      </Card>
    </Content>
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

ShowExperience.propTypes = {
  experience: PropTypes.object.isRequired,
};

export default ShowExperience;
