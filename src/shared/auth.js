import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';

// eslint-disable-next-line import/no-anonymous-default-export
export default (SpecialComponent, option, adminRoute = null) => {
	/* 
     예)  option: null -> 누구나 출입이 가능한 페이지 (home)
                 true -> 로그인한 유저만 출입이 가능한 페이지
                 false -> 로그인한 유저는 출입이 불가능한 페이지
  */

	const AuthenticateCheck = (props) => {
		const isLoggedIn = useSelector((state) => state.user.isLoggedIn);

		useEffect(() => {
			// if (!isLoggedIn && option) {
			// 	props.history.push('/login');
			// }
		}, []);

		return <SpecialComponent history={props.history} />;
	};

	return AuthenticateCheck;
};
