import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {View, Text, StyleSheet} from 'react-native';
import {Button} from 'react-native-paper';
import {Body, Card, CardItem, Container, Content, Form} from 'native-base';
import {getQueries} from '../../actions/help';

const Help = ({getQueries, help: {queries}, auth: {user}}) => {
  //   const [formdata, setFormdata] = useState({
  //     questions: '',
  //     answers: '',
  //   });

  //   const {questions, answers} = formdata;

  //   const onChange = (name, value) => setFormdata({...formdata, [name]: value});

  //   const onSubmit = async () => {
  //     addFaqs(formdata);
  //   };
  //const query = queries.map((query) => query.queries);

  useEffect(() => {
    getQueries();
  }, [getQueries]);

  return (
    <>
      <Container style={styles.container}>
        <Content padder style={{padding: 10}}>
          <View style={styles.container}>
            <Text style={styles.sectionsub}>Help Me</Text>
          </View>
          <View style={styles.container1}>
            {queries.map((que) => (
              <>
                <View style={{paddingBottom: 10}}></View>
                <Card>
                  <CardItem key={que._id}>
                    <View key={que._id}>
                      {que.queries.map((q) => (
                        <View key={q._id}>
                          <Text style={{fontWeight: 'bold', color: 'black'}}>
                            {q.questions}
                          </Text>
                          <View style={{margin: 2}}></View>
                          <Text style={{color: 'darkgreen'}}>{q.answers}</Text>
                        </View>
                      ))}
                    </View>
                  </CardItem>
                </Card>
              </>
            ))}
          </View>
          {user.status === 'Admin' && (
            <Button
              mode="contained"
              color="#0C6CD5"
              style={styles.button}
              onPress={() => onSubmit()}>
              Add More
            </Button>
          )}
        </Content>
      </Container>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFF',
    flex: 1,
    paddingTop: 12,
    paddingBottom: 8,
    alignItems: 'center',
  },
  container1: {
    marginLeft: 10,
    marginRight: 10,
    paddingBottom: 10,
  },
  sectionsub: {
    fontSize: 20,
    marginEnd: 12,
    marginBottom: 8,
    fontWeight: 'bold',
    color: '#0C6CD5',
  },
  button: {
    alignSelf: 'center',
    marginTop: 24,
    marginBottom: 14,
    width: 140,
  },
});

Help.propTypes = {
  getQueries: PropTypes.func.isRequired,
  help: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  help: state.help,
  auth: state.auth,
});

export default connect(mapStateToProps, {getQueries})(Help);
