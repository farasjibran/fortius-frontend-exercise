import { AxiosError } from 'axios';

import { AUTH_API } from '@/config/api.config';
import { axiosClient } from '../utils/axiosClient';

import { ApiResponseSuccess } from '@/types/api';

interface AuthLoginRequest {
	email: string;
	password: string;
}

export interface LoginData {
	user: {
		id: number;
		name: string;
		email: string;
		role: string;
	};
	token: string;
}

type AuthLoginResponse = ApiResponseSuccess<LoginData>;

export const authLogin = async (credentials: AuthLoginRequest) => {
	try {
		const response = await axiosClient.post<AuthLoginResponse>(AUTH_API.LOGIN, {
			email: credentials.email,
			password: credentials.password,
		});

		return response.data;
	} catch (error: unknown) {
		throw error instanceof AxiosError && error.response
			? error.response.data
			: new Error('Unknown error.');
	}
};

interface AuthRegisterRequest {
	name: string;
	email: string;
	password: string;
	password_confirmation: string;
}

export const authRegister = async (credentials: AuthRegisterRequest) => {
	try {
		const response = await axiosClient.post<AuthLoginResponse>(
			AUTH_API.REGISTER,
			credentials
		);

		return response.data;
	} catch (error) {
		throw error instanceof AxiosError && error.response
			? error.response.data
			: new Error('Unknown error.');
	}
};
