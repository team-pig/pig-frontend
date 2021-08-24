import React from "react";
import { Route, Redirect } from "react-router-dom";
import isLogin from "./isLogin";

/**
 * PublickRoute
 *
 * restricted === false : 로그인 여부와 상관없이 접근 가능 (/intro)
 * restricted === true : 로그인한 상태에서는 접근 불가 (/login, /register)
 *
 * isLogin : refreshToken의 쿠키 내 존재여부에 따라 로그인 상태를 boolean으로 return
 *
 */

const PublickRoute = ({ Component, restricted, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        isLogin() && restricted ? (
          <Redirect to="/roomlist" /> // restricted === false 일때, redirect 할 경로
        ) : (
          <Component {...props} />
        )
      }
    />
  );
};

export default PublickRoute;
