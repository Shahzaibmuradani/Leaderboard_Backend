import React from 'react';
import PropTypes from 'prop-types';
import {StyleSheet} from 'react-native';
import moment from 'moment';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import {Content, Card, CardItem, View, Text} from 'native-base';

const ShowEducation = ({
  navigation,
  education: {
    _id,
    institute,
    degree,
    fieldofstudy,
    current,
    from,
    to,
    description,
  },
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
                <Text style={{fontWeight: 'bold'}}>{institute}</Text>
                <FontAwesome5Icon
                  style={{marginStart: 278}}
                  name="edit"
                  color="#0C6CD5"
                  onPress={() =>
                    navigation.navigate('EditEducation', {
                      id: _id,
                      institute: institute,
                      degree: degree,
                      fieldofstudy: fieldofstudy,
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
                <Text style={{fontWeight: 'bold'}}>Degree: </Text>
                <Text>{degree}</Text>
              </View>
            </View>
            <View style={styles.row}>
              <View style={styles.section}>
                <Text style={{fontWeight: 'bold'}}>Field of Study: </Text>
                <Text>{fieldofstudy}</Text>
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

ShowEducation.propTypes = {
  education: PropTypes.object.isRequired,
};

export default ShowEducation;
