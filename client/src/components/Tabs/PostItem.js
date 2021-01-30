import React, {Fragment} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import {Button} from 'react-native-paper';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {
  Icon,
  Card,
  CardItem,
  Text,
  Thumbnail,
  Left,
  Body,
  View,
} from 'native-base';
import moment from 'moment';
//import Apply from './Apply';
const logo = require('../../img/showcase.jpg');

const PostItem = ({
  navigation,
  user,
  post: {_id, name, avatar, text, faqs, date},
}) => {
  return (
    <>
      <Card style={styles.mb}>
        <CardItem bordered>
          <Left>
            <Thumbnail source={logo} />
            <Body>
              <Text>{name}</Text>
              <Text note>{moment(date).format('YYYY/MM/DD')}</Text>
            </Body>
          </Left>
        </CardItem>
        <CardItem>
          <Body>
            <Text>{text}</Text>
          </Body>
        </CardItem>
        <CardItem footer bordered>
          {user && user.status === 'Student' ? (
            <>
              <View style={styles.row}>
                <View style={styles.section}>
                  {faqs.map((faq) =>
                    faq.user === user._id ? (
                      <Fragment key={user._id}>
                        <TouchableOpacity>
                          <Text
                            style={[{color: '#0C6CD5'}, {marginEnd: 14}]}
                            onPress={() => navigation.navigate('Reviews')}>
                            Review
                          </Text>
                        </TouchableOpacity>
                        <Text
                          key={faq._id}
                          style={{color: 'green', marginEnd: 18}}
                          onPress={() =>
                            navigation.navigate('Apply', {faqs: faqs, _id: _id})
                          }>
                          Applied
                        </Text>
                      </Fragment>
                    ) : (
                      <TouchableOpacity>
                        <Text
                          key={faq._id}
                          style={[{color: '#0C6CD5'}, {marginStart: 12}]}
                          onPress={() =>
                            navigation.navigate('Apply', {faqs: faqs, _id: _id})
                          }>
                          Apply
                        </Text>
                      </TouchableOpacity>
                    ),
                  )}
                </View>
              </View>
            </>
          ) : (
            <Button
              mode="contained"
              style={styles.button}
              color="#0C6CD5"
              onPress={() => navigation.navigate('Test')}>
              Make FAQs
            </Button>
          )}
        </CardItem>
      </Card>
    </>
  );
};

const styles = StyleSheet.create({
  text: {
    alignSelf: 'center',
    marginBottom: 7,
  },
  mb: {
    marginBottom: 15,
  },
  button: {
    marginStart: 'auto',
    marginEnd: 'auto',
    alignSelf: 'center',
  },
  row: {
    marginTop: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  section: {
    flexDirection: 'row',
    alignItems: 'center',
    marginStart: 220,
  },
});

PostItem.propTypes = {
  post: PropTypes.object.isRequired,
};

export default connect(null, {})(PostItem);
