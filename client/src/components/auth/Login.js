import React, {useState} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {login} from '../../actions/auth';

import {StyleSheet, View, Text, TouchableOpacity, Image} from 'react-native';

import {Button} from 'react-native-paper';
import {TextInput} from 'react-native-paper';
import Alert from '../layout/Alert';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';

const Login = ({navigation, login, isAuthenticated}) => {
  const cardImage = require('../../img/connection.jpg');

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
      <View>
        <Text style={styles.text}>
          HearMeOut <FontAwesome5Icon name="bullhorn" size={22} />
        </Text>
      </View>
      <View style={styles.sectionContainer}>
        <View style={styles.sectionContainer}>
          <Image
            style={{
              alignSelf: 'center',
              height: 220,
              width: '100%',
            }}
            source={cardImage}></Image>
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
              Don't have an account? Sign up
            </Text>
          </TouchableOpacity>
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
  sectionsub: {
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
