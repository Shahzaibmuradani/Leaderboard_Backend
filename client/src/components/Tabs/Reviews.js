import React, {useState} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import {View, Picker, StyleSheet, Text} from 'react-native';
import {Container, Content, Card, CardItem, Left, Body} from 'native-base';
import {Button} from 'react-native-paper';
import {getReviews} from '../../actions/auth';
import Alert from '../layout/Alert';

const Reviews = ({getReviews}) => {
  const [formdata, setFormdata] = useState({
    remarks: 0,
  });

  const {remarks} = formdata;

  const onChange = (name, value) =>
    setFormdata({
      ...formdata,
      [name]: value,
    });

  const onSubmit = async () => {
    //login(remarks);
    // console.log(remarks);
    getReviews(remarks);
  };

  return (
    <>
      <Container>
        <Content>
          <View style={{padding: 30}}>
            <Alert />
            <Card>
              <CardItem style={styles.mb}>
                <Text style={styles.sectionTitle}>Give Your Review</Text>
              </CardItem>
              <CardItem style={styles.mb} bordered>
                <Left>
                  <Body>
                    <View style={styles.container}>
                      <Text style={styles.sectionsub}>
                        Was this Post Helpful?
                      </Text>
                      <Picker
                        mode="dropdown"
                        selectedValue={remarks}
                        style={{height: 50, width: 160}}
                        onValueChange={(itemValue, itemIndex) =>
                          onChange('remarks', itemValue)
                        }>
                        <Picker.Item label="May be" value={5} />
                        <Picker.Item label="Yes" value={10} />
                        <Picker.Item label="No" value={1} />
                      </Picker>
                    </View>
                  </Body>
                </Left>
              </CardItem>
              <CardItem style={styles.mb} footer bordered>
                <Button
                  mode="contained"
                  style={styles.button}
                  color="#0C6CD5"
                  onPress={() => onSubmit()}>
                  Add
                </Button>
              </CardItem>
            </Card>
          </View>
        </Content>
      </Container>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10,
    paddingBottom: 10,
    alignItems: 'center',
  },
  sectionsub: {
    fontSize: 17,
    marginEnd: 12,
    fontWeight: '600',
    color: '#0C6CD5',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: 'black',
  },
  button: {
    marginStart: 'auto',
    alignSelf: 'center',
  },
  mb: {
    backgroundColor: '#E8EDF8',
  },
});

Reviews.propTypes = {
  getReviews: PropTypes.func.isRequired,
};

export default connect(null, {getReviews})(Reviews);
