import React, { Component } from "react";
import { connect } from "react-redux"; //connect to redux
import { getUser, currBlog } from "../../ducks/reducer"; //get user from redux
import { withRouter } from "react-router-dom";
import { HashLink as Link } from 'react-router-hash-link';
import axios from "axios";
import Posts from "../Posts/Posts";
import "../../styles/css/Home.css";
import Header from "../Header/Header";
import renderHTML from "react-render-html";

let temp = "";
class Home extends Component {
  constructor(props) {
    super(props);
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
  }
  render() {
    console.log(this.props.myBlog)
    let myPost =
      this.state.posts &&
      this.state.posts.map((obj, i) => {
        return (
          <div key={i}>
            <p>{obj.title}</p>
          </div>
        );
      });
    let myContent =
      this.state.posts &&
      this.state.posts.map((obj, i) => {
        let iframeHTML = renderHTML(obj.content);
        console.log("postID", obj.post_id);
        return (
          <div
            
            className="iframy"
            key={i}
          >
            <Link smooth to={`/Posts/${obj.blog_name}/${obj.blog_id}#${obj.post_id}`}>{iframeHTML}</Link>
          </div>
        );
      });

    return (
      <div>
        <Header
          id={this.props.match.params.id}
          id2={this.props.match.params.id2}
        />
        <div className="home-body">
          <div className="header-container">
            <h1>{this.props.myBlog.blog_name}</h1>
            {this.props.isLoading && <h2>Loading...</h2>}
          </div>

          <div className="buttons-container">          
          <Link to={`/Posts/${this.props.match.params.id}/${
              this.props.match.params.id2}`}>          
              <button className="buttons-item">History</button>
          </Link>     
          <Link to={`/NewPost/${this.props.match.params.id}`}> 
              <button className="buttons-item" id="newPost">New</button> 
          </Link>                 
        </div>

          <div className="scroll-container">
            <div className="horizontal-scroll-wrapper rectangles">
              {myContent}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => state;

export default connect(mapStateToProps, { getUser, currBlog })(Home);
