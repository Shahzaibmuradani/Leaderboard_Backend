import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {addFaqs} from '../../actions/auth';
import {StyleSheet} from 'react-native';
import {Content, Textarea, Form, Text, View} from 'native-base';
import {Button} from 'react-native-paper';
import Alert from '../layout/Alert';

const FAQs = ({addFaqs}) => {
  const [formdata, setFormdata] = useState({
    q1: '',
    q2: '',
    q3: '',
  });

  const {q1, q2, q3} = formdata;

  const onChange = (name, value) => setFormdata({...formdata, [name]: value});

  const onSubmit = async () => {
    addFaqs(formdata);
  };

  return (
    <>
      <Content padder style={{backgroundColor: '#FFF'}}>
        <Form>
          <View style={styles.container}>
            <Text style={styles.sectionsub}>Make your FAQs Here!!</Text>
          </View>
          <Alert />
          <View style={styles.container1}>
            <Textarea
              rowSpan={3}
              bordered
              placeholder="Question 1"
              value={q1}
              onChangeText={(text) => onChange('q1', text)}
            />
            <View style={{paddingBottom: 8}}></View>
            <Textarea
              rowSpan={3}
              bordered
              placeholder="Question 2"
              value={q2}
              onChangeText={(text) => onChange('q2', text)}
            />
            <View style={{paddingBottom: 8}}></View>
            <Textarea
              rowSpan={3}
              bordered
              placeholder="Question 3"
              value={q3}
              onChangeText={(text) => onChange('q3', text)}
            />
            <Button
              mode="contained"
              color="#0C6CD5"
              style={styles.button}
              onPress={() => onSubmit()}>
              Add Questions
            </Button>
          </View>
        </Form>
      </Content>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10,
    paddingBottom: 8,
    alignItems: 'center',
  },
  container1: {
    flex: 1,
    marginLeft: 10,
    marginRight: 10,
    paddingBottom: 10,
  },
  sectionsub: {
    fontSize: 17,
    marginEnd: 12,
    marginBottom: 8,
    fontWeight: '600',
    color: '#0C6CD5',
  },
  button: {
    alignSelf: 'center',
    marginTop: 24,
    marginBottom: 14,
    width: 180,
  },
});

FAQs.propTypes = {
  addFaqs: PropTypes.func.isRequired,
};

export default connect(null, {addFaqs})(FAQs);
