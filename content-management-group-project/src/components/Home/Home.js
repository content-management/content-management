import React, { Component } from "react";
import { connect } from "react-redux"; //connect to redux
import { getUser, currBlog } from "../../ducks/reducer"; //get user from redux
import { Link, withRouter } from "react-router-dom";
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
      posts: "",
      thisWeek: [],
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
    console.log(this.state.posts)
   
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
            <Link to={`/EditPost/${obj.post_id}`}>{iframeHTML}</Link>
          </div>
        );
      });
      //Post for the current week
      let date = new Date();
      let day = date.getDay();
      let week = [];
      for (let i = 0; i < 7; i++) {
        if (i - day != 0) {
          let days = i - day;
          let newDate = new Date(date.getTime() + days * 24 * 60 * 60 * 1000).toLocaleDateString();
          week.push(newDate);
        } 
        else week.push(date.toLocaleDateString());
      }
      console.log(week);

      // this.state.posts && this.state.post.map((obj, i) => {
      //   if (obj.date === week[0] || obj.date == week[1] || obj.date == week[2] || obj.date == week[3] || obj.date == week[4] || obj.date == week[5] || obj.date == week[6]) 
      //   this.setState({thisWeek: obj})
      // });

      // console.log(this.state.thisWeek);
 

    return (
      <div>
        <Header
          id={this.props.match.params.id}
          id2={this.props.match.params.id2}
        />
        <div className="home-body">
          <div className="home-greeting">
            {/* {!this.props.isLoading && (
              <h1>Welcome back, {this.props.user.name} !</h1>
            )} */}
            <h2>{this.props.myBlog.blog_name}</h2>
            {this.props.isLoading && <h2>Loading...</h2>}
          </div>
          <div className="scroll-container">
            <div className="horizontal-scroll-wrapper rectangles">
              {myContent}
            </div>
          </div>
          <div className="cards-container">
            <Link
              to={`/Posts/${this.props.match.params.id}/${
                this.props.match.params.id2
              }`}
            >
              <div className="cards">Posts</div>
            </Link>
            <div className="cards">Pages</div>
            <div className="cards">Media</div>
            <h3>Number of posts</h3>
              {this.state.posts.length}
              <h3>Post This Week</h3>
              <h3>Post this month</h3>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => state;

export default connect(mapStateToProps, { getUser, currBlog })(Home);
