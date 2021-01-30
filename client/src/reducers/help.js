import {ADD_QUERIES, GET_QUERIES, QUERIES_ERROR} from '../actions/types';

const initialState = {
  loading: true,
  queries: [],
  error: {},
};

export default function (state = initialState, action) {
  const {type, payload} = action;

  switch (type) {
    case ADD_QUERIES:
      return {
        ...state,
        queries: [payload, ...state.queries],
        loading: false,
      };
    case GET_QUERIES:
      console.log(payload);
      return {
        ...state,
        queries: payload,
        loading: false,
      };
    case QUERIES_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    default:
      return state;
  }
}
