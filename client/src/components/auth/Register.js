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
} from 'react-native';

import {Button} from 'react-native-paper';
import {TextInput} from 'react-native-paper';
import {register} from '../../actions/auth';
import {setAlert} from '../../actions/alert';
import Alert from '../layout/Alert';
const Register = ({navigation, setAlert, register, isAuthenticated}) => {
  const [errortoast, setErrortoast] = useState(false);

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
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>Welcome User!!</Text>
        <View style={styles.sectionContainer}>
          <Alert></Alert>
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
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
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
