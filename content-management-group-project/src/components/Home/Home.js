import React, { Component } from "react";
import { connect } from "react-redux"; //connect to redux
import { getUser } from "../../ducks/reducer";//get user from redux
import Pages from "../Pages/Pages";
import Posts from "../Posts/Posts";
import { Link, withRouter } from "react-router-dom";

class Home extends Component {
  constructor() {
    super();
  }

  componentDidMount() {
    this.props.getUser()
  }
  render() {
    console.log(this.props.user)
    return (
      <div className="App">
      <h1>Hello, </h1>
        <Posts />
        <Pages />
      </div>
    );
  }
}

const mapStateToProps = state => state;

export default withRouter(connect(mapStateToProps, { getUser })(Home));
