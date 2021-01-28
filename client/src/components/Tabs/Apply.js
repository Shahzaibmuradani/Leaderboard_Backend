import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Content, Textarea, Form, Text, View} from 'native-base';
import {StyleSheet} from 'react-native';
import {Button} from 'react-native-paper';
import Alert from '../layout/Alert';
import {addAnswers} from '../../actions/post';

const Apply = ({route, addAnswers}) => {
  const [formdata, setFormdata] = useState({
    a1: '',
    a2: '',
    a3: '',
  });
  const {a1, a2, a3} = formdata;
  const q1 = route.params.faqs.map((faq) => faq.questions.q1);
  const q2 = route.params.faqs.map((faq) => faq.questions.q2);
  const q3 = route.params.faqs.map((faq) => faq.questions.q3);
  const faqid = route.params.faqs.map((faq) => faq._id);

  const onChange = (name, value) => setFormdata({...formdata, [name]: value});

  const onSubmit = async () => {
    addAnswers(formdata, route.params._id, ...faqid);
  };
  return (
    <Content padder style={{backgroundColor: '#FFF'}}>
      <View style={styles.container}>
        <Text style={styles.sectionsub}>Small Test For Job</Text>
      </View>
      <Form>
        <Alert />
        <View style={styles.container1}>
          <Text>{q1}</Text>
          <View style={{margin: 2}}></View>
          <Textarea
            rowSpan={3}
            bordered
            placeholder="Answer 1"
            value={a1}
            onChangeText={(text) => onChange('a1', text)}
          />
          <View style={{paddingBottom: 14}}></View>
          <Text>{q2}</Text>
          <View style={{margin: 2}}></View>
          <Textarea
            rowSpan={3}
            bordered
            placeholder="Answer 2"
            value={a2}
            onChangeText={(text) => onChange('a2', text)}
          />
          <View style={{paddingBottom: 14}}></View>
          <Text>{q3}</Text>
          <View style={{margin: 2}}></View>
          <Textarea
            rowSpan={3}
            bordered
            placeholder="Answer 3"
            value={a3}
            onChangeText={(text) => onChange('a3', text)}
          />
          <Button
            mode="contained"
            color="#0C6CD5"
            style={styles.button}
            onPress={() => onSubmit()}>
            Submit
          </Button>
        </View>
      </Form>
    </Content>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 12,
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

Apply.propTypes = {
  addAnswers: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  post: state.post,
});

export default connect(mapStateToProps, {addAnswers})(Apply);
