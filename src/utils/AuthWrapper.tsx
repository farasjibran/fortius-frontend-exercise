import { Flex, Spinner } from '@chakra-ui/react';
import { useSession } from 'next-auth/react';
import { usePathname, useRouter } from 'next/navigation';
import React, { PropsWithChildren } from 'react';

import { ADMIN_ROUTE_PREFIX } from '@/config/routes/superAdminRoutes';
import { USER_ROUTE_PREFIX } from '@/config/routes/userRoutes';
import { axiosClient, setClientToken } from '@/services/api/utils/axiosClient';

type AuthWrapperProps = PropsWithChildren;

const protectedRoutes = new Set<string>([
	ADMIN_ROUTE_PREFIX,
	USER_ROUTE_PREFIX,
]);

const AuthWrapper: React.FC<AuthWrapperProps> = ({ children }) => {
	const { status, data } = useSession();

	const router = useRouter();
	const pathname = usePathname();
	const pathnameSplit = pathname.split('/');

	React.useEffect(() => {
		if (
			status === 'unauthenticated' &&
			pathnameSplit.length > 0 &&
			protectedRoutes.has('/' + pathnameSplit[1])
		) {
			router.replace('/auth/sign-in');
		}
	}, [pathnameSplit, router, status]);

	if (status !== 'loading') {
		setClientToken({
			token: data?.token ?? '',
			instance: axiosClient,
		});
	}

	if (status === 'loading') {
		return (
			<Flex
				justifyContent="center"
				textAlign="center"
				alignItems="center"
				height="100vh">
				<Spinner
					size="xl"
					emptyColor="purple.200"
					color="purple.500"
					thickness="5px"
				/>
			</Flex>
		);
	}

	return <>{children}</>;
};

export default AuthWrapper;
