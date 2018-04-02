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
    this.props.getUser()
  }
  render() {
    console.log("user", this.props.user);
    console.log(this.props.isLoading);
    return (
      <div className="App">
        <div>
          {!this.props.isLoading && <h1>Hello, {this.props.user.name}</h1>}
          {this.props.isLoading && <h2>Loading...</h2>}
        </div>
        <Posts />
        <Pages />
      </div>
    );
  }
}

const mapStateToProps = state => state;

export default connect(mapStateToProps, { getUser })(Home);
