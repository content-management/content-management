import React, { Component } from "react";
import { connect } from "react-redux"; //connect to redux
import { getUser, currBlog, getBlogs } from "../../ducks/reducer"; //get user from redux
import axios from "axios";
import { Link, withRouter } from "react-router-dom";
import Header from "../Header/Header";
import "../../styles/css/PickBlog.css";
import swal from "sweetalert";

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

  setBlog(i){
console.log(i);
this.props.currBlog(i);
  }

  deleteBlog(i) {
    swal({
      title: "Are you sure?",
      text: "This will delete the entire blog including all posts!",
      icon: "warning",
      buttons: true,
      dangerMode: true
    })
      .then(willDelete => {
        if (willDelete) {
          axios
            .delete(`/api/deleteblog/${i}`)
            .then(
              axios.get(`/api/blogs/${this.props.user.id}`).then(response => {
                this.props.getBlogs(response.data);
              })
            )
            .catch(console.log())
            .then(
              swal("Blog Deleted!", {
                icon: "success"
              })
            );
        } else {
          swal("Your blog is safe!");
        }
      })
      .then(
        axios.get(`/api/blogs/${this.props.user.id}`).then(response => {
          this.props.getBlogs(response.data);
        })
      );
  }

  render() {
    let blogs =
      this.props.blogs &&
      this.props.blogs.map((obj, i) => {
        return (
          <div key={i}>
            <ul className="blogList">
              <Link
                className="blogLinks"
                to={`/Home/${obj.blog_name}/${obj.blog_id}`}
              >
                <span className="list" onClick={(() => this.setBlog(obj))}> {obj.blog_name}</span>
              </Link>
              <button className="postsButtons" onClick={() => this.deleteBlog(obj.blog_id)}>
                Delete Blog
              </button>
            </ul>
          </div>
        );
      });
    return (
      <div>
        <Header />
        <div className="pickBlogPage">
          <div>
            <h1>Hello, {this.props.user.name}</h1>
          </div>
          <h1>Which website are you working on?</h1>
          {blogs}
          <button className="postsButtons" onClick={this.addBlogClicked}>
            Create New Blog
          </button>

          {this.state.addBlog === true ? (
            <div>
              <input
                type="text"
                placeholder="Your blog name"
                onChange={e => this.setState({ blogName: e.target.value })}
              />
              <button className="postsButtons" onClick={() => this.addBlog()}>Submit</button>
            </div>
          ) : null}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => state;

export default connect(mapStateToProps, { getUser, currBlog, getBlogs })(
  PickBlog
);
