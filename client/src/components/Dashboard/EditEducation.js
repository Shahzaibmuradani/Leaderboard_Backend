import React, {useState, useEffect} from 'react';
import {StyleSheet} from 'react-native';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {editEducation} from '../../actions/profile';
import moment from 'moment';
import {
  View,
  Text,
  CheckBox,
  Container,
  Content,
  DatePicker,
} from 'native-base';
import {TextInput, Button} from 'react-native-paper';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import Alert from '../layout/Alert';

const EditEducation = ({route, editEducation, navigation}) => {
  const [formData, setFormData] = useState({
    institute: route.params.institute,
    degree: route.params.degree,
    fieldofstudy: route.params.fieldofstudy,
    current: route.params.current,
    from: route.params.from,
    to: route.params.to,
    description: route.params.description,
  });
  const [toDateDisabled, toggleDisabled] = useState(false);

  const {
    institute,
    degree,
    fieldofstudy,
    current,
    from,
    to,
    description,
  } = formData;

  // useEffect(() => {
  //   setFormData({
  //     institute: !route.params.institute ? '' : route.params.institute,
  //     degree: !route.params.degree ? '' : route.params.degree,
  //     fieldofstudy: !route.params.fieldofstudy ? '' : route.params.fieldofstudy,
  //     current: route.params.current,
  //     description: !route.params.description ? '' : route.params.description,
  //     from: !route.params.from ? '' : route.params.from,
  //     to: !route.params.to ? '' : route.params.to,
  //   });
  // }, []);

  const fromdate = moment(from).format('YYYY/MM/DD');
  var todate = moment(to).format('YYYY/MM/DD');

  const onChange = (name, value) =>
    setFormData({
      ...formData,
      [name]: value,
    });

  const onSubmit = async () => {
    editEducation(formData, route.params.id);
  };

  return (
    <>
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
                  Edit An Education
                </Text>
                <Text style={[{marginBottom: 6}, {marginLeft: 8}]}>
                  <FontAwesome5Icon name="graduation-cap"></FontAwesome5Icon>
                  {'  '}Add any school, college or university that you have
                  attended.
                </Text>
              </View>
              <Alert />
            </View>
            <TextInput
              mode="outlined"
              placeholder="* Institute"
              style={[
                {marginTop: 5},
                {marginLeft: 8},
                {height: 28},
                {width: 340},
              ]}
              value={institute}
              onChangeText={(text) => onChange('institute', text)}
              theme={{colors: {primary: '#0C6CD5'}}}
            />
            <TextInput
              mode="outlined"
              placeholder="* Degree or Certificate"
              style={[
                {marginTop: 6},
                {marginLeft: 8},
                {height: 28},
                {width: 340},
              ]}
              value={degree}
              onChangeText={(text) => onChange('degree', text)}
              theme={{colors: {primary: '#0C6CD5'}}}
            />
            <TextInput
              mode="outlined"
              placeholder="* Field Of Study"
              style={[
                {marginTop: 6},
                {marginLeft: 8},
                {height: 28},
                {width: 340},
              ]}
              value={fieldofstudy}
              onChangeText={(text) => onChange('fieldofstudy', text)}
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
              style={[{width: 340}, {marginLeft: 8}]}
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
    </>
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
    marginRight: 16,
  },
});

EditEducation.propTypes = {
  editEducation: PropTypes.func.isRequired,
};

export default connect(null, {editEducation})(EditEducation);
