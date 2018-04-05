import React, { Component } from "react";
import { connect } from "react-redux";
import { getUser } from "../../ducks/reducer";
import { Link, withRouter } from "react-router-dom";
import axios from "axios";
import Header from "../Header/Header";

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
        .get(`/api/posts/${this.props.match.params.id2}`)
        .then(response => {
          console.log("response", response.data);
          this.setState({ posts: response.data });
        })
        .catch(console.log())
    );
    console.log(parseInt(window.location.hash.split("/")[2]));
  }
  deleteSub(i) {
    axios
      .delete(`/api/delete/${i}`)
      .then(
        axios
          .get(`/api/posts/${parseInt(window.location.hash.split("/")[2])}`)
          .then(response => {
            console.log("response", response.data);
            this.setState({ posts: response.data });
          })
      )
      .catch(console.log());
  }

  render() {
    console.log(this.props.match.params.id);
    let results = {};
    results =
      this.state.posts &&
      this.state.posts.map((obj, i) => {
        return (
          <div className="postResultsWrapper" key={i}>
            <div style={{ height: "80%" }}>
              <h3>{obj.blog_name}</h3>
              <h1>{obj.title}</h1>

              <iframe className="postIframe" srcdoc={obj.content} />

              <div>Post: {obj.post_id}</div>
              <br />
              <br />
            </div>
            <Link to={`/EditPost/${obj.post_id}`}>
              <button className="postsButtons">Edit Post</button>
            </Link>
            <button
              className="postsButtons"
              onClick={() => this.deleteSub(obj.post_id)}
            >
              Delete Post
            </button>
          </div>
        );
      });
    return (
      <div>
        <Header
          id={this.props.match.params.id}
          id2={this.props.match.params.id2}
        />
        <Link to={`/Home/${this.props.user.name}`} />
        <div style={{ height: "100px" }} />
        {results}
        <Link to={`/NewPost/${this.props.match.params.id2}`}>
          <button className="newPostButton">New Post</button>
        </Link>
      </div>
    );
  }
}

const mapStateToProps = state => state;

export default withRouter(connect(mapStateToProps, { getUser })(Posts));
