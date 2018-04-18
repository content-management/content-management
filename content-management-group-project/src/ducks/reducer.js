import axios from "axios";

//CONSTANTS
const GET_USER = "GET_USER";
const CURR_BLOG = "CURR_BLOG";
const CURR_PAGES = "CURR_PAGES";
const GET_BLOGS = "GET_BLOGS";
const GET_PAGES = "GET_PAGES";
const GET_FAVES = "GET_FAVES";
const UPDATE_FAV = "UPDATE_FAV";
const UPDATE_TITLE = "UPDATE_TITLE";
const UPDATE_CONTENT = "UPDATE_CONTENT";
const UPDATE_PAGENAME = "UPDATE_PAGENAME";


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
export function getFaves(e) {
  return {
    type: GET_FAVES,
    payload: e
  };
}
export function updateFav(e) {
  return {
    type: UPDATE_FAV,
    payload: e
  };
}
export function updateTitle(e) {
  return {
    type: UPDATE_TITLE,
    payload: e
  };
}
export function updateContent(e) {
  return {
    type: UPDATE_CONTENT,
    payload: e
  };
}
export function updatePageName(e) {
  return {
    type: UPDATE_PAGENAME,
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
  myPage: "",
  helpPage: 182,
  helpBlog: 154,
  favs: false,
  favorite: "",
  title: "",
  content: "",
  pageName: ""
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
    case GET_FAVES:
      return Object.assign({}, state, { favs: action.payload });
    case UPDATE_FAV:
      return Object.assign({}, state, { favorite: action.payload });
    case UPDATE_TITLE:
      return Object.assign({}, state, { title: action.payload });
    case UPDATE_CONTENT:
      return Object.assign({}, state, { content: action.payload });

    default:
      return state;
  }
}
