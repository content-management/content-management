import React, { Component } from "react";
import { connect } from "react-redux"; //connect to redux
import { getUser, currBlog, getBlogs, getPages } from "../../ducks/reducer"; //get user from redux
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
      addPage: false,
      currentBlog: "",
      blogName: "",
      pageName: "",
    };
    this.addBlogClicked = this.addBlogClicked.bind(this);
    this.addPageClicked = this.addPageClicked.bind(this);
    this.addBlog = this.addBlog.bind(this);
    this.addPage = this.addPage.bind(this);
    
  }

  componentDidMount() {
    swal("Welcome to Contentum")
    this.props.getUser().then(() => {
      axios
        .get(`/api/blogs/${this.props.user.id}`)
        .then(response => {
          this.props.getBlogs(response.data);
        })
        .catch(console.log());

      axios.get(`/api/pages/${this.props.user.id}`).then(response => {
        this.props.getPages(response.data);
      });
    });
    
  }

  addBlogClicked() {
    this.setState({ addBlog: true });
  }
  addPageClicked() {
    this.setState({ addPage: true });
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
  addPage() {
    let body = {
      name: this.state.pageName
    };
    console.log(body.name)
    axios
      .post(`/api/newPage/${this.props.user.id}`, body)
      .then(
        axios.get(`/api/pages/${this.props.user.id}`).then(response => {
          this.setState({pages: response.data});
        })
      )
      .then(this.setState({ addPage: false }));
  }

  setBlog(i) {
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

  deletePage(i) {
    swal({
      title: "Are you sure?",
      text: "This will delete the entire Page including all content!",
      icon: "warning",
      buttons: true,
      dangerMode: true
    }).then(willDelete => {
      if (willDelete) {
        axios
          .delete(`/api/deletePage/${i}`)
          .then(
            axios.get(`/api/pages/${this.props.user.id}`).then(response => {
              this.setState({ pages: response.data });
            })
          )
          .catch(console.log())
          .then(
            swal("Page Deleted!", {
              icon: "success"
            })
          );
      } else {
        swal("Your Page is safe!");
      }
    });
  }

  render() {
    console.log("props", this.props.pages);
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
                <span className="list" onClick={() => this.setBlog(obj)}>
                  {" "}
                  {obj.blog_name}
                </span>
              </Link>
              <button
                className="deleteButtons"
                onClick={() => this.deleteBlog(obj.blog_id)}
              >
                Delete Blog
              </button>
            </ul>
          </div>
        );
      });
    let pages =
      this.props.pages &&
      this.props.pages.map((obj, i) => {
        return (
          <div key={i}>
            <ul className="blogList">
              <Link
                className="blogLinks"
                to={`/EditPage/${this.props.user.id}`}
              >
                <span className="list">{obj.page_name}</span>
              </Link>
              <button
                className="deleteButtons"
                onClick={() => this.deletePage(obj.page_id)}
              >
                Delete Page
              </button>
            </ul>
          </div>
        );
      });
    return <div>
        <Header />
        
        <div className="pickHeader">
          <div>
            <h1>Hello, {this.props.user.name}</h1>
          </div>
          <h1>Which website are you working on?</h1></div>
          
          <div className="pickBlogPage">
          <div><h2>Blogs</h2>
          {blogs}
          <button className="postsButtons" onClick={this.addBlogClicked}>
            Create New Blog
          </button></div>

          {this.state.addBlog === true ? <div>
              <input type="text" placeholder="Your blog name" onChange={e => this.setState(
                    { blogName: e.target.value }
                  )} />
              <button className="postsButtons" onClick={() => this.addBlog()}>
                Submit
              </button>
            </div> : null} 

          <div><h2>Pages</h2>
          {pages}
          <button className="postsButtons" onClick={this.addPageClicked}>
            Create New Page
          </button></div></div>

          {this.state.addPage === true ? <div>
              <input type="text" placeholder="Your Page name" onChange={e => this.setState(
                    { pageName: e.target.value }
                  )} />
              <button className="postsButtons" onClick={() => this.addPage()}>
                Submit
              </button>
            </div> : null}
                  
      </div>;
  }
}

const mapStateToProps = state => state;

export default connect(mapStateToProps, { getUser, currBlog, getBlogs, getPages })(
  PickBlog
);
