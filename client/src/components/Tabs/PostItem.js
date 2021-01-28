import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import {Button} from 'react-native-paper';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {
  Container,
  Content,
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
import Apply from './Apply';
const logo = require('../../img/showcase.jpg');

const PostItem = ({
  navigation,
  user,
  post: {_id, name, avatar, text, faqs, date},
}) => {
  return (
    <>
      <Container style={styles.container}>
        <Content padder style={{padding: 10}}>
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
            <CardItem>
              <Left>
                <Button transparent textStyle={{color: '#87838B'}}>
                  <Icon name="logo-github" />
                  <Text>1,926 stars</Text>
                </Button>
              </Left>
            </CardItem>
            <CardItem footer bordered>
              {user && user.status === 'Student' ? (
                <>
                  <View style={styles.row}>
                    <View style={styles.section}>
                      <TouchableOpacity>
                        <Text
                          style={[{color: '#0C6CD5'}, {marginEnd: 18}]}
                          onPress={() => navigation.navigate('Reviews')}>
                          Review
                        </Text>
                      </TouchableOpacity>
                      <TouchableOpacity>
                        <Text
                          style={{color: '#0C6CD5'}}
                          onPress={() =>
                            navigation.navigate('Apply', {faqs: faqs, _id: _id})
                          }>
                          Apply
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </>
              ) : (
                <Button
                  mode="contained"
                  style={styles.button}
                  color="#0C6CD5"
                  onPress={() => navigation.navigate('FAQs')}>
                  Make FAQs
                </Button>
              )}
            </CardItem>
          </Card>
        </Content>
      </Container>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFF',
  },
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

// const mapStateToProps = state => ({

// })

export default connect(null, {})(PostItem);
