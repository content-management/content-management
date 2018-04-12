import axios from "axios";

//CONSTANTS
const GET_USER = "GET_USER";
const CURR_BLOG = "CURR_BLOG";
const CURR_PAGES = "CURR_PAGES";
const GET_BLOGS = "GET_BLOGS";
const GET_PAGES = "GET_PAGES";

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

export function getBlogs(e) {
  return {
    type: GET_BLOGS,
    payload: e
  };
}

export function currPages(e) {
  return {
    type: CURR_PAGES,
    payload: e
  };
}
export function getPages(e) {
  return {
    type: GET_PAGES,
    payload: e
  };
}

//INITIAL STATE

const initialState = {
  user: {},
  isLoading: false,
  didErr: false,
  errMessage: null,
  blogs: "",
  myBlog: "",
  pages: "",
  myPage: ""
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
      return Object.assign({}, state, { myBlog: action.payload });

    case GET_BLOGS:
      return Object.assign({}, state, { blogs: action.payload });

    case CURR_PAGES:
      return Object.assign({}, state, { myPage: action.payload });

    case GET_PAGES:
      return Object.assign({}, state, { pages: action.payload });

    default:
      return state;
  }
}
