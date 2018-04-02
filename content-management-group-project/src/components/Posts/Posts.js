import React, { Component } from "react";
import { connect } from "react-redux";
import { getUser } from "../../ducks/reducer";
import { Link, withRouter } from "react-router-dom";
import axios from "axios";

class Posts extends Component {
  constructor() {
    super();
  }
  componentDidMount() {
    this.props.getUser().then(
      axios
        .get(`/api/blogs/${this.props.user.id}`)
        .then(response => {
          console.log(response);
          // this.setState({ blogs: response.data });
        })
        .catch(console.log())
    );
  }

  render() {
    return <div>See all your posts here </div>;
  }
}

const mapStateToProps = state => state;

export default withRouter(connect(mapStateToProps, { getUser })(Posts));
