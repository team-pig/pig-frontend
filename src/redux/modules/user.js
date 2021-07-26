import { createAction, handleActions } from 'redux-actions';
import { userApi } from '../../api/userApi';

// action
const LOGIN = 'user/LOGIN';

// action creator
const login = createAction(LOGIN, (text) => ({ text }));

// Thunk
export const __login =
	() =>
	async (dispatch, getState, { history }) => {
		const { data } = await userApi.login();
		console.log(data);
		// dispatch();
	};

// reducer
const initialState = { isLogin: false };
const user = handleActions(
	{
		[LOGIN]: (state, action) => ({
			...state,
		}),
	},
	initialState,
);

export default user;
