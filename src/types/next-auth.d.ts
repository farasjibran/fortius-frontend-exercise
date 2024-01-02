import { DefaultSession } from 'next-auth';

import { Role } from '@/types/role';

declare module 'next-auth' {
	/**
	 * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
	 */
	interface Session extends DefaultSession {
		id: string;
		name: string;
		email: string;
		role: Role;
		token: string;
	}
}

declare module 'next-auth/jwt' {
	/** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
	interface JWT {
		id: string;
		name: string;
		email: string;
		role: Role;
		token: string;
	}
}
