import React, { Component } from "react";
import { connect } from "react-redux"; //connect to redux
import { getUser, currBlog } from "../../ducks/reducer"; //get user from redux
import axios from "axios";
import { Link, withRouter } from "react-router-dom";

class PickBlog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      blogs: "",
      addBlog: false,
      currentBlog: ""
    
    };
    this.addBlogClicked = this.addBlogClicked.bind(this);
    this.updateBlog = this.updateBlog.bind(this);
    
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
  updateBlog(i){
    console.log("updating blog")
    console.log(i)
    this.props.currBlog(i);
  
  }

  render() {
    let blogs =
      this.state.blogs &&
      this.state.blogs.map((obj, i) => {
        return <div key={i} >
        
            <Link to={`/Home/${obj.blog_name}/${obj.blog_id}`}> 
              <h1>{obj.blog_name}</h1>
            </Link>
          </div>;
      });
    console.log("user", this.props.user);
    console.log(this.props.currentBlog);
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

export default connect(mapStateToProps, { getUser, currBlog })(PickBlog);
