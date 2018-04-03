import React, { Component } from "react";
import { connect } from "react-redux"; //connect to redux
import { getUser } from "../../ducks/reducer"; //get user from redux
import Pages from "../Pages/Pages";
import Posts from "../Posts/Posts";
import { Link, withRouter } from "react-router-dom";
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

    return <div>
        <div className="App">
          <div>
            {!this.props.isLoading && <h1>
                Hello, {this.props.user.name}
              </h1>}
            {this.props.isLoading && <h2>Loading...</h2>}
          </div>

          <div className="scroll-container">
            scroll-container
            <div className="scroll">scroll</div>
          </div>
          <div className="cards_container">
          <Link  to={`/Posts/${this.props.match.params.id}`}>
            <div className=" cards postCard" >All Post</div>
            </Link>
            <div className="cards pagesCard" >All Pages</div>
          </div>

          <Posts />
          <Pages />
        </div>
      </div>;
  }
}

const mapStateToProps = state => state;

export default connect(mapStateToProps, { getUser })(Home);
