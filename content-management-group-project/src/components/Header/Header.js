import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux"; //connect to redux
import { getUser, getBlogs, currBlog, getPages } from "../../ducks/reducer"; //get user from redux
import Logo from "../../assets/images/logo.png";
import settingsIcon from "../../assets/images/settingsIcon.png";
import "../../styles/css/Header.css";
import axios from "axios";
import history from "../../history";
import swal from "sweetalert";

class Header extends Component {
  constructor() {
    super();
    this.logout = this.logout.bind(this);
    this.changeProfile = this.changeProfile.bind(this);
    this.profileClickedSwal = this.profileClickedSwal.bind(this);
    // this.changeProp = this.changeProp.bind(this);
    // this.getDaUser = this.getDaUser.bind(this);
  }
  componentDidMount() {
    this.props.getUser();
  }
  logout(event) {
    axios
      .get("/logout")
      .then(response => {
      })
      .catch(console.log());
  }
  profileClickedSwal() {
    swal(
      "Your display name is: " +
        this.props.user.name +
        "\n \n Would you like to change it?",
      {
        content: "text",
        buttons: true,
        dangerMode: true,
        html: true
      }
    ).then(value => {
      if (value) {
        this.changeProfile();
      } else {
        swal("Have a Nice Day!");
      }
    });
  }
  changeProfile(){
    swal("Your current display name is: " + this.props.user.name + 
    "\n \n Enter your new display name below", {
      icon: "info",
      content: "input",
      buttons: true,
      dangerMode: true
    })
    .then((value) => {
      // console.log(value)
      if(value){
        let body = {
          name: value
        }
        axios.put(`/api/changeName/${this.props.user.id}`, body).then(window.location.replace(`/#/pickblog/${body.name}`)).then(() => this.props.getUser());
      swal(`Your display name has been changed to: ${value}`);
      
      }else{
        swal('As you wish, your display name remains unchanged')
      }
    )
      .then(value => {
        // console.log(value)
        if (value) {
          let body = {
            name: value
          };
          axios
            .put(`/api/changeName/${this.props.user.id}`, body)
            .then(window.location.replace(`/#/pickblog/${body.name}`))
            .then(() => this.props.getUser());
          swal(`Your display name have been changed to: ${value}`);
        } else {
          swal("As you wish, your display name remains unchanged");
        }
      })
      .then(this.props.getUser());
  }
  // getDaUser(){
  //   this.props.getUser();
  // }
  setBlog(i) {
    this.props.currBlog(i);
  }
  // setPage(i) {
  //   this.props.currPage(i);
  // }
  render() {
    let blogs =
      this.props.blogs &&
      this.props.blogs.map((obj, i) => {
        return (
          <div key={i}>
            <ul>
              <Link to={`/Home/${obj.blog_name}/${obj.blog_id}`} onClick={this.props.reGetDaStuffs}>
                <div className="blogLinks">
                  {obj.blog_name}
                </div>
              </Link>
            </ul>
          </div>
        );
      });
    // let pages =
    //   this.props.pages &&
    //   this.props.pages.map((obj, i) => {
    //     return (
    //       <div key={i}>
    //         <ul>
    //           <Link to={`/EditPage/${obj.page_id}`} onClick={this.props.getPage}>
    //             <div className="blogLinks">{obj.page_name}</div>
    //           </Link>
    //         </ul>
    //       </div>
    //     );
    //   });
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
            <div className="links dropdown">
              <Link to={`/pickblog/${this.props.user.name}`}>
                Switch Sites{" "}
              </Link>
              {blogs && (
                <div className="dropdown-content">
                  Blogs {blogs}
                  <hr /><br/><ul><Link className="blogLinks"
                  to={`/pickblog/${this.props.user.name}`}
                  
                >
                  Pages </Link></ul>
                </div>
              )}
              </div>
            
              <div className="links dropdown"><img src={settingsIcon} className="settingsIcon" >
              </img>
              <div className="dropdown-content">
              <div><br/><br/>
                <div className="blogLinks" onClick={this.profileClickedSwal}>Display Name</div>
                <Link to={`/Credentials/${this.props.user.name}`}><div className="blogLinks">Your Credentials</div></Link>
                <a href="/"><div className="blogLinks" onClick={this.logout}>Logout</div></a>
              </div>
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

export default connect(mapStateToProps, {
  getUser,
  getBlogs,
  currBlog,
  getPages
})(Header);
