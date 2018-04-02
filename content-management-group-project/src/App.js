import React, { Component } from "react";
import logo from "./logo.svg";
import "./styles/css/App.css"
import routes from "./routes";

class App extends Component {
  render() {
    console.log(window.location.href);
    return (
      <div className="App">
        {window.location.href !== "http://localhost:3000/#/" && (
          <h3 className="appHeader">A header would go here</h3>
        )}
        <div>{routes}</div>
      </div>
    );
  }
}

export default App;
