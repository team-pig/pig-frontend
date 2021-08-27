import React from "react";
import { Switch, Redirect, Route } from "react-router-dom";

// pages
import Intro from "../pages/Intro";
import Login from "../pages/Login";
import MyPage from "../pages/MyPage";
import Register from "../pages/Register";
import ResetPassword from "../pages/ResetPassword";
import RoomList from "../pages/RoomList";
import SearchPassword from "../pages/SearchPassword";
import Workspace from "../pages/Workspace";

// HOC (high order components)
import PublickRoute from "../auth/PublickRoute";
import PrivateRoute from "../auth/PrivateRoute";

/**
 * routing nesting을 사용하는 경우, exact을 제외해야한다.
 *
 *
 */

const Router = () => {
  return (
    <Switch>
      <PublickRoute restricted={false} Component={Intro} path="/" exact />
      <PublickRoute restricted={true} Component={Login} path="/login" exact />
      <PublickRoute
        restricted={true}
        Component={Register}
        path="/register"
        exact
      />
      <PrivateRoute Component={RoomList} path="/roomlist" exact />
      <PublickRoute
        restricted={false}
        Component={SearchPassword}
        path="/serach-password"
        exact
      />
      <PublickRoute
        restricted={false}
        Component={ResetPassword}
        path="/resetPassword/:id"
        exact
      />
      <PrivateRoute Component={MyPage} path="/mypage" exact />
      <PrivateRoute Component={Workspace} path="/workspace/:roomId" />
      <Redirect from="*" to="/" />
    </Switch>
  );
};

export default Router;
