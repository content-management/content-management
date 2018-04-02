import React, { Component } from "react";
import { connect } from "react-redux"; //connect to redux
import { getUser } from "../../ducks/reducer"; //get user from redux
import Pages from "../Pages/Pages";
import Posts from "../Posts/Posts";
import { Link, withRouter } from "react-router-dom";

let temp = "";
class Home extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.getUser();
  }
  render() {
    console.log("user", this.props.user);
    console.log(this.props.isLoading);
    return (
      <div className="App">
        <div>{!this.props.isloading && <h1>Hello, </h1>}</div>
        <Posts />
        <Pages />
      </div>
    );
  }
}

const mapStateToProps = state => state;

export default withRouter(connect(mapStateToProps, { getUser })(Home));
