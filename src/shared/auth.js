import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userApi } from "../api/userApi";
import { __loginCheck } from "../redux/modules/user";

// eslint-disable-next-line import/no-anonymous-default-export
export default (SpecialComponent, option, adminRoute = null) => {
  const dispatch = useDispatch();
  const AuthenticateCheck = ({ history, match, location }) => {
    useEffect(() => {
      // 권한 설정 필요 없는 경우 return
      if (option === null) return;

      const loginCheck = async () => {
        try {
          // login checking
          const {
            data: { ok: isLogin, user },
          } = await userApi.loginCheck();
          // 로그인 한 사용자 login, register 페이지 접근 차단
          if (
            isLogin === true &&
            option === false &&
            (match.path === "/login" || match.path === "/register")
          ) {
            history.replace("/roomlist");
          }
          // 리덕스 업데이트
          dispatch(__loginCheck(isLogin, user));
        } catch (e) {
          // login, register 페이지로 가는 것은 예외처리
          if (match.path === "/login" || match.path === "/register") return;

          // 위 2개를 제외한 모든 url에 login 하지 않은 사용자가 접근하면 login 페이지로
          if (!!e.response.data) history.replace("/login");
          dispatch(__loginCheck(false));
        }
      };

      loginCheck();
    }, []);

    return <SpecialComponent history={history} />;
  };
  return AuthenticateCheck;
};
