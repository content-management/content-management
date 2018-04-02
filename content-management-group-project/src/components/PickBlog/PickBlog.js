import React, { Component } from "react";
import { connect } from "react-redux"; //connect to redux
import { getUser } from "../../ducks/reducer"; //get user from redux
import axios from "axios";
import { Link, withRouter } from "react-router-dom";

class PickBlog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      blogs: "",
      addBlog: false
    
    };
    this.addBlogClicked = this.addBlogClicked.bind(this);
  }

  componentDidMount() {
    this.props.getUser().then(() => {
      axios
        .get(`/api/blogs/${this.props.user.id}`)
        .then(response => {
          this.setState({ blogs: response.data });
        })
        .catch(console.log());
    });
  }

  addBlogClicked() {
    this.setState({ addBlog: true });
  }
  render() {
    let blogs =
      this.state.blogs &&
      this.state.blogs.map((obj, i) => {
        return (
          <div key={i}>
            <ul>
              <Link to={`/Posts/${obj.blog_id}`}>
                <li> {obj.blog_name}</li>
              </Link>
            </ul>
          </div>
        );
      });
    console.log("user", this.props.user);
    console.log(this.state.currBlog);
    return (
      <div className="App">
        <div>
          <h1>Hello, {this.props.user.name}</h1>
        </div>
        <h1>Which blog are you working on?</h1>
        {blogs}
        <button onClick={this.addBlogClicked}>Add Blog</button>
        
        {this.state.addBlog === true ? <div>
          <input type="text" placeholder="Your blog name"/>
          <input type="submit"/>
        </div> : null}
     
      </div>
    );
  }
}

const mapStateToProps = state => state;

export default connect(mapStateToProps, { getUser })(PickBlog);
