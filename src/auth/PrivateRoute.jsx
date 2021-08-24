import React, { useEffect } from "react";
import { Route, Redirect } from "react-router-dom";
import { userApi } from "../api/userApi";
import isLogin from "./isLogin";
import { useDispatch } from "react-redux";
import { __loginCheck } from "../redux/modules/user";

/**
 * PrivateRoute
 *
 * 반드시 로그인을 해야하만 접근 할 수 있는 컴포넌트
 *
 * isLogin : refreshToken의 쿠키 내 존재여부에 따라 로그인 상태를 boolean으로 return
 */

const PrivateRoute = ({ Component, ...rest }) => {
  const dispatch = useDispatch();

  /**
   * Private 접속 시, accessToken의 유효성을 서버와 검증한다.
   * 만약, 유효하지 않은 accessToken 이라면 refreshToken을 이용해 재발급함
   */

  useEffect(() => {
    const loginCheck = async () => {
      try {
        const {
          data: { ok: isLogin, user },
        } = await userApi.loginCheck();
        if (isLogin) {
        }
        dispatch(__loginCheck(isLogin, user));
      } catch (e) {
        dispatch(__loginCheck(false));
      }
    };

    loginCheck();
  }, []);

  return (
    <Route
      {...rest}
      render={(props) =>
        isLogin() ? <Component {...props} /> : <Redirect to="/login" />
      }
    />
  );
};

export default PrivateRoute;
