import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";

import routes from "./routes";

class App extends Component {
  render() {
    return (
      <div className="App">
        <h3>A header would go here</h3>
        <div>{routes}</div>
      </div>
    );
  }
}

export default App;
