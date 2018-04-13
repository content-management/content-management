import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Provider } from "react-redux";
import store from "./store";
import { HashRouter as Router } from "react-router-dom";
import { Switch, Route } from "react-router-dom";
import PickBlog from '../src/components/PickBlog/PickBlog';
import NewPost from './components/Editor/NewPost';
import Posts from './components/Posts/Posts';


it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Provider store={store} ><Router><App /></Router></Provider>, div);
  ReactDOM.unmountComponentAtNode(div);
});


it('how to console log state', () => {
  console.log("store", store.getState());
  // expect(typeof tempTest).toBe('string');  // compare something on state?
});


 it('state.blogs should be a string', ()=>{
   const temp = store.getState();
    expect(typeof temp.blogs).toBe('string');
 });

 it('state.myBlog should be string', () =>{
   const temp = store.getState();
   expect (typeof temp.myBlog).toBe('string');
 });

 it('state.pages should be a string', () =>{
   const temp = store.getState();
   expect(typeof temp.pages).toBe('string');
 });

 it('state.myPage should be a string', () =>{
   const temp = store.getState();
   expect (typeof temp.myPage).toBe('string');
 });

 

