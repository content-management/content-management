import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux"; //connect to redux
import { getUser, getBlogs, currBlog, getPages } from "../../ducks/reducer"; //get user from redux
import Logo from "../../assets/images/logo.png";
import settingsIcon from "../../assets/images/settingsIcon.png";
import "../../styles/css/Header.css";
import axios from "axios";
import history from "../../history";
import swal from 'sweetalert';

class Header extends Component {
  constructor() {
    super();
    this.logout = this.logout.bind(this);
    this.changeProfile = this.changeProfile.bind(this);
  }
  logout(event) {
    axios
      .get("/logout")
      .then(response => {
        console.log(window.session);
      })
      .catch(console.log());
  }
  changeProfile(){
    swal("Your Display Name Is:" + this.props.user.name, {
      content: "input",
    })
    .then((value) => {
      swal(`You typed: ${value}`);
    });
  }
  setBlog(i) {
    this.props.currBlog(i);
  }
  // setPage(i) {
  //   this.props.currPage(i);
  // }
  render() {
    console.log("history", history);
    let blogs =
      this.props.blogs &&
      this.props.blogs.map((obj, i) => {
        return (
          <div key={i}>
            <ul>
              <Link
                
                to={`/Home/${obj.blog_name}/${obj.blog_id}`}
              >
                <div className="blogLinks" onClick={() => this.setBlog(obj)}>{obj.blog_name}</div>
              </Link>
            </ul>
          </div>
        );
      });
      let pages =
      this.props.pages &&
      this.props.pages.map((obj, i) => {
        return (
          <div key={i}>
            <ul>
              <Link
                
                to={`/EditPage/${obj.page_id}`}
              >
                <div className="blogLinks" >{obj.page_name}</div>
              </Link>
            </ul>
          </div>
        );
      });
    return (
      <div>
        <div className="header">
          <div className="logo-container">
            <img src={Logo} className="logo" alt="Logo" />
          </div>
          <div className="nav">
            <Link
              to={`/Home/${this.props.myBlog.blog_name}/${
                this.props.myBlog.blog_id
              }`}
            >
              <div className="links">Dashboard</div>
            </Link>
            <Link to={`/pickblog/${this.props.user.name}`} className="links dropdown">
              Switch Sites
              {blogs && <div className="dropdown-content">Blogs {blogs}<hr/>Pages {pages}</div>}
            </Link>
            
              <div className="links dropdown"><img src={settingsIcon} className="settingsIcon" >
              </img>
              <div className="dropdown-content alternate">
                <div className="blogLinks" onClick={this.changeProfile}>Profile</div>
                <a href="/"><div className="blogLinks" onClick={this.logout}>Logout</div></a>

                </div>
              </div>
          </div>
        </div>
          <button className="backButton" onClick={() => history.goBack()}>
              Back
          </button>
      </div>
    );
  }
}

const mapStateToProps = state => state;

export default connect(mapStateToProps, { getUser, getBlogs, currBlog, getPages })(
  Header
);
