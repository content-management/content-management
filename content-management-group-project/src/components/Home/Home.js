import React, { Component } from "react";
import { connect } from "react-redux"; //connect to redux
import { getUser } from "../../ducks/reducer"; //get user from redux
import { Link, withRouter } from "react-router-dom";
import axios from "axios";
import Posts from "../Posts/Posts";
import "../../styles/css/Home.css";
import Header from "../Header/Header";

let temp = "";
class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: ""
    };
  }
  componentDidMount() {
    this.props.getUser().then(
      axios
        .get(`/api/posts/${this.props.match.params.id2}`)
        .then(response => {
          console.log("response", response.data);
          this.setState({ posts: response.data });
        })
        .catch(console.log())
    );
  }
  render() {
    let myPost =
      this.state.posts &&
      this.state.posts.map((obj, i) => {
        return (
          <div key={i}>
            <p>{obj.title}</p>
          </div>
        );
      });

    return (
      <div>
        <Header />
        <div className="home-body">
          <div className="home-greeting">
            {!this.props.isLoading && (
              <h1>Welcome back, {this.props.user.name} !</h1>
            )}
            <h2>{this.props.match.params.id}</h2>
            {this.props.isLoading && <h2>Loading...</h2>}
          </div>

          <div className="scroll-container">
            <div className="horizontal-scroll-wrapper rectangles">{myPost}</div>
          </div>

          <div className="cards-container">
            <Link
              to={`/Posts/${this.props.match.params.id}/${
                this.props.match.params.id2
              }`}
            >
              <div className="cards">Posts</div>
            </Link>

            <div className="cards">Pages</div>
            <div className="cards">Media</div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => state;

export default connect(mapStateToProps, { getUser })(Home);
