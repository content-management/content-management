import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import "./styles/css/App.css";
import routes from "./routes";
import Header from "./components/Header/Header";

class App extends Component {
  render() {
    console.log(window.location.href);
    return (
      <div>
        <Header />
        <div>{routes}</div>
      </div>
    );
  }
}

export default App;
