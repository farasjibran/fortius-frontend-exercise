'use client';

import DetailArticle from '@/modules/user/article/Detail/DetailArticle';
import { Box } from '@chakra-ui/react';
import { useSearchParams } from 'next/navigation';

export default function DetailArticlePage() {
	const searchParams = useSearchParams();
	const articleId = searchParams.get('articleId');

	return (
		<Box pt={{ base: '130px', md: '80px', xl: '80px' }}>
			<DetailArticle articleId={articleId} />
		</Box>
	);
}
