import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Redirect } from "react-router-dom";
import { __loginCheck } from "../redux/modules/user";
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
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(__loginCheck()); // 토큰 유효성 체크
  }, []);

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
