import React, { Component } from "react";
import { connect } from "react-redux"; //connect to redux
import { getUser, currBlog, getBlogs } from "../../ducks/reducer"; //get user from redux
import axios from "axios";
import { Link, withRouter } from "react-router-dom";

class PickBlog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      blogs: "",
      addBlog: false,
      currentBlog: "",
      blogName: ""
    };
    this.addBlogClicked = this.addBlogClicked.bind(this);
    this.addBlog = this.addBlog.bind(this);
  }

  componentDidMount() {
    this.props.getUser().then(() => {
      axios
        .get(`/api/blogs/${this.props.user.id}`)
        .then(response => {
          this.props.getBlogs(response.data);
        })
        .catch(console.log());
    });
  }

  addBlogClicked() {
    this.setState({ addBlog: true });
  }
  addBlog() {
    let body = {
      name: this.state.blogName
    };
    axios
      .post(`/api/blog/${this.props.user.id}`, body)
      .then(
        axios.get(`/api/blogs/${this.props.user.id}`).then(response => {
          this.props.getBlogs(response.data);
        })
      )
      .then(this.setState({ addBlog: false }));
  }

  render() {
    console.log(this.props.user.id);
    console.log(this.state.blogName);
    let blogs =
      this.props.blogs &&
      this.props.blogs.map((obj, i) => {
        return (
          <div key={i}>
            <ul>
              <Link
                className="blogLinks"
                to={`/Home/${obj.blog_name}/${obj.blog_id}`}
              >
                <span> {obj.blog_name}</span>
              </Link>
            </ul>
          </div>
        );
      });
    return (
      <div className="pickBlogPage">
        <div>
          <h1>Hello, {this.props.user.name}</h1>
        </div>
        <h1>Which blog are you working on?</h1>
        {blogs}
        <button onClick={this.addBlogClicked}>Create New Blog</button>

        {this.state.addBlog === true ? (
          <div>
            <input
              type="text"
              placeholder="Your blog name"
              onChange={e => this.setState({ blogName: e.target.value })}
            />
            <button onClick={() => this.addBlog()}>Submit</button>
          </div>
        ) : null}
      </div>
    );
  }
}

const mapStateToProps = state => state;

export default connect(mapStateToProps, { getUser, currBlog, getBlogs })(
  PickBlog
);
