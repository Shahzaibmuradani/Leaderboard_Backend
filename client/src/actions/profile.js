import {
  //   ACCOUNT_DELETED,
  //   CLEAR_PROFILE,
  GET_PROFILE,
  //   GET_PROFILES,
  PROFILE_ERROR,
  UPDATE_PROFILE,
} from './types';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {setAlert} from './alert';

// get profile
export const getCurrentProfile = () => async (dispatch) => {
  try {
    const token = await AsyncStorage.getItem('token');
    const config = {
      headers: {
        'x-auth-token': token,
      },
    };

    const res = await axios.get('http://10.0.2.2:3000/api/profile/me', config);
    //console.log(JSON.stringify(res.data));
    // console.log(res.data.social.twitter);
    dispatch({
      type: GET_PROFILE,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: {msg: err.response.statusText, status: err.response.status},
    });
  }
};

// create and update profile
export const createProfile = (FormData, edit = false) => async (dispatch) => {
  try {
    const token = await AsyncStorage.getItem('token');
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'x-auth-token': token,
      },
    };

    const res = await axios.post(
      'http://10.0.2.2:3000/api/profile',
      FormData,
      config,
    );

    dispatch({
      type: GET_PROFILE,
      payload: res.data,
    });

    dispatch(setAlert(edit ? 'Profile Updated' : 'Profile Created', '#4BB543'));
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, '#F72F4D')));
    }
    dispatch({
      type: PROFILE_ERROR,
      payload: {msg: err.response.statusText, status: err.response.status},
    });
  }
};

// add education
export const addEducation = (FormData) => async (dispatch) => {
  try {
    const token = await AsyncStorage.getItem('token');
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'x-auth-token': token,
      },
    };
    const res = await axios.put(
      'http://10.0.2.2:3000/api/profile/education',
      FormData,
      config,
    );

    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data,
    });

    dispatch(setAlert('Education Added', '#4BB543'));
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, '#F72F4D')));
    }
    dispatch({
      type: PROFILE_ERROR,
      payload: {msg: err.response.statusText, status: err.response.status},
    });
  }
};

// edit education
export const editEducation = (FormData, id) => async (dispatch) => {
  try {
    const token = await AsyncStorage.getItem('token');
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'x-auth-token': token,
      },
    };
    const res = await axios.put(
      `http://10.0.2.2:3000/api/profile/education/${id}`,
      FormData,
      config,
    );

    dispatch(setAlert('Education Updated', '#4BB543'));
    dispatch({
      type: CLEAR_PROFILE,
    });

    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data,
    });
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, '#F72F4D')));
    }
    dispatch({
      type: PROFILE_ERROR,
      payload: {msg: err.response.statusText, status: err.response.status},
    });
  }
};

// edit experience
export const editExperience = (FormData, id) => async (dispatch) => {
  try {
    const token = await AsyncStorage.getItem('token');
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'x-auth-token': token,
      },
    };
    const res = await axios.put(
      `http://10.0.2.2:3000/api/profile/experience/${id}`,
      FormData,
      config,
    );

    dispatch(setAlert('Experience Updated', '#4BB543'));
    dispatch({
      type: CLEAR_PROFILE,
    });

    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data,
    });
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, '#F72F4D')));
    }
    dispatch({
      type: PROFILE_ERROR,
      payload: {msg: err.response.statusText, status: err.response.status},
    });
  }
};

//   // add experience
export const addExperience = (FormData) => async (dispatch) => {
  try {
    const token = await AsyncStorage.getItem('token');
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'x-auth-token': token,
      },
    };

    const res = await axios.put(
      'http://10.0.2.2:3000/api/profile/experience',
      FormData,
      config,
    );

    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data,
    });

    dispatch(setAlert('Experience Added', '#4BB543'));
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, '#F72F4D')));
    }
    dispatch({
      type: PROFILE_ERROR,
      payload: {msg: err.response.statusText, status: err.response.status},
    });
  }
};

//   export const getProfiles = () => async (dispatch) => {
//     dispatch({ type: CLEAR_PROFILE });
//     try {
//       const res = await axios.get('/api/profile');
//       dispatch({
//         type: GET_PROFILES,
//         payload: res.data,
//       });
//     } catch (err) {
//       dispatch({
//         type: PROFILE_ERROR,
//         payload: { msg: err.response.statusText, status: err.response.status },
//       });
//     }
//   };

//   // get profile by ID
//   export const getProfileById = (userId) => async (dispatch) => {
//     try {
//       const res = await axios.get(`/api/profile/user/${userId}`);
//       dispatch({
//         type: GET_PROFILE,
//         payload: res.data,
//       });
//     } catch (err) {
//       dispatch({
//         type: PROFILE_ERROR,
//         payload: { msg: err.response.statusText, status: err.response.status },
//       });
//     }
//   };

//   // get github repos
//   export const getGithubRepos = (username) => async (dispatch) => {
//     try {
//       const res = await axios.get(`/api/profile/github/${username}`);
//       dispatch({
//         type: GET_REPOS,
//         payload: res.data,
//       });
//     } catch (err) {
//       dispatch({
//         type: PROFILE_ERROR,
//         payload: { msg: err.response.statusText, status: err.response.status },
//       });
//     }
//   };

//   // create and update profile
//   export const createProfile = (FormData, history, edit = false) => async (
//     dispatch
//   ) => {
//     try {
//       const config = {
//         headers: {
//           'Content-Type': 'application/json',
//         },
//       };

//       const res = await axios.post('/api/profile', FormData, config);

//       dispatch({
//         type: GET_PROFILE,
//         payload: res.data,
//       });

//       dispatch(setAlert(edit ? 'Profile Updated' : 'Profile Created', 'success'));

//       if (!edit) {
//         history.push('/dashboard');
//       }
//     } catch (err) {
//       const errors = err.response.data.errors;
//       if (errors) {
//         errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
//       }
//       dispatch({
//         type: PROFILE_ERROR,
//         payload: { msg: err.response.statusText, status: err.response.status },
//       });
//     }
//   };

//   // Delete experience
//   export const deleteExperience = (id) => async (dispatch) => {
//     try {
//       const res = await axios.delete(`/api/profile/experience/${id}`);

//       dispatch({
//         type: UPDATE_PROFILE,
//         payload: res.data,
//       });

//       dispatch(setAlert('Experience Removed', 'danger'));
//     } catch (err) {
//       dispatch({
//         type: PROFILE_ERROR,
//         payload: { msg: err.response.statusText, status: err.response.status },
//       });
//     }
//   };

//   // Delete Education
//   export const deleteEducation = (id) => async (dispatch) => {
//     try {
//       const res = await axios.delete(`/api/profile/education/${id}`);

//       dispatch({
//         type: UPDATE_PROFILE,
//         payload: res.data,
//       });

//       dispatch(setAlert('Education Removed', 'danger'));
//     } catch (err) {
//       dispatch({
//         type: PROFILE_ERROR,
//         payload: { msg: err.response.statusText, status: err.response.status },
//       });
//     }
//   };

//   export const deleteAccount = () => async (dispatch) => {
//     if (window.confirm('Are you sure? This action can Not be undone')) {
//       try {
//         await axios.delete('/api/profile');

//         dispatch({ type: CLEAR_PROFILE });
//         dispatch({ type: ACCOUNT_DELETED });

//         dispatch(setAlert('Your account has been permanently deleted'));
//       } catch (err) {
//         dispatch({
//           type: PROFILE_ERROR,
//           payload: { msg: err.response.statusText, status: err.response.status },
//         });
//       }
//     }
//   };
