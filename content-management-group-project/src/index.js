import React from "react";
import ReactDOM from "react-dom";
import './styles/css/index.css';
import App from "./App";
import { Provider } from "react-redux";
import store from "./store";
import { HashRouter as Router } from "react-router-dom";
// import axios from 'axios';

ReactDOM.render(
  <Provider store={store}>
  <Router>
    <App />
  </Router>
  </Provider>,
  document.getElementById("root")
);
