import React from "react";
import { Switch, Route } from "react-router-dom";

import Home from "./components/Home/Home";
import Splash from "./components/Splash/Splash";
import PickBlog from "./components/PickBlog/PickBlog";
// import PageView from "./components/Pages/PageView";
// import PostView from "./components/Posts/PostView";
import NewPost from "./components/Editor/NewPost";
import EditPost from "./components/Editor/EditPost";
import EditPage from "./components/Editor/EditPage";
import Posts from "./components/Posts/Posts";
import Credentials from "./components/Credentials/Credentials";



export default (
  <Switch>
    <Route exact path="/" component={Splash} />
    <Route path="/pickblog/:id" component={PickBlog} />
    <Route path="/Home/:id/:id2" component={Home} />{" "}
    {/*id-blog name, id2-blogid  */}
    {/* <Route exact path="/PageView" component={PageView} /> */}
    {/* <Route exact path="/PostView" component={PostView} /> */}
    <Route path="/NewPost/:id" component={NewPost} />
    <Route path="/EditPost/:id" component={EditPost} />
    <Route path="/EditPage/:id" component={EditPage} />
    <Route path="/Posts/:id/:id2" component={Posts} />
    <Route path="/Credentials/:id" component={Credentials} />
    {/*id-blog name, id2-blogid  */}
    <Route
      path="*"
      render={() => (
        <div className="button-container">
          <button className="loginButton">
            <a href={process.env.REACT_APP_LOGIN}>Login/Sign Up</a>
          </button>
        </div>
      )}
    />
  </Switch>
);
