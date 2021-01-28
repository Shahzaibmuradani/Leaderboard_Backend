import React, {Fragment} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {View, Text, StyleSheet} from 'react-native';

const Alert = ({alerts}) =>
  alerts !== null &&
  alerts.length > 0 &&
  alerts.map((alert) => (
    <Fragment key={alert.id}>
      <View style={{backgroundColor: `${alert.alertType}`}}>
        <Text style={{color: 'white'}}>{alert.msg}</Text>
      </View>
      <View style={styles.maintext}></View>
    </Fragment>
  ));

Alert.propTypes = {
  alerts: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  alerts: state.alert,
});

const styles = StyleSheet.create({
  maintext: {
    paddingTop: 4,
  },
});

export default connect(mapStateToProps)(Alert);
