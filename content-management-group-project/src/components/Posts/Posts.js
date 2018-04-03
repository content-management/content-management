import React, { Component } from "react";
import { connect } from "react-redux";
import { getUser } from "../../ducks/reducer";
import { Link, withRouter } from "react-router-dom";
import axios from "axios";

class Posts extends Component {
  constructor() {
    super();
    this.state = {
      posts: ""
    };
  }
  componentDidMount() {
    this.props.getUser().then(
      axios
        .get(`/api/posts/${parseInt(window.location.hash.split("/")[2])}`)
        .then(response => {
          console.log("response", response.data);
          this.setState({ posts: response.data });
        })
        .catch(console.log())
    );
    console.log(parseInt(window.location.hash.split("/")[2]));
  }

  render() {
    let results = {};
    results =
      this.state.posts &&
      this.state.posts.map((obj, i) => {
        return (
          <div className="postResultsWrapper" key={i}>
            <ul>
              <span>{obj.blog_name}</span>
              <h1>{obj.title}</h1>
              <li>{obj.content}</li>
            </ul>
            <button>Edit Post</button>
          </div>
        );
      });
    return <div>
        <Link to={`/Home/${this.props.user.name}`}>
          <h3> Home</h3>
        </Link>
        {results}
        <Link to="/Editor/">
        <button>New Post</button>
        </Link>
      </div>;
  }
}

const mapStateToProps = state => state;

export default withRouter(connect(mapStateToProps, { getUser })(Posts));
