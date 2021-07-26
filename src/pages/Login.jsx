import React from 'react';
import Template from '../components/Template';
import { useDispatch } from 'react-redux';
import { __login } from '../redux/modules/user';

const Login = ({ history }) => {
	console.log(history);
	const dispatch = useDispatch();

	return (
		<Template>
			<button
				onClick={() => {
					dispatch(__login());
				}}
			>
				login
			</button>
		</Template>
	);
};

export default Login;
