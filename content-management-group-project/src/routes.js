import React from "react";
import { Switch, Route } from "react-router-dom";

import Home from "./components/Home/Home";
import Splash from "./components/Splash/Splash";
import PickBlog from "./components/PickBlog/PickBlog";
import PageView from "./components/Pages/PageView";
import PostView from "./components/Posts/PostView";
import TextEditor from "./components/Editor/TextEditor";
import Posts from "./components/Posts/Posts";

export default (
  <Switch>
    <Route exact path="/" component={Splash} />
    <Route exact path="/pickblog/:id" component={PickBlog} />
    <Route exact path="/Home/:id" component={Home} />
    <Route exact path="/PageView" component={PageView} />
    <Route exact path="/PostView" component={PostView} />
    <Route exact path="/Editor/:id" component={TextEditor} />
    <Route exact path="/Posts/:id" component={Posts} />
    <Route
      path="*"
      render={() => (
        <div>
          <p>Not Found</p>
        </div>
      )}
    />
  </Switch>
);
