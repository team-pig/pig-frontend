import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Intro from '../pages/Intro';
import Login from '../pages/Login';
import Auth from '../shared/auth';

const Router = () => {
	return (
		<Switch>
			<Route path='/' component={Auth(Intro, null)} exact />
			<Route path='/login' component={Auth(Login, null)} exact />
			<Route path='/login' component={Auth(Login, null)} exact />
		</Switch>
	);
};

export default Router;
