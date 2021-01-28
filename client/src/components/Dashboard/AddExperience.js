import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {StyleSheet} from 'react-native';
import {
  View,
  Text,
  Container,
  Content,
  CheckBox,
  DatePicker,
} from 'native-base';
import {TextInput, Button} from 'react-native-paper';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import {addExperience} from '../../actions/profile';
import Alert from '../layout/Alert';

const AddExperience = ({addExperience}) => {
  const [formData, setFormData] = useState({
    company: '',
    title: '',
    location: '',
    from: '',
    to: '',
    current: false,
    description: '',
  });
  const [toDateDisabled, toggleDisabled] = useState(false);

  const {company, title, location, current, description} = formData;

  const onChange = (name, value) => setFormData({...formData, [name]: value});

  const onSubmit = async () => {
    addExperience(formData);
  };

  return (
    <Container>
      <Content>
        <View style={[styles.container, {margin: 20}]}>
          <View style={{marginBottom: 8}}>
            <View>
              <Text
                style={[
                  {marginBottom: 10},
                  {marginLeft: 8},
                  {color: '#0C6CD5'},
                  {fontSize: 20},
                ]}>
                Add An Experience
              </Text>
              <Text style={[{marginBottom: 6}, {marginLeft: 8}]}>
                <FontAwesome5Icon name="black-tie"></FontAwesome5Icon>
                {'  '}Add any position that you have had in the past
              </Text>
            </View>
            <Alert />
          </View>
          <TextInput
            mode="outlined"
            placeholder="* Job title"
            style={[
              {marginTop: 5},
              {marginLeft: 8},
              {height: 28},
              {width: 340},
            ]}
            value={title}
            onChangeText={(text) => onChange('title', text)}
            theme={{colors: {primary: '#0C6CD5'}}}
          />
          <TextInput
            mode="outlined"
            placeholder="* Company"
            style={[
              {marginTop: 6},
              {marginLeft: 8},
              {height: 28},
              {width: 340},
            ]}
            value={company}
            onChangeText={(text) => onChange('company', text)}
            theme={{colors: {primary: '#0C6CD5'}}}
          />
          <TextInput
            mode="outlined"
            placeholder="Location"
            style={[
              {marginTop: 6},
              {marginLeft: 8},
              {height: 28},
              {width: 340},
            ]}
            value={location}
            onChangeText={(text) => onChange('location', text)}
            theme={{colors: {primary: '#0C6CD5'}}}
          />
          <DatePicker
            locale={'en'}
            timeZoneOffsetInMinutes={undefined}
            modalTransparent={false}
            animationType={'fade'}
            androidMode={'default'}
            placeHolderText="From Date"
            disabled={false}
            onDateChange={(date) => {
              setFormData({...formData, from: date});
            }}
          />
          <View style={styles.row}>
            <View style={styles.section}>
              <Text style={{marginLeft: 8}}>Current</Text>
              <CheckBox
                style={{marginTop: 2}}
                checked={current}
                color="#0C6CD5"
                onPress={(e) => {
                  setFormData({...formData, current: !current});
                  toggleDisabled(!toDateDisabled);
                }}
              />
            </View>
          </View>
          <DatePicker
            locale={'en'}
            timeZoneOffsetInMinutes={undefined}
            modalTransparent={false}
            animationType={'fade'}
            androidMode={'default'}
            placeHolderText="To Date"
            disabled={toDateDisabled ? true : false}
            onDateChange={(date) => {
              setFormData({...formData, to: date});
            }}
          />
          <TextInput
            mode="outlined"
            placeholder="Description"
            multiline={true}
            value={description}
            onChangeText={(text) => onChange('description', text)}
            style={[{marginTop: 6}, {marginLeft: 8}, {width: 340}]}
            theme={{colors: {primary: '#0C6CD5'}}}
          />
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
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFF',
  },
  row: {
    marginTop: 2,
    flexDirection: 'row',
    alignItems: 'center',
  },
  section: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 15,
  },
});

AddExperience.propTypes = {
  addExperience: PropTypes.func.isRequired,
};

export default connect(null, {addExperience})(AddExperience);
