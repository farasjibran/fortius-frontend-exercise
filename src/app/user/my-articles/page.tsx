'use client';

import { Box } from '@chakra-ui/react';

import TableMyArticle from '@/modules/user/my-article/Table/TableMyArticle';

export default function MyArticle() {
	return (
		<Box pt={{ base: '130px', md: '80px', xl: '80px' }}>
			<TableMyArticle />
		</Box>
	);
}
