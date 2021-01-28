import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import {loadUser} from '../../actions/auth';
import Spinner from '../layout/Spinner';

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

const logo = require('../../img/showcase.jpg');

const Posts = ({navigation, loadUser, auth: {loading, user}}) => {
  useEffect(() => {
    loadUser();
  }, [loadUser]);
  return (
    <>
      {loading && user === null ? (
        <Spinner />
      ) : (
        <Container style={styles.container}>
          <Content padder style={{padding: 10}}>
            <Card style={styles.mb}>
              <CardItem bordered>
                <Left>
                  <Thumbnail source={logo} />
                  <Body>
                    <Text>NativeBase</Text>
                    <Text note>April 15, 2016</Text>
                  </Body>
                </Left>
              </CardItem>
              <CardItem>
                <Body>
                  <Text>
                    NativeBase is a free and source framework that enable
                    developers to build high-quality mobile apps using React
                    Native iOS and Android apps with a fusion of ES6. NativeBase
                    builds a layer on top of React Native that provides you with
                    basic set of components for mobile application development.
                  </Text>
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
                            onPress={() => navigation.navigate('Apply')}>
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
      )}
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

Posts.propTypes = {
  loadUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, {loadUser})(Posts);
