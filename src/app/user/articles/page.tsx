'use client';

import { Box } from '@chakra-ui/react';

import TableArticle from '@/modules/user/article/Table/TableArticle';

export default function Article() {
	return (
		<Box pt={{ base: '130px', md: '80px', xl: '80px' }}>
			<TableArticle />
		</Box>
	);
}
