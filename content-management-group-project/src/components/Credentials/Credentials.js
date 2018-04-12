import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux"; //connect to redux
import { getUser, getBlogs, currBlog, getPages } from "../../ducks/reducer"; //get user from redux
import "../../styles/css/Credentials.css";
import Instructions from "../../assets/images/instructions.png";
import Instructions2 from "../../assets/images/instructions2.png";
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
        <Header />
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
          <h2>Template From Contintum?</h2>
          <div className="box3">
            <img src={Instructions}/>
          </div>
          <h2>Have your own template? Copy this in your body tag.</h2>
          <div className="box4">
          <pre>{`<div class="demo" id="demo1"></div> <div class="demo" id="demo2"></div>
    <div class="demo" id="demo3"></div>
    <div class="demo" id="demo4"></div>
    <div class="demo" id="demo5"></div>
    <script>
        
        function loadDoc() {
            let results = {};
            let blogID ="" // <<=REPLACE # WITH BLOG ID HERE`}
           { "const url = `http://localhost:3001/api/posts/${blogID}`; //" }
           {`// EXAMPLE 'http://localhost:3001/api/posts/999'; WHERE 999 IS YOUR BLOG ID NUMBER`}
            {`
            axios.get(url).then(response => {
           results = response.data;
           document.getElementById("demo1").innerHTML = "<div style='text-align: left'>" + results[0].date+ "</div>" + results[0].content;
           document.getElementById("demo2").innerHTML = "<div style='text-align: left'>" + results[1].date+ "</div>" + results[1].content;
           document.getElementById("demo3").innerHTML = "<div style='text-align: left'>" + results[2].date+ "</div>" + results[2].content;
           document.getElementById("demo4").innerHTML = "<div style='text-align: left'>" + results[3].date+ "</div>" + results[3].content;
           document.getElementById("demo5").innerHTML = "<div style='text-align: left'>" + results[4].date+ "</div>" + results[4].content;
        })
        .catch(console.log())
    }
        
    </script>
    <script src="https://unpkg.com/axios/dist/axios.min.js"></script>`}</pre>
            {/* <img src={Instructions2}/> */}
          </div>
          <p className="more-instr">Detailed Instructions</p>
        </div>
      </div>;
  }
}
const mapStateToProps = state => state;


export default connect(mapStateToProps, {
  getUser,
  getBlogs,
  currBlog,
  getPages
})(Credentials);
