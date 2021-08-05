import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";

// pages
import Intro from "../pages/Intro";
import Login from "../pages/Login";

import Register from "../pages/Register";
import RoomList from "../pages/RoomList";
import Workspace from "../pages/Workspace";
import Board from "../pages/Board";
import Develop from "../pages/Develop";

import Auth from "../shared/auth";

const Router = () => {
  return (
    <Switch>
      <Route path="/" component={Auth(Intro, null)} exact />
      <Route path="/login" component={Auth(Login, null)} exact />
      <Route path="/register" component={Auth(Register, null)} exact />
      <Route path="/roomlist" component={Auth(RoomList, true)} exact />
      <Route path="/workspace/:roomId" component={Auth(Workspace, true)} />
      <Route path="/develop" component={Auth(Develop, null)} />
      <Redirect from="*" to="/" />
    </Switch>
  );
};

export default Router;
