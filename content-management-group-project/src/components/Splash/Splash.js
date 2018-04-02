import React, { Component } from "react";

import Pages from "../Pages/Pages";
import Posts from "../Posts/Posts";

class Splash extends Component {
  render() {
    return (
      <div className="App">
        <h1>This is the Splash Page!</h1>
        <br />
        <br />
        <div className="loginButtonsWrapper">
          <div>
            <button
              style={{ borderRight: "solid white thin" }}
              className="loginButton"
            ><a href={process.env.REACT_APP_LOGIN}>
              Login
            </a></button>
            <button className="loginButton">Signup</button>
          </div>
        </div>
      </div>
    );
  }
}

export default Splash;
