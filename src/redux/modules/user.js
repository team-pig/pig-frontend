import { createAction, handleActions } from "redux-actions";
import jwt_decode from "jwt-decode";
import produce from "immer";

// shared & api
import { cookies } from "../../shared/cookie";
import { userApi } from "../../api/userApi";

// action
const LOGIN = "user/LOGIN";
const LOGIN_CHECK = "user/LOGIN_CHECK";
const LOGOUT = "user/LOGOUT";

// action creator
const login = createAction(LOGIN, (userInfo) => ({ userInfo }));
const loginCheck = createAction(LOGIN_CHECK, (isLogin, user) => ({
  isLogin,
  ...user,
}));
const logout = createAction(LOGOUT, (userInfo) => ({ userInfo }));

// Thunk
export const __login =
  (userInfo) =>
  async (dispatch, getState, { history }) => {
    try {
      const {
        data: { accessToken, email },
      } = await userApi.login(userInfo);
      const { id, avatar, color } = jwt_decode(accessToken);
      cookies.set("accessToken", accessToken, {
        path: "/",
        maxAge: 172800, // 2 day
      });
      localStorage.setItem("userId", id);
      localStorage.setItem("avatar", avatar);
      localStorage.setItem("color", color);
      dispatch(login({ email, id }));
      history.replace("/roomlist");
    } catch (e) {
      window.alert(e.response.data.message);
    }
  };

export const __logout =
  () =>
  (dispatch, getState, { history }) => {
    localStorage.removeItem("userId");
    localStorage.removeItem("avatar");
    localStorage.removeItem("color");
    cookies.remove("accessToken");
    dispatch(logout());
    history.push("/login");
  };

export const __loginCheck =
  (isLogin, user) =>
  async (dispatch, getState, { history }) => {
    dispatch(loginCheck(isLogin, user));
  };

export const __register =
  (userInfo) =>
  async (dispatch, getState, { history }) => {
    try {
      await userApi.register(userInfo);
      window.alert("회원가입이 완료되었습니다! ✨");
      history.replace("/login");
    } catch (e) {
      window.alert(e.response.data.errorMessage);
    }
  };

const initialState = {
  isLogin: false,
  user: { email: null, nickname: null, userId: null },
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
