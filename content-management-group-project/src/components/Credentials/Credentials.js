import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux"; //connect to redux
import { getUser, getBlogs, currBlog, getPages } from "../../ducks/reducer"; //get user from redux
import "../../styles/css/Credentials.css";
import Header from "../Header/Header";



class Credentials extends Component {
  render() {
      console.log(this.props.blogs)
       let blogs = this.props.blogs && this.props.blogs.map((obj, i) => {
           return <div key={i}>
               <ul >
                   <li >
                     {obj.blog_name}: {obj.blog_id}
                   </li>
               </ul>
             </div>;
         });
              let pages = this.props.pages && this.props.pages.map(
                  (obj, i) => {
                    return (
                      <div key={i}>
                        <ul >
                          <li>
                            {obj.page_name}: {obj.page_id}
                          </li>
                        </ul>
                      </div>
                    );
                  }
                );
    return <div>
    <Header/>
    <div className="cred-wrapper">
        <h1>Your Credentials</h1>
        <div className="main-box">
        <div className="box box1">
        <h2>Your blogs id </h2>
        {blogs}
        </div>
        <div className=" box box2 ">
        <h2>Your Pages id </h2>
        {pages}
        </div>
        </div>
        <h1>Add this to your html</h1>
        <div className="box3"></div>
        <p className="more-instr">Detailed Instructions</p>
      </div>
      </div>
  }
}
const mapStateToProps = state => state;


export default connect(mapStateToProps, {
  getUser,
  getBlogs,
  currBlog,
  getPages
})(Credentials);
