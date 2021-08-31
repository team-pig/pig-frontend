import { createAction, handleActions } from "redux-actions";
import jwt_decode from "jwt-decode";
import produce from "immer";
import { pop } from "./alert";

// shared & api
import { cookies } from "../../shared/cookie";
import { userApi } from "../../api/userApi";
import { disconnectSocket } from "../../shared/useSocket";

// action
const LOGIN = "user/LOGIN";
const LOGIN_CHECK = "user/LOGIN_CHECK";
const LOGOUT = "user/LOGOUT";
const RESET_PASSWORD = "user/RESET_PASSWORD";
const SUBMIT_NEW_PASSWORD = "user/SUBMIT_NEW_PASSWORD";
const MODIFY_TUTORIAL_STATUS = "user/MODIFY_TUTORIAL_STATUS";

// action creator
const login = createAction(LOGIN, (userInfo) => ({ userInfo }));
const loginCheck = createAction(LOGIN_CHECK, (isLogin, user, tutorial) => ({
  isLogin,
  ...user,
  tutorial,
}));
const logout = createAction(LOGOUT, (userInfo) => ({ userInfo }));
const resetPassword = createAction(RESET_PASSWORD, (userInfo) => ({
  userInfo,
}));
const modifyTutorialStatus = createAction(
  MODIFY_TUTORIAL_STATUS,
  (pageName) => ({ pageName })
);

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
        msg: "메일을 전송중입니다.....🚀  잠시만 기다려 주세요!",
        option: false,
      })
    );
    await userApi.resetPassword(email);
    dispatch(
      pop({
        value: true,
        msg: "가입하신 아이디로 비밀번호 변경 메일이 발송되었습니다 ✨",
        option: true,
      })
    );
  } catch (e) {
    dispatch(
      pop({ value: true, msg: e.response.data.errorMessage, option: true })
    );
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
        maxAge: 1800, // 30분
      });
      cookies.set("refreshToken", refreshToken, {
        path: "/",
        maxAge: 604800, // 7일
      });
      localStorage.setItem("userId", id);
      localStorage.setItem("avatar", avatar);
      localStorage.setItem("color", color);
      dispatch(login({ email, id }));
      history.replace("/roomlist");
    } catch (e) {
      dispatch(
        pop({
          value: true,
          msg: e.response.data.errorMessage,
          option: true,
        })
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
    disconnectSocket();
    dispatch(logout());
  };

export const __loginCheck =
  (isLogin, user) =>
  async (dispatch, getState, { history }) => {
    try {
      const {
        data: { ok: isLogin, user, tutorial },
      } = await userApi.loginCheck();
      dispatch(loginCheck(isLogin, user, tutorial));
    } catch (e) {}
  };

export const __register =
  (userInfo) =>
  async (dispatch, getState, { history }) => {
    try {
      await userApi.register(userInfo);
      window.alert("회원가입이 완료되었습니다! ✨");
      history.replace("/login");
    } catch (e) {
      dispatch(
        pop({ value: true, msg: e.response.data.errorMessage, option: true })
      );
    }
  };

export const __modifyTutorialStatus =
  (page) =>
  async (dispatch, getState, { history }) => {
    try {
      const obj = {};
      obj[`${page}`] = false;
      const { data } = await userApi.modifyTutorialStatus({ tutorial: obj });
      dispatch(modifyTutorialStatus(page));
    } catch (e) {
      dispatch(
        pop({ value: true, msg: e.response.data.errorMessage, option: true })
      );
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
  tutorial: {
    roomlist: null,
    main: null,
    document: null,
    board: null,
    calendar: null,
    modal: null,
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
        draft.tutorial = action.payload.tutorial;
      }),

    [LOGOUT]: (state, action) =>
      produce(state, (draft) => {
        draft.isLogin = false;
        draft.user.email = null;
        draft.user.nickname = null;
        draft.user.userId = null;
      }),
    [MODIFY_TUTORIAL_STATUS]: (state, action) =>
      produce(state, (draft) => {
        draft.tutorial[`${action.payload.pageName}`] = false;
      }),
  },
  initialState
);

export default user;
