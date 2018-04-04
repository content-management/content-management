import React from "react";
import { Switch, Route } from "react-router-dom";

import Home from "./components/Home/Home";
import Splash from "./components/Splash/Splash";
import PickBlog from "./components/PickBlog/PickBlog";
import PageView from "./components/Pages/PageView";
import PostView from "./components/Posts/PostView";
import NewPost from "./components/Editor/NewPost";
import EditPost from "./components/Editor/EditPost";
import Posts from "./components/Posts/Posts";

export default (
  <Switch>
    <Route exact path="/" component={Splash} />
    <Route exact path="/pickblog/:id" component={PickBlog} />
    <Route exact path="/Home/:id" component={Home} />
    <Route exact path="/PageView" component={PageView} />
    <Route exact path="/PostView" component={PostView} />
    <Route exact path="/NewPost/:id" component={NewPost} />
    <Route exact path="/EditPost/:id" component={EditPost} />
    <Route exact path="/Posts/:id" component={Posts} />
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
