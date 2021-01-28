import React, {useState} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {login} from '../../actions/auth';

import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';

import {Button} from 'react-native-paper';
import {TextInput} from 'react-native-paper';
import Alert from '../layout/Alert';

const Login = ({navigation, login, isAuthenticated}) => {
  const [formdata, setFormdata] = useState({
    email: '',
    password: '',
  });

  const {email, password} = formdata;

  const onChange = (name, value) =>
    setFormdata({
      ...formdata,
      [name]: value,
    });

  const onSubmit = async () => {
    login(email, password);
  };

  if (isAuthenticated) {
    return <>{navigation.navigate('AppDrawerScreen')}</>;
  }

  return (
    <>
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>Welcome To Notify!!</Text>
        <View style={styles.sectionContainer}>
          <Alert></Alert>
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
          <Button
            mode="contained"
            style={styles.button}
            color="#0C6CD5"
            onPress={() => onSubmit()}>
            Login
          </Button>
          <TouchableOpacity>
            <Text
              style={styles.sectionsub}
              onPress={() => navigation.navigate('Register')}>
              Doesn't have an account? Sign up
            </Text>
          </TouchableOpacity>
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
    marginTop: 22,
    fontSize: 32,
    fontWeight: '700',
    color: 'black',
    textAlign: 'center',
  },
  sectionsub: {
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
    marginTop: 24,
    marginBottom: 14,
    width: 140,
  },
});

Login.propTypes = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, {login})(Login);
