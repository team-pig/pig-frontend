import { createAction, handleActions } from "redux-actions";
import jwt_decode from "jwt-decode";
import produce from "immer";

// shared & api
import { cookies } from "../../shared/cookie";
import { userApi } from "../../api/userApi";

// action
const LOGIN = "user/LOGIN";
const LOGIN_CHECK = "user/LOGIN_CHECK";
const REGISTER = "user/REGISTER";
const LOGOUT = "user/LOGOUT";

// action creator
const login = createAction(LOGIN, (userInfo) => ({ userInfo }));
const loginCheck = createAction(LOGIN_CHECK, (isLogin, user) => ({
  isLogin,
  ...user,
}));
const register = createAction(REGISTER, (userInfo) => ({ userInfo }));
const logout = createAction(LOGOUT, (userInfo) => ({ userInfo }));

// Thunk
export const __login =
  (userInfo) =>
  async (dispatch, getState, { history }) => {
    try {
      const {
        data: { token, email },
      } = await userApi.login(userInfo);
      const { id } = jwt_decode(token);
      cookies.set("accessToken", token, {
        path: "/",
        maxAge: 172800, // 2 day
      });
      localStorage.setItem("userId", id);
      dispatch(login({ email, id }));
      history.replace("/roomlist");
    } catch (e) {
      console.log(e);
    }
  };

export const __logout =
  () =>
  (dispatch, getState, { history }) => {
    localStorage.removeItem("userId");
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
      const { data } = userApi.register(userInfo);
      console.log(data);
      dispatch(register(userInfo));
      history.replace("/login");
    } catch (e) {
      console.log(e);
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
    [REGISTER]: (state, action) =>
      produce(state, (draft) => {
        // draft.userInfo = action.payload.userInfo; // api 연결 후 수정 필요
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
