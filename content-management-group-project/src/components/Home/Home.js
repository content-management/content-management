import React, { Component } from "react";

import Pages from "../Pages/Pages";
import Posts from "../Posts/Posts";

class Home extends Component {
  render() {
    return (
      <div className="App">
        <Posts />
        <Pages />
      </div>
    );
  }
}

export default Home;
