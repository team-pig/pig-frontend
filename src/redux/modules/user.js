import { createAction, handleActions } from "redux-actions";
import jwt_decode from "jwt-decode";
import produce from "immer";
import { pop } from "./alert";

// shared & api
import { cookies } from "../../shared/cookie";
import { userApi } from "../../api/userApi";

// action
const LOGIN = "user/LOGIN";
const LOGIN_CHECK = "user/LOGIN_CHECK";
const LOGOUT = "user/LOGOUT";
const RESET_PASSWORD = "user/RESET_PASSWORD";
const SUBMIT_NEW_PASSWORD = "user/SUBMIT_NEW_PASSWORD";

// action creator
const login = createAction(LOGIN, (userInfo) => ({ userInfo }));
const loginCheck = createAction(LOGIN_CHECK, (isLogin, user) => ({
  isLogin,
  ...user,
}));
const logout = createAction(LOGOUT, (userInfo) => ({ userInfo }));
const resetPassword = createAction(RESET_PASSWORD, (userInfo) => ({
  userInfo,
}));

// Thunk
export const __submitNewPassword = (id, resetInfo) => async (dispatch) => {
  try {
    await userApi.submitNewPassword(id, resetInfo);
    if (
      window.confirm(
        "비밀번호 변경이 완료되었습니다. 확인을 누르면 이 창이 닫힙니다."
      )
    ) {
      window.close();
    }
  } catch (e) {}
};

export const __resetPassword = (email) => async (dispatch) => {
  try {
    dispatch(
      pop({
        value: true,
        msg: "잠시만 기다려주세요.",
      })
    );
    const data = await userApi.resetPassword(email);
    console.log(data);
    dispatch(
      pop({
        value: true,
        msg: "가입하신 아이디로 비밀번호 변경 메일이 발송되었습니다.  🚀 ",
      })
    );
  } catch (e) {
    dispatch(pop({ value: true, msg: "존재하지 않는 아이디 입니다." }));
  }
};

export const __login =
  (userInfo) =>
  async (dispatch, getState, { history }) => {
    try {
      const {
        data: { accessToken, email, refreshToken },
      } = await userApi.login(userInfo);
      const { id, avatar, color } = jwt_decode(accessToken);
      cookies.set("accessToken", accessToken, {
        path: "/",
        maxAge: 300, // 5분
      });
      cookies.set("refreshToken", refreshToken, {
        path: "/",
        maxAge: 86400, // 1일
      });
      localStorage.setItem("userId", id);
      localStorage.setItem("avatar", avatar);
      localStorage.setItem("color", color);
      dispatch(login({ email, id }));
      history.replace("/roomlist");
    } catch (e) {
      dispatch(
        pop({ value: true, msg: "아이디 또는 비밀번호가 올바르지 않습니다." })
      );
    }
  };

export const __logout =
  () =>
  (dispatch, getState, { history }) => {
    localStorage.removeItem("userId");
    localStorage.removeItem("avatar");
    localStorage.removeItem("color");
    cookies.remove("refreshToken", {
      path: "/",
    });
    cookies.remove("accessToken", {
      path: "/",
    });
    history.replace("/login");
    dispatch(logout());
  };

export const __loginCheck =
  (isLogin, user) =>
  async (dispatch, getState, { history }) => {
    try {
      dispatch(loginCheck(isLogin, user));
    } catch (e) {
      console.log(e);
    }
  };

export const __register =
  (userInfo) =>
  async (dispatch, getState, { history }) => {
    try {
      await userApi.register(userInfo);
      window.alert("회원가입이 완료되었습니다! ✨");
      history.replace("/login");
    } catch (e) {
      // window.alert(e.response.data.errorMessage);
      dispatch(pop({ value: true, msg: e.response.data.errorMessage }));
    }
  };

const initialState = {
  isLogin: false,
  user: {
    email: null,
    nickname: null,
    userId: null,
    avatar: null,
    color: null,
  },
};
const user = handleActions(
  {
    [LOGIN]: (state, action) =>
      produce(state, (draft) => {
        draft.isLogin = true;
      }),

    [LOGIN_CHECK]: (state, action) =>
      produce(state, (draft) => {
        draft.isLogin = action.payload.isLogin;
        draft.user.email = action.payload.email;
        draft.user.nickname = action.payload.nickname;
        draft.user.userId = action.payload._id;
        draft.user.avatar = action.payload.avatar;
        draft.user.color = action.payload.color;
      }),

    [LOGOUT]: (state, action) =>
      produce(state, (draft) => {
        draft.isLogin = false;
        draft.user.email = null;
        draft.user.nickname = null;
        draft.user.userId = null;
      }),
  },
  initialState
);

export default user;
