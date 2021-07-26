import axios from 'axios';

export const instance = axios.create({
	baseURL: 'http://localhost:4000',
	headers: {
		'content-type': 'application/json;charset=UTF-8',
		accept: 'application/json,',
	},
});

instance.interceptors.request.use((config) => {
	// const accessToken = document.cookie.split('=')[1];
	// config.headers.common['Authorization'] = `${accessToken}`;
	return config;
});
