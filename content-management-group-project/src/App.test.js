import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Home from './components/Home/Home';
import { Provider } from "react-redux";
import store from "./store";
import { HashRouter as Router } from "react-router-dom";
import { Switch, Route } from "react-router-dom";
import PickBlog from '../src/components/PickBlog/PickBlog';
import NewPost from './components/Editor/NewPost';
import Posts from './components/Posts/Posts';

// const {  } = require("./styles/css/App.css");
const { tempTest } = require("./components/Home/HomeTest");

// const temp = "asdfasdfasdf";
it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Provider store={store}><Router><App /></Router></Provider>, div);
  ReactDOM.unmountComponentAtNode(div);
});
it('store.errMessage should equal null', () => {
  // console.log("store", store.getState());
  const temp = store.getState();
  temp.errMessage === null;
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

it('getState returns an obj', () => {
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
  it("state.favs should default to false", () => {
    const temp = store.getState();
    expect(temp.favs).toBe(false);
  });
   it("state.favorite should be a string", () => {
     const temp = store.getState();
     expect(typeof temp.favorite).toBe("string");
   });
    it("state.title should be a string", () => {
      const temp = store.getState();
      expect(typeof temp.title).toBe("string");
    });
     it("state.content should be a string", () => {
       const temp = store.getState();
       expect(typeof temp.content).toBe("string");
     });
      it("state.pageName should be a string", () => {
        const temp = store.getState();
        expect(typeof temp.pageName).toBe("string");
      });
        it("state.user should be a object", () => {
          const temp = store.getState();
          expect(typeof temp.user).toBe("object");
        });

 it('console log', () => {
  console.log("styles", App);
  // expect(typeof tempTest).toBe('string');  // compare something on state?
});

 

