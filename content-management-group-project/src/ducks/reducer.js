import axios from "axios";

//CONSTANTS
const GET_USER = "GET_USER";
const CURR_BLOG = "CURRBLOG";

// ACTION CREATORS
export function getUser() {
  return {
    type: GET_USER,
    payload: axios
      .request("/api/me")
      .then(response => response.data)
      .catch(err => err.message)
  };
}

export function currBlog(e) {
  return {
    type: CURR_BLOG,
    payload: e
  };
}

//INITIAL STATE

const initialState = {
  user: {},
  isLoading: false,
  didErr: false,
  errMessage: null,
  currentBlog: ""
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case `${GET_USER}_PENDING`:
      return Object.assign({}, state, { isLoading: true });

    case `${GET_USER}_FULFILLED`:
      return Object.assign({}, state, {
        isLoading: false,
        user: action.payload
      });

    case `${GET_USER}_REJECTED`:
      return Object.assign({}, state, { isLoading: false, didErr: true });
    case CURR_BLOG:
      return Object.assign({}, state, { currentBlog: action.payload });

    default:
      return state;
  }
}
