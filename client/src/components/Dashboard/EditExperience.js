import React, {useState} from 'react';
import {StyleSheet} from 'react-native';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {editExperience} from '../../actions/profile';
import moment from 'moment';
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
import Alert from '../layout/Alert';

const EditExperience = ({route, editExperience}) => {
  const [formData, setFormData] = useState({
    title: route.params.title,
    company: route.params.company,
    location: route.params.location,
    current: route.params.current,
    from: route.params.from,
    to: route.params.to,
    description: route.params.description,
  });
  const [toDateDisabled, toggleDisabled] = useState(false);

  const {title, company, location, current, from, to, description} = formData;

  const fromdate = moment(from).format('YYYY/MM/DD');
  var todate = moment(to).format('YYYY/MM/DD');

  const onChange = (name, value) =>
    setFormData({
      ...formData,
      [name]: value,
    });

  const onSubmit = async () => {
    editExperience(formData, route.params.id);
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
                Edit An Experience
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
            placeHolderText={fromdate}
            disabled={false}
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
            placeHolderText={toDateDisabled ? 'Select Date' : to}
            disabled={toDateDisabled ? true : false}
            onDateChange={(date) => {
              setFormData({...formData, to: date});
            }}
          />
          <TextInput
            mode="outlined"
            placeholder="Description"
            multiline={true}
            style={[{marginTop: 6}, {marginLeft: 8}, {width: 340}]}
            value={description}
            onChangeText={(text) => onChange('description', text)}
            theme={{colors: {primary: '#0C6CD5'}}}
          />
          <View style={{marginTop: 8}}></View>
          <Button
            contentStyle={{flexDirection: 'row-reverse'}}
            style={[{marginTop: 6}, {alignSelf: 'center'}]}
            mode="contained"
            color="green"
            onPress={() => onSubmit()}>
            Save Changes
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

EditExperience.propTypes = {
  editExperience: PropTypes.func.isRequired,
};

export default connect(null, {editExperience})(EditExperience);
