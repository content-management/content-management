import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import "./styles/css/App.css";
import routes from "./routes";

class App extends Component {
  render() {
    console.log(window.location.href);
    return (
      <div className="App">
        {window.location.href !== "http://localhost:3000/#/" && (
          <h3 className="App-header">
            <ul>
              <li>
                <a href="/">Login Page</a>
              </li>
              <li>
                <a href="Posts">Posts Page</a>
              </li>
              <li>
                <a href="/editor">Editor Page</a>
              </li>
            </ul>
          </h3>
        )}
        <div>{routes}</div>
      </div>
    );
  }
}

export default App;
