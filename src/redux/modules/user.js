import { createAction, handleActions } from "redux-actions";
import { userApi } from "../../api/userApi";
import jwt_decode from "jwt-decode";
import { cookies } from "../../shared/cookie";
import produce from "immer";

// action
const LOGIN = "user/LOGIN";
const LOGIN_CHECK = "user/LOGIN_CHECK";
const REGISTER = "user/REGISTER";
const LOGOUT = "user/LOGOUT";

// action creator
const login = createAction(LOGIN, (userInfo) => ({ userInfo }));
const loginCheck = createAction(LOGIN_CHECK, (userInfo) => ({ userInfo }));
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
      console.log(token);
      const { id } = jwt_decode(token);
      cookies.set("accessToken", token, {
        path: "/",
        maxAge: 172800, // 2 day
      });
      localStorage.setItem("userId", id);
      dispatch(login({ email, id }));
    } catch (e) {
      console.log(e);
    }
  };

export const __logout =
  () =>
  (dispatch, getState, { history }) => {
    localStorage.removeItem("userObjectId");
    // deleteCookie("token");
    dispatch(logout());
    history.push("/login");
  };

export const __loginCheck =
  () =>
  async (dispatch, getState, { history }) => {
    try {
      const { data } = userApi.loginCheck(); // token만 보내고, 유효한 토큰인지 확인
      console.log(data);
      dispatch(loginCheck());
    } catch (e) {
      console.log(`유효하지 않은 토큰입니다. :  ${e}`);
      // history.replace("/login");
    }
  };

export const __register =
  (userInfo) =>
  async (dispatch, getState, { history }) => {
    try {
      console.log(userInfo);
      dispatch(register(userInfo));
      history.replace("/login");
    } catch (e) {
      console.log(e);
    }
  };

// reducer
const initialState = {
  isLogin: false, //
  userInfo: { email: null, userId: null },
};
const user = handleActions(
  {
    [LOGIN]: (state, action) =>
      produce(state, (draft) => {
        draft.isLogin = true;
        draft.userInfo.email = action.payload.userInfo.email;
        draft.userInfo.userId = action.payload.userInfo.userId;
      }),

    [LOGIN_CHECK]: (state, action) =>
      produce(state, (draft) => {
        draft.isLogin = true;
      }),
    [REGISTER]: (state, action) =>
      produce(state, (draft) => {
        // draft.userInfo = action.payload.userInfo; // api 연결 후 수정 필요
      }),
    [LOGOUT]: (state, action) =>
      produce(state, (draft) => {
        draft.isLogin = false;
      }),
  },
  initialState
);

export default user;
