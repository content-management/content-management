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
      posts: "",
      thisWeek: [],
    };
  }
  componentDidMount() {
    this.props.getUser().then(
      axios
        .get(`/api/posts/${this.props.myBlog.blog_id}`)
        .then(response => {
 
          this.setState({ posts: response.data });
        })
        .catch(console.log())
    );
  }
  render() {
    console.log(this.props.match.params.id2);
    console.log(this.props.myBlog.blog_id)
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
     
        return (
          <div className="iframy" key={i}>
            <Link smooth to={`/Posts/${obj.blog_name}/${obj.blog_id}#${obj.post_id}`}>{iframeHTML}</Link>
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
    

      let temp3 = [];
      this.state.posts && this.state.posts.map((obj, i) => {
        if (obj.date === week[0] || obj.date == week[1] || obj.date == week[2] || obj.date == week[3] || obj.date == week[4] || obj.date == week[5] || obj.date == week[6]) 
        temp3.push(obj);
    
      });
      let thisWeek = temp3.map((obj, i) => {
        let iframeHTML2 = renderHTML(obj.content);
        return <div className="iframy" key={i}>
            <Link smooth to={`/Posts/${obj.blog_name}/${obj.blog_id}#${obj.post_id}`}>
              {iframeHTML2}
            </Link>
          </div>;
      })
 

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
          <div className="cards-container">
            <Link
              to={`/Posts/${this.props.match.params.id}/${
                this.props.match.params.id2
              }`}
            ></Link>
            <table>
              <tr>
              <th>Number of posts</th>
              <th>Posts This Week</th>
              <th>Posts this month</th>
              </tr>
              <tr>
              <td>{this.state.posts.length}</td>
              <td>{temp3.length}</td>
              <td>{thisWeek}</td>
              </tr>
              </table>
          </div>
        </div>

      </div>
    );
  }
}

const mapStateToProps = state => state;

export default connect(mapStateToProps, { getUser, currBlog })(Home);
