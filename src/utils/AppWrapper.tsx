'use client';

import '@/styles/App.css';
import theme from '@/theme/theme';
import { CacheProvider } from '@chakra-ui/next-js';
import { ChakraProvider } from '@chakra-ui/react';
import {
	HydrationBoundary,
	QueryClient,
	QueryClientProvider,
	dehydrate,
} from '@tanstack/react-query';
import { SessionProvider } from 'next-auth/react';
import React, { ReactNode } from 'react';
import AuthWrapper from './AuthWrapper';

export default function AppWrappers({
	children,
}: Readonly<{ children: ReactNode }>) {
	const [queryClient] = React.useState(
		() =>
			new QueryClient({
				defaultOptions: {
					queries: {
						refetchOnWindowFocus: false,
					},
				},
			})
	);

	const dehydratedState = dehydrate(queryClient);

	return (
		<QueryClientProvider client={queryClient}>
			<HydrationBoundary state={dehydratedState}>
				<CacheProvider>
					<SessionProvider>
						<AuthWrapper>
							<ChakraProvider theme={theme}>{children}</ChakraProvider>
						</AuthWrapper>
					</SessionProvider>
				</CacheProvider>
			</HydrationBoundary>
		</QueryClientProvider>
	);
}
