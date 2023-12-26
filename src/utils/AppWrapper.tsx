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
import React, { ReactNode } from 'react';

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
					<ChakraProvider theme={theme}>{children}</ChakraProvider>
				</CacheProvider>
			</HydrationBoundary>
		</QueryClientProvider>
	);
}
