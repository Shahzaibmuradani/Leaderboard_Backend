import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import {StyleSheet, Picker} from 'react-native';
import {Caption, TextInput, Button} from 'react-native-paper';
import {Container, View, Content, Text} from 'native-base';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import {createProfile} from '../../actions/profile';
import Alert from '../layout/Alert';

const CreateProfile = ({createProfile}) => {
  const [formData, setFormData] = useState({
    bio: '',
    field: '',
    skills: '',
    company: '',
    location: '',

    twitter: '',
    facebook: '',
    linkedin: '',
  });

  const {
    bio,
    field,
    skills,
    location,
    company,

    twitter,
    facebook,
    linkedin,
  } = formData;

  const [displaySocialInputs, toggleSocialInputs] = useState(false);

  const onChange = (name, value) => setFormData({...formData, [name]: value});

  const onSubmit = async () => {
    createProfile(formData);
  };

  return (
    <>
      <Container>
        <Content>
          <View style={{margin: 20}}>
            <View>
              <Text
                style={[
                  {marginBottom: 10},
                  {color: '#0C6CD5'},
                  {fontSize: 20},
                ]}>
                Create Profile
              </Text>
              <Text style={{marginBottom: 6}}>
                <FontAwesome5Icon name="user-alt"></FontAwesome5Icon>
                {'  '}Let's get some information to make your profile stand out
              </Text>
              <Alert />
            </View>
            <TextInput
              mode="outlined"
              placeholder="Bio"
              multiline={true}
              value={bio}
              onChangeText={(text) => onChange('bio', text)}
              style={[{marginTop: 5}, {width: 330}]}
              theme={{colors: {primary: '#0C6CD5'}}}
            />
            <Caption style={[{fontSize: 14}, {alignSelf: 'flex-start'}]}>
              Tell us a little about yourself
            </Caption>
            <Picker
              selectedValue={field}
              mode="dropdown"
              onValueChange={(itemValue, itemIndex) =>
                onChange('field', itemValue)
              }
              style={[{height: 50, width: 200}, {color: '#0C6CD5'}]}>
              <Picker.Item label="Computer Science" value="Computer Science" />
              <Picker.Item label="BBA" value="BBA" />
              <Picker.Item label="Media Sciences" value="Media Sciences" />
            </Picker>
            <Caption style={[{fontSize: 14}, {alignSelf: 'flex-start'}]}>
              Give us an idea of where you are at in your career
            </Caption>
            <TextInput
              mode="outlined"
              placeholder="* Skills"
              value={skills}
              onChangeText={(text) => onChange('skills', text)}
              style={[{marginTop: 6}, {height: 28}, {width: 330}]}
              theme={{colors: {primary: '#0C6CD5'}}}
            />
            <Caption style={({fontSize: 14}, {alignSelf: 'flex-start'})}>
              Please use comma separated values (eg. HTML,CSS,JavaScript,PHP)
            </Caption>
            <TextInput
              mode="outlined"
              placeholder="Location"
              value={location}
              onChangeText={(text) => onChange('location', text)}
              style={[{marginTop: 6}, {height: 28}, {width: 330}]}
              theme={{colors: {primary: '#0C6CD5'}}}
            />
            <Caption style={[{fontSize: 14}, {alignSelf: 'flex-start'}]}>
              City & state suggested (eg. Boston, MA)
            </Caption>
            <TextInput
              mode="outlined"
              placeholder="Company"
              value={company}
              onChangeText={(text) => onChange('company', text)}
              style={[{marginTop: 6}, {height: 28}, {width: 330}]}
              theme={{colors: {primary: '#0C6CD5'}}}
            />
            <Caption style={[{fontSize: 14}, {alignSelf: 'flex-start'}]}>
              Could be your own company or one you work for
            </Caption>
            <View style={styles.row}>
              <View style={styles.section}>
                <Button
                  contentStyle={{flexDirection: 'row-reverse'}}
                  style={{marginTop: 6}}
                  mode="outlined"
                  color="#9b9b9b"
                  onPress={() => toggleSocialInputs(!displaySocialInputs)}>
                  Add Social Network Links
                </Button>
                <Text style={{marginLeft: 10}}>Optional</Text>
              </View>
            </View>
            {displaySocialInputs && (
              <View>
                <View style={styles.row}>
                  <View style={styles.section}>
                    <FontAwesome5Icon
                      color="#0e76a8"
                      size={22}
                      style={[{marginTop: 8}, {marginRight: 8}]}
                      name="linkedin"></FontAwesome5Icon>
                    <TextInput
                      mode="outlined"
                      placeholder="Linkedin URL"
                      value={linkedin}
                      onChangeText={(text) => onChange('linkedin', text)}
                      style={[{marginTop: 6}, {height: 28}, {width: 250}]}
                      theme={{colors: {primary: '#0C6CD5'}}}
                    />
                  </View>
                </View>
                <View style={styles.row}>
                  <View style={styles.section}>
                    <FontAwesome5Icon
                      color="#00acee"
                      size={22}
                      style={[{marginTop: 8}, {marginRight: 8}]}
                      name="twitter"></FontAwesome5Icon>
                    <TextInput
                      mode="outlined"
                      placeholder="Twitter URL"
                      value={twitter}
                      onChangeText={(text) => onChange('twitter', text)}
                      style={[{marginTop: 6}, {height: 28}, {width: 250}]}
                      theme={{colors: {primary: '#0C6CD5'}}}
                    />
                  </View>
                </View>
                <View style={styles.row}>
                  <View style={styles.section}>
                    <FontAwesome5Icon
                      color="#3b5998"
                      size={22}
                      style={[{marginTop: 8}, {marginRight: 8}]}
                      name="facebook"></FontAwesome5Icon>
                    <TextInput
                      mode="outlined"
                      placeholder="Facebook URL"
                      value={facebook}
                      onChangeText={(text) => onChange('facebook', text)}
                      style={[{marginTop: 6}, {height: 28}, {width: 250}]}
                      theme={{colors: {primary: '#0C6CD5'}}}
                    />
                  </View>
                </View>
              </View>
            )}
            <View style={{marginTop: 8}}></View>
            <Button
              contentStyle={{flexDirection: 'row-reverse'}}
              style={[{marginTop: 6}, {alignSelf: 'center'}]}
              mode="contained"
              color="green"
              onPress={() => onSubmit()}>
              Submit
            </Button>
          </View>
        </Content>
      </Container>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFF',
  },
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

CreateProfile.propTypes = {
  createProfile: PropTypes.func.isRequired,
};

export default connect(null, {createProfile})(CreateProfile);
