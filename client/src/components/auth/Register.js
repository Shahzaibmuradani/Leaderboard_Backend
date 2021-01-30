import React, {useState} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  KeyboardAvoidingView,
  ToastAndroid,
  ImageBackground,
} from 'react-native';

import {Button} from 'react-native-paper';
import {TextInput} from 'react-native-paper';
import {register} from '../../actions/auth';
import {setAlert} from '../../actions/alert';
import Alert from '../layout/Alert';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
const Register = ({navigation, setAlert, register, isAuthenticated}) => {
  // const [errortoast, setErrortoast] = useState(false);
  const cardImage = require('../../img/connection.jpg');

  const [formdata, setFormdata] = useState({
    name: '',
    email: '',
    password: '',
    password2: '',
    status: '',
  });

  const {name, email, password, password2, status} = formdata;

  const onChange = (name, value) =>
    setFormdata({
      ...formdata,
      [name]: value,
    });

  const onSubmit = async () => {
    if (password !== password2) {
      setErrortoast(true);
      setAlert('Password does not Match', '#F72F4D');
    } else {
      register({name, email, password, status});
    }
  };

  if (isAuthenticated) {
    return <>{navigation.navigate('AppDrawerScreen')}</>;
  }

  return (
    <>
      <View>
        <Text style={styles.text}>
          HearMeOut <FontAwesome5Icon name="bullhorn" size={22} />
        </Text>
      </View>
      <View style={styles.sectionContainer}>
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionsubtitle}>Create New Account</Text>
          <TextInput
            style={styles.input}
            mode="outlined"
            theme={{colors: {primary: '#0C6CD5'}}}
            label="Name"
            value={name}
            onChangeText={(text) => onChange('name', text)}></TextInput>
          <TextInput
            style={styles.input}
            mode="outlined"
            theme={{colors: {primary: '#0C6CD5'}}}
            label="Student or Recruiter/Organizer"
            value={status}
            onChangeText={(text) => onChange('status', text)}></TextInput>
          <TextInput
            style={styles.input}
            mode="outlined"
            theme={{colors: {primary: '#0C6CD5'}}}
            label="Email"
            value={email}
            onChangeText={(text) => onChange('email', text)}></TextInput>
          <TextInput
            secureTextEntry={true}
            style={styles.input}
            label="Password"
            theme={{colors: {primary: '#0C6CD5'}}}
            mode="outlined"
            value={password}
            onChangeText={(text) => onChange('password', text)}></TextInput>
          <TextInput
            secureTextEntry={true}
            style={styles.input}
            label="Confirm Password"
            theme={{colors: {primary: '#0C6CD5'}}}
            mode="outlined"
            value={password2}
            onChangeText={(text) => onChange('password2', text)}></TextInput>
          <Button
            mode="contained"
            style={styles.button}
            color="green"
            onPress={() => onSubmit()}>
            Register
          </Button>
          <TouchableOpacity>
            <Text
              style={styles.sectionsubtitle}
              onPress={() => navigation.navigate('Login')}>
              Already have an account? Sign in
            </Text>
          </TouchableOpacity>
          <Alert></Alert>
          {/* {errortoast ? (
            // ToastAndroid.showWithGravityAndOffset(
            //   'Password does not Match',
            //   ToastAndroid.LONG,
            //   ToastAndroid.BOTTOM,
            //   25,
            //   50,
            // )
            
          ) : (
            <></>
          )} */}
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  text: {
    marginTop: 24,
    backgroundColor: '#FFF',
    color: '#0C6CD5',
    textAlign: 'center',
    fontWeight: '700',
    fontSize: 24,
  },
  sectionContainer: {
    backgroundColor: '#FFF',
    marginTop: 28,
    paddingHorizontal: 24,
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 32,
    fontWeight: '700',
    color: 'black',
    textAlign: 'center',
  },
  sectionsubtitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#0C6CD5',
    alignSelf: 'center',
  },
  input: {
    marginTop: 14,
    height: 45,
  },
  button: {
    alignSelf: 'center',
    marginTop: 20,
    marginBottom: 14,
    width: 140,
  },
});

Register.propTypes = {
  setAlert: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, {setAlert, register})(Register);
