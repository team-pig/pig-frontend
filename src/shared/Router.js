import React from "react";
import { Switch, Route } from "react-router-dom";

// pages
import Intro from "../pages/Intro";
import Login from "../pages/Login";

import Register from "../pages/Register";
import RoomList from "../pages/RoomList";
import Auth from "../shared/auth";

const Router = () => {
  return (
    <Switch>
      <Route path="/" component={Auth(Intro, null)} exact />
      <Route path="/login" component={Auth(Login, null)} exact />
      <Route path="/register" component={Auth(Register, null)} exact />
      <Route path="/roomlist" component={Auth(RoomList, null)} exact />
    </Switch>
  );
};

export default Router;
