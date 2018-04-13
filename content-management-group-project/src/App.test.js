import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Home from './components/Home/Home';
import { Provider } from "react-redux";
import store from "./store";
import { HashRouter as Router } from "react-router-dom";
import { Switch, Route } from "react-router-dom";

const { tempTest } = require("./components/Home/HomeTest");

// const temp = "asdfasdfasdf";
it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Provider store={store}><Router><App /></Router></Provider>, div);
  ReactDOM.unmountComponentAtNode(div);
});

it('variable tempTest is a string', () => {
  expect(typeof tempTest).toBe('string');
});

it('store.isLoad should equal false', () => {
  // console.log("store", store.getState());
  const temp = store.getState();
  temp.isLoading === false;
});

it('store.didErr should equal false', () => {
  // console.log("store", store.getState());
  const temp = store.getState();
  temp.didErr === false;
});

it('store.helpPage should equal 182', () => {
  // console.log("store", store.getState());
  const temp = store.getState();
  temp.helpPage === 182;
});

it('store.helpBlog should equal 154', () => {
  // console.log("store", store.getState());
  const temp = store.getState();
  temp.helpPage === 154;
});

// it('store.subscribe expects a function ', () => {
//   // console.log("App", App)
//   const temp = store.subscribe("test");
//   temp.includes("Expected") === false;
// });
