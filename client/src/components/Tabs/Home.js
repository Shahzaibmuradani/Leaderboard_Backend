import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {getCurrentProfile} from '../../actions/profile';

import {Image, StyleSheet, Dimensions} from 'react-native';
import {
  Container,
  Content,
  Card,
  CardItem,
  Text,
  Thumbnail,
  Left,
  Body,
  View,
} from 'native-base';
import {Button} from 'react-native-paper';
import Spinner from '../layout/Spinner';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import DashboardActions from '../Dashboard/DashboardActions';
import ShowEducation from '../Dashboard/ShowEducation';
import ShowExperience from '../Dashboard/ShowExperience';

const deviceWidth = Dimensions.get('window').width;
const logo = require('../../img/showcase.jpg');
const cardImage = require('../../img/bg.jpg');

const Home = ({
  getCurrentProfile,
  auth: {user},
  profile: {profile, loading},
  navigation,
}) => {
  useEffect(() => {
    getCurrentProfile();
    profile;
  }, [getCurrentProfile, profile]);

  return loading && profile === null ? (
    <Spinner />
  ) : (
    <Container style={styles.container}>
      {profile !== null ? (
        <>
          <Content padder style={{padding: 10}}>
            <View>
              <DashboardActions navigation={navigation} />
            </View>
            <Card style={styles.mb}>
              <CardItem bordered>
                <Left>
                  <Thumbnail source={logo} />
                  <Body>
                    <Text>Welcome {user && user.name}</Text>
                    <Text note>{user && user.email}</Text>
                  </Body>
                </Left>
              </CardItem>
              <CardItem>
                <Body>
                  <Image
                    style={{
                      alignSelf: 'center',
                      height: 150,
                      resizeMode: 'cover',
                      width: deviceWidth / 1.18,
                      marginVertical: 5,
                    }}
                    source={cardImage}
                  />
                  <Text note>Bio :</Text>
                  <Text>{profile.bio}</Text>
                  <View style={{marginBottom: 6}}></View>
                  <Text note>Field :</Text>
                  <Text>{profile.field}</Text>
                  <View style={{marginBottom: 6}}></View>
                </Body>
              </CardItem>
              <CardItem style={{paddingVertical: 0}}>
                <Left>
                  <FontAwesome5Icon color="#0275d8" name="location-arrow" />
                  <Text>{profile.location}</Text>
                </Left>
              </CardItem>
            </Card>
            <View>
              <View>
                <Text
                  style={[
                    {color: '#0C6CD5'},
                    {fontWeight: 'bold'},
                    {fontSize: 20},
                  ]}>
                  Education{'   '}
                  {'                                                   '}
                  <FontAwesome5Icon
                    name="plus"
                    onPress={() => navigation.navigate('AddEducation')}
                  />
                </Text>
              </View>
              {profile.education.length > 0 ? (
                <>
                  {profile.education.map((education) => (
                    <ShowEducation
                      navigation={navigation}
                      key={education._id}
                      education={education}
                    />
                  ))}
                </>
              ) : (
                <View>
                  <Text style={{fontSize: 14}}>No Education Credentials</Text>
                </View>
              )}
            </View>
            <View style={{marginTop: 6}}></View>
            <View>
              <View>
                <Text
                  style={[
                    {color: '#0C6CD5'},
                    {fontWeight: 'bold'},
                    {fontSize: 20},
                  ]}>
                  Experience{'   '}
                  {'                                                 '}
                  <FontAwesome5Icon
                    name="plus"
                    onPress={() => navigation.navigate('AddExperience')}
                  />
                </Text>
              </View>
              {profile.experience.length > 0 ? (
                <>
                  {profile.experience.map((experience) => (
                    <ShowExperience
                      key={experience._id}
                      experience={experience}
                      navigation={navigation}
                    />
                  ))}
                </>
              ) : (
                <View>
                  <Text style={{fontSize: 14}}>No Experience Credentials</Text>
                </View>
              )}
            </View>
          </Content>
        </>
      ) : (
        <>
          <Content>
            <View style={{margin: 30}}>
              <Text style={[{alignSelf: 'flex-start'}, {marginBottom: 8}]}>
                <FontAwesome5Icon name="user-alt"></FontAwesome5Icon> Welcome{' '}
                {user && user.name}
              </Text>
              <Text style={styles.text}>
                You have not yet setup a profile, please add some info
              </Text>
              <Button
                mode="contained"
                style={styles.button}
                color="#0C6CD5"
                onPress={() => navigation.navigate('CreateProfile')}>
                Create Profile
              </Button>
            </View>
          </Content>
        </>
      )}
    </Container>
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
    marginTop: 10,
    alignSelf: 'flex-start',
  },
});
Home.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
});

export default connect(mapStateToProps, {getCurrentProfile})(Home);
