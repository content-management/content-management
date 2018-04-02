import React, { Component } from "react";

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
            >
              Login
            </button>
            <button className="loginButton">Signup</button>
          </div>
        </div>
      </div>
    );
  }
}

export default Splash;
