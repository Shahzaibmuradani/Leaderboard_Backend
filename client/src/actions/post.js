import axios from 'axios';
import {GET_POSTS, POST_ERROR} from './types';

//import setAuthToken from '../utils/setAuthToken';
import {setAlert} from '../actions/alert';
import AsyncStorage from '@react-native-async-storage/async-storage';

// get all posts
export const getPosts = () => async (dispatch) => {
  try {
    const token = await AsyncStorage.getItem('token');

    const config = {
      headers: {
        'x-auth-token': token,
      },
    };
    const res = await axios.get(`http://10.0.2.2:3000/api/posts`, config);
    dispatch({
      type: GET_POSTS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: {msg: err.response.statusText, status: err.response.status},
    });
  }
};

// // get questions
// export const getQuestions = () => async (dispatch) => {
//   // const id = '5fecfd0c0b8c072984de733d';
//   try {
//     // const token = await AsyncStorage.getItem('token');
//     // //console.log('Pehla', remarks);
//     // const config = {
//     //   headers: {
//     //     'x-auth-token': token,
//     //   },
//     // };

//     //const body = JSON.stringify({remarks});
//     // const postid = '6002f75c8352c9272089ccd1';
//     // const faqsid = '5ff73229f05f6825e4eddadc';

//     const res = await axios.get(
//       `http://10.0.2.2:3000/api/posts/faqs/${postid}/${faqsid}`,
//       config,
//     );
//     //   dispatch(setAlert('Review Added', '#4BB543'));
//     dispatch({
//       type: GET_POSTS,
//       payload: res.data,
//     });
//     // console.log(res.data);
//   } catch (err) {
//     dispatch({
//       type: POST_ERROR,
//       payload: {msg: err.response.statusText, status: err.response.status},
//     });
//   }
// };

// add answers
export const addAnswers = (FormData, id, faqid) => async (dispatch) => {
  // console.log('Data', FormData);
  // console.log(id);
  // console.log(faqid);
  try {
    const token = await AsyncStorage.getItem('token');
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'x-auth-token': token,
      },
    };
    const res = await axios.put(
      `http://10.0.2.2:3000/api/posts/faqs/${id}/${faqid}`,
      FormData,
      config,
    );
    dispatch(setAlert('Answers Submitted', '#4BB543'));
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, '#F72F4D')));
    }
    if (err.response.status === 400)
      dispatch(setAlert('Already Attempted', '#F72F4D'));
  }
};
