import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";

// pages
import Intro from "../pages/Intro";
import Login from "../pages/Login";
import MyPage from "../pages/MyPage";

import Register from "../pages/Register";
import ResetPassword from "../pages/ResetPassword";
import RoomList from "../pages/RoomList";
import SearchPassword from "../pages/SearchPassword";
import Workspace from "../pages/Workspace";

import Auth from "../shared/auth";

const Router = () => {
  return (
    <Switch>
      <Route path="/" component={Auth(Intro, null)} exact />
      <Route path="/login" component={Auth(Login, null)} exact />
      <Route path="/register" component={Auth(Register, null)} exact />
      <Route path="/roomlist" component={Auth(RoomList, true)} exact />
      <Route
        path="/serach-password"
        component={Auth(SearchPassword, true)}
        exact
      />
      <Route path="/password/:id" component={Auth(ResetPassword, true)} exact />
      <Route path="/mypage" component={Auth(MyPage, true)} exact />
      <Route path="/workspace/:roomId" component={Auth(Workspace, null)} />
      <Redirect from="*" to="/" />
    </Switch>
  );
};

export default Router;
