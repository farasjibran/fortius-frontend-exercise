import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

import { serverEnv } from '@/env/server.environment';
import { authLogin } from '@/services/api/auth/authLogin.service';

import { ApiResponseError } from '@/types/api';

const isApiResponseError = (error: unknown): error is ApiResponseError => {
	return (
		typeof error === 'object' &&
		error !== null &&
		'status' in error &&
		'message' in error
	);
};

const handler = NextAuth({
	providers: [
		CredentialsProvider({
			name: 'Credentials',
			credentials: {
				email: { label: 'Email', type: 'text' },
				password: { label: 'Password', type: 'password' },
			},
			async authorize(credentials) {
				if (!credentials?.email || !credentials?.password) {
					return null;
				}

				try {
					const response = await authLogin(credentials);
					let token = response.data.token;

					return {
						id: response.data.user.email,
						token,
						name: response.data.user.name,
						email: response.data.user.email,
						role: response.data.user.role,
					};
				} catch (error: unknown) {
					if (isApiResponseError(error)) {
						throw new Error(error.message);
					}
					throw new Error('Unknown error.');
				}
			},
		}),
	],

	secret: serverEnv.NEXTAUTH_SECRET,

	session: {
		strategy: 'jwt',
	},

	jwt: {
		secret: serverEnv.NEXTAUTH_SECRET,
	},

	pages: {
		signIn: '/auth/sign-in', // Displays signin buttons
	},

	callbacks: {
		async jwt({ token, user }) {
			return { ...user, ...token };
		},
		async session({ session, token }) {
			return { ...session, ...token };
		},
	},

	events: {},

	debug: true,
});

export { handler as GET, handler as POST };
