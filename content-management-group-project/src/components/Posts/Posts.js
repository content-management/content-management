import React, { Component } from "react";
import { connect } from "react-redux";
import { getUser } from "../../ducks/reducer";
import { Link, withRouter } from "react-router-dom";
import axios from "axios";
import Header from "../Header/Header";
import "../../styles/css/Posts.css";
import swal from "sweetalert";

class Posts extends Component {
  constructor() {
    super();
    this.state = {
      posts: "",
      favs: false
    };
    this.showFav = this.showFav.bind(this);
    this.showAll = this.showAll.bind(this);
    
  }
  componentDidMount() {
    this.props.getUser().then(
      axios
        .get(`/api/posts/${this.props.match.params.id2}`)
        .then(response => {
          this.setState({ posts: response.data });
        })
        .catch(console.log())
    );
    console.log(parseInt(window.location.hash.split("/")[2]));
  }
  deletePost(i) {
    swal({
      title: "Are you sure?",
      text: "Once this post is deleted it will not come back!",
      icon: "warning",
      buttons: true,
      dangerMode: true
    }).then(willDelete => {
      if (willDelete) {
        axios
          .delete(`/api/delete/${i}`)
          .catch(console.log())
          .then(
            swal("Your post has been deleted!", {
              icon: "success"
            })
          )
          .then(
            axios
              .get(`/api/posts/${this.props.match.params.id2}`)
              .then(response => {
                console.log("response", response.data);
                this.setState({ posts: response.data });
              })
          );
      } else {
        swal("Your post has NOT been deleted!");
      }
    });
  }
  showFav() {
    this.setState({ favs: true });
  }
  showAll() {
    this.setState({ favs: false });
  }

  render() {
    console.log(this.state.selectValue);
    let results = {};
    let num = this.state.posts.length + 1;
    results =
      this.state.posts &&
      this.state.posts.map((obj, i) => {
        num -= 1;
        return (
          <div className="postResultsWrapper" key={i}>
            <div id={obj.post_id} style={{ height: "80%" }}>
              <div>{obj.blog_name}</div>
              <div>{obj.title}</div>
              <div>{obj.date} </div>
              {/* <h4> {obj.time}</h4> */}

              <iframe className="postIframe" srcdoc={obj.content} />

              <div>Post: {num}</div>
              <div>PostId: {obj.post_id}</div>
            </div>
            <Link to={`/EditPost/${obj.post_id}`}>
              <button className="postsButtons">Edit Post</button>
            </Link>
            <button
              className="postsButtons"
              onClick={() => this.deletePost(obj.post_id)}
            >
              Delete Post
            </button>
          </div>
        );
      });
    let favs = [];
    this.state.posts &&
      this.state.posts.map((obj, i) => {
        if (obj.favorites === "yes") {
          favs.push(obj);
        }
      });
    let yourFavs = favs.map((obj, i) => {
      num -= 1;
      return (
        <div className="postResultsWrapper" key={i}>
          <div id={obj.post_id} style={{ height: "80%" }}>
            <div>{obj.blog_name}</div>
            <div>{obj.title}</div>
            <div>{obj.date} </div>
            {/* <h4> {obj.time}</h4> */}

            <iframe className="postIframe" srcdoc={obj.content} />

            <div>Post: {num}</div>
            <div>PostId: {obj.post_id}</div>
          </div>
          <Link to={`/EditPost/${obj.post_id}`}>
            <button className="postsButtons">Edit Post</button>
          </Link>
          <button
            className="postsButtons"
            onClick={() => this.deletePost(obj.post_id)}
          >
            Delete Post
          </button>
        </div>
      );
    });
    return <div>
        <Header id={this.props.match.params.id} id2={this.props.match.params.id2} />
        {this.state.favs === false ? <h2 className="switchView" onClick={this.showFav} >
            Favorites
          </h2> : <h2 className="switchView" onClick={this.showAll} >
            All Post
          </h2>}

        {this.state.favs === false ? <div>
            <Link to={`/Home/${this.props.user.name}`} />
            <div style={{ height: "100px" }} />
            {results}
            <Link to={`/NewPost/${this.props.match.params.id2}`}>
              <button className="newPostButton">New Post</button>
            </Link>
          </div> : <div>
            <Link to={`/Home/${this.props.user.name}`} />
            <div style={{ height: "100px" }} />
            {yourFavs}
            <Link to={`/NewPost/${this.props.match.params.id2}`}>
              <button className="newPostButton">New Post</button>
            </Link>{" "}
          </div>}
      </div>;
  }
}

const mapStateToProps = state => state;

export default withRouter(connect(mapStateToProps, { getUser })(Posts));
