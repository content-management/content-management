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
      // addBlog: false,
      // addPage: false,
      currentBlog: "",
      blogName: "",
      pageName: "",
    };
    this.addBlogClicked = this.addBlogClicked.bind(this);
    this.addPageClicked = this.addPageClicked.bind(this);
    this.addBlog = this.addBlog.bind(this);
    this.addPage = this.addPage.bind(this);
    this.getDaStuffs = this.getDaStuffs.bind(this);
  }

  componentDidMount() {
    this.props.getUser().then(() => {
      axios.get(`/api/pages/${this.props.user.id}`).then(response => {
        this.props.getPages(response.data);
      }).then(this.getDaStuffs()).then(console.log("userID", this.props.user.id));
    });
    
  }

  addBlogClicked() {
    // this.setState({ addBlog: true });
    swal("Blog Title:", {
      content: "input",
    })
    .then((value) => {
      this.addBlog(value)
    });
  }
  addPageClicked() {
    // this.setState({ addPage: true });
    swal("Blog Title:", {
      content: "input",
    })
    .then((value) => {
      this.addPage(value)
    });
  }
  addBlog(value) {
    let blogName = value;
    let body = {
      name: blogName
    };
    axios
      .post(`/api/blog/${this.props.user.id}`, body)
      .then(
        axios.get(`/api/blogs/${this.props.user.id}`).then(response => {
          this.props.getBlogs(response.data);
        })
      )
      .then(this.getDaStuffs())
  }
  addPage(value) {
    let pageName = value;
    let body = {
      name: pageName
    };
    axios
      .post(`/api/newPage/${this.props.user.id}`, body)
      .then(
        axios.get(`/api/pages/${this.props.user.id}`).then(response => {
          this.setState({pages: response.data});
        })
      )
      .then(this.getDaStuffs())
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
      }).then(this.getDaStuffs())
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
          .catch(console.log())
          .then(
            swal("Page Deleted!", {
              icon: "success"
            })
          ).then(axios.get(`/api/pages/${this.props.user.id}`).then(response => {
            this.setState({ pages: response.data });
          })
        );
      } else {
        swal("Your Page is safe!");
      }
    }).then(this.getDaStuffs())
  }
//below function written by Logan
  getDaStuffs(){
    axios.get(`/api/pages/${this.props.user.id}`).then(response => {
      this.props.getPages(response.data);
    }).then(axios
      .get(`/api/blogs/${this.props.user.id}`)
      .then(response => {
        this.props.getBlogs(response.data);
      })
      .catch(console.log()))
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
                to={`/EditPage/${obj.page_id}`}
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
    return( 
      <div className="pickBlog-body">
      
        <Header />
        
        <div className="pickHeader">
          <div className="pickBlog-greeting">
            <h1>Hello, {this.props.user.name}</h1>
          </div>
          <span>Which website are you working on?</span>
        </div>
          
        <div className="pickBlogPage">
          <div>
              <h2>Blogs</h2>
              {blogs}
              <button className="postsButtons" onClick={this.addBlogClicked}>
              Create New Blog
              </button>
            </div>

            {this.state.addBlog === true ? 
              <div className ='newBlog'>
                <input type="text" placeholder="Your blog name" onChange={e => this.setState({ blogName: e.target.value })}/>
                <button className="submitButtons" onClick={() => this.addBlog()}>
                  Submit
                </button>
              </div> : null} 

            <div>
              <h2>Pages</h2>
                {pages}
                <button className="postsButtons" onClick={this.addPageClicked}>
                Create New Page
                </button>
            </div>
        </div>

          {this.state.addPage === true ? 
            <div className="newPage">
                <input type="text" placeholder="Your Page name" onChange={e => this.setState({ pageName: e.target.value })} />
                <button className="submitButtons" onClick={() => this.addPage()}>
                Submit
              </button>
            </div> : null}
                  
      </div>)
  }
}

const mapStateToProps = state => state;

export default connect(mapStateToProps, { getUser, currBlog, getBlogs, getPages })(
  PickBlog
);
