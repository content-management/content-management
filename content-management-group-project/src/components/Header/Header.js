import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux"; //connect to redux
import { getUser, getBlogs } from "../../ducks/reducer"; //get user from redux
import Logo from "../../assets/images/logo.png";
import "../../styles/css/Header.css";

class Header extends Component {
  render() {
    console.log(this.props.id);
    console.log(this.props.blogs);
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
                {obj.blog_name}

              </Link>
            </ul>
          </div>
        );
      });
    return <div>
        <div className="header">
          <div>
            <img src={Logo} className="logo" alt="Logo" />
          </div>
          <div className="nav">
            <Link to={`/Home/${this.props.id}/${this.props.id2}`}>
              {" "}
              <div className="links">Dashboard</div>
            </Link>
            <div className="dropdown">
              Switch Sites
              <div className="dropdown-content">{blogs}</div>
            </div>
            return(
            <div>
              <div className="header">
                <div>
                  <img src={Logo} className="logo" alt="Logo" />
                </div>
                <div className="nav">
                  <Link to={`/Home/${this.props.id}/${this.props.id2}`}>
                    {" "}
                    <div className="links">Dashboard</div>
                  </Link>
                  <div className="dropdown">
                    Switch Sites
                    <div className="dropdown-content">{blogs}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>;
  }
}

const mapStateToProps = state => state;

export default connect(mapStateToProps, { getUser, getBlogs })(Header);
