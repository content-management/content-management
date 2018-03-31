import React, { Component } from "react";
import { connect } from "react-redux";
import { getUser } from "../../ducks/reducer";
import { Link, withRouter } from "react-router-dom";

class Posts extends Component {
  render() {
    return <div>See all your posts here </div>;
  }
}

const mapStateToProps = state => state;

export default withRouter(connect(mapStateToProps, { getUser })(Posts));
