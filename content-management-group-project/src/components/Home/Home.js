import React, { Component } from "react";
import { connect } from "react-redux"; //connect to redux
import { getUser } from "../../ducks/reducer"; //get user from redux
import { Link, withRouter } from "react-router-dom";

import Posts from "../Posts/Posts";
import "../../styles/css/Home.css";

let temp = "";
class Home extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    this.props.getUser()
  }
  render() {
    console.log("user", this.props);
    return( 
      <div>
        <div className="home-body">

          <div className="home-greeting">
          {!this.props.isLoading && <h1>
            Welcome back, {this.props.user.name} !
            </h1>}
            {this.props.isLoading && <h2>Loading...</h2>}
            <Posts/>
          </div>

          <div className="scroll-container">
              <div className="horizontal-scroll-wrapper rectangles">
                <div><p>blog posts here</p></div>
                <div><p>blog posts here</p></div>
                <div><p>blog posts here</p></div>
                <div><p>blog posts here</p></div>
                <div><p>blog posts here</p></div> 
              </div>
          </div>

          <div className="cards-container">

            <Link  to={`/Posts/${this.props.match.params.id}`}>
              <div className="cards">Posts</div>
            </Link>

            <div className="cards">Pages</div>
            <div className="cards">Media</div>

          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => state;

export default connect(mapStateToProps, { getUser })(Home);
