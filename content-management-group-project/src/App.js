import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import "./styles/css/App.css";
import routes from "./routes";


class App extends Component {
  render() {
    console.log(window.location.href);
    return ( <div>
        <div>{routes}</div>
      </div>
    );
  }
}

export default App;
